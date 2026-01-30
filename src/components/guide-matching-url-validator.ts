/**
 * Guide Matching URL Validator
 * 
 * This utility validates and updates guide chat URLs from the centralized mapping system.
 * It ensures that all guides in the matching data have correct D-ID conversation links.
 * 
 * Cross-references with:
 * - guide-chat-url-mapping.ts (centralized URL mapping)
 * - DivinityAGI_Master_Guide_Database.csv (source of truth for guide data)
 */

import { getGuideChatUrlById, validateGuideChatUrl, GUIDE_CHAT_URL_MAP } from './guide-chat-url-mapping';
import type { SpiritualGuide } from './guide-matching-data';

/**
 * The 13 Faith Groups in DivinityAGI
 * These correspond to the faith selection in the matching process
 */
export const FAITH_GROUPS = [
  'Christianity',
  'Islam',
  'Judaism',
  'Hinduism',
  'Buddhism',
  'Taoism',
  'Shinto',
  'Sikhism',
  'Jainism',
  'Bahá\'í Faith',
  'Confucianism',
  'Polytheism',
  'The Occult',
  'Universal'
] as const;

export type FaithGroup = typeof FAITH_GROUPS[number];

/**
 * Validate a guide's chat URL against the centralized mapping
 * @param guide - The spiritual guide to validate
 * @returns Object with validation status and corrected URL if needed
 */
export function validateGuideUrl(guide: SpiritualGuide): {
  isValid: boolean;
  currentUrl: string;
  correctUrl: string | null;
  needsUpdate: boolean;
  message: string;
} {
  const correctUrl = getGuideChatUrlById(guide.id);
  
  if (!correctUrl) {
    return {
      isValid: false,
      currentUrl: guide.chatUrl,
      correctUrl: null,
      needsUpdate: false,
      message: `Warning: Guide "${guide.name}" (${guide.id}) not found in URL mapping. URL: ${guide.chatUrl}`
    };
  }

  const needsUpdate = guide.chatUrl !== correctUrl;

  return {
    isValid: !needsUpdate,
    currentUrl: guide.chatUrl,
    correctUrl,
    needsUpdate,
    message: needsUpdate 
      ? `Guide "${guide.name}" URL mismatch. Current: ${guide.chatUrl}, Correct: ${correctUrl}`
      : `Guide "${guide.name}" URL is correct: ${correctUrl}`
  };
}

/**
 * Get the correct chat URL for a guide, with fallback handling
 * @param guide - The spiritual guide
 * @returns The correct chat URL from the mapping, or the guide's current URL if not found
 */
export function getCorrectGuideUrl(guide: SpiritualGuide): string {
  const mappedUrl = getGuideChatUrlById(guide.id);
  
  if (mappedUrl) {
    return mappedUrl;
  }

  // Log warning if guide not in mapping
  console.warn(`Guide "${guide.name}" (${guide.id}) not found in chat URL mapping. Using guide's current URL: ${guide.chatUrl}`);
  
  // Validate the guide's current URL format
  if (validateGuideChatUrl({ ...guide, name: guide.name, faith: guide.faith })) {
    return guide.chatUrl;
  }

  // If current URL is also invalid, return it anyway with error log
  console.error(`Guide "${guide.name}" has invalid chat URL: ${guide.chatUrl}`);
  return guide.chatUrl;
}

/**
 * Update a guide's chat URL to the correct value from the mapping
 * @param guide - The spiritual guide to update
 * @returns Updated guide with correct chat URL
 */
export function updateGuideUrl(guide: SpiritualGuide): SpiritualGuide {
  const correctUrl = getCorrectGuideUrl(guide);
  
  return {
    ...guide,
    chatUrl: correctUrl
  };
}

/**
 * Validate all guides in an array and return validation report
 * @param guides - Array of spiritual guides to validate
 * @returns Validation report with statistics and issues
 */
export function validateAllGuides(guides: SpiritualGuide[]): {
  totalGuides: number;
  validGuides: number;
  invalidGuides: number;
  missingFromMapping: number;
  issues: Array<{
    guide: string;
    guideId: string;
    issue: string;
    currentUrl: string;
    correctUrl: string | null;
  }>;
} {
  const issues: Array<{
    guide: string;
    guideId: string;
    issue: string;
    currentUrl: string;
    correctUrl: string | null;
  }> = [];

  let validGuides = 0;
  let invalidGuides = 0;
  let missingFromMapping = 0;

  guides.forEach(guide => {
    const validation = validateGuideUrl(guide);
    
    if (validation.isValid) {
      validGuides++;
    } else if (!validation.correctUrl) {
      missingFromMapping++;
      issues.push({
        guide: guide.name,
        guideId: guide.id,
        issue: 'NOT_IN_MAPPING',
        currentUrl: validation.currentUrl,
        correctUrl: null
      });
    } else if (validation.needsUpdate) {
      invalidGuides++;
      issues.push({
        guide: guide.name,
        guideId: guide.id,
        issue: 'URL_MISMATCH',
        currentUrl: validation.currentUrl,
        correctUrl: validation.correctUrl
      });
    }
  });

  return {
    totalGuides: guides.length,
    validGuides,
    invalidGuides,
    missingFromMapping,
    issues
  };
}

/**
 * Group guides by faith tradition
 * @param guides - Array of spiritual guides
 * @returns Map of faith groups to guides
 */
export function groupGuidesByFaith(guides: SpiritualGuide[]): Map<string, SpiritualGuide[]> {
  const groupedGuides = new Map<string, SpiritualGuide[]>();

  guides.forEach(guide => {
    const faithKey = guide.faith;
    
    if (!groupedGuides.has(faithKey)) {
      groupedGuides.set(faithKey, []);
    }
    
    groupedGuides.get(faithKey)!.push(guide);
  });

  return groupedGuides;
}

/**
 * Get statistics about guide distribution across faith groups
 * @param guides - Array of spiritual guides
 * @returns Statistics object
 */
export function getFaithGroupStatistics(guides: SpiritualGuide[]): {
  faithGroups: Array<{
    faith: string;
    count: number;
    guides: string[];
    hasValidUrls: boolean;
  }>;
  totalFaiths: number;
  totalGuides: number;
} {
  const grouped = groupGuidesByFaith(guides);
  const faithGroups: Array<{
    faith: string;
    count: number;
    guides: string[];
    hasValidUrls: boolean;
  }> = [];

  grouped.forEach((guideList, faith) => {
    const allValid = guideList.every(guide => {
      const validation = validateGuideUrl(guide);
      return validation.isValid;
    });

    faithGroups.push({
      faith,
      count: guideList.length,
      guides: guideList.map(g => g.name),
      hasValidUrls: allValid
    });
  });

  // Sort by count descending
  faithGroups.sort((a, b) => b.count - a.count);

  return {
    faithGroups,
    totalFaiths: grouped.size,
    totalGuides: guides.length
  };
}

/**
 * Check if a faith group has guides available
 * @param faith - The faith tradition to check
 * @param guides - Array of spiritual guides
 * @returns Whether the faith has any guides
 */
export function hasFaithGuides(faith: string, guides: SpiritualGuide[]): boolean {
  return guides.some(guide => 
    guide.faith.toLowerCase() === faith.toLowerCase() ||
    guide.faith.toLowerCase().includes(faith.toLowerCase()) ||
    faith.toLowerCase().includes(guide.faith.toLowerCase())
  );
}

/**
 * Get all guides for a specific faith group with validated URLs
 * @param faith - The faith tradition
 * @param guides - Array of spiritual guides
 * @returns Array of guides with validated URLs
 */
export function getGuidesByFaith(faith: string, guides: SpiritualGuide[]): SpiritualGuide[] {
  return guides
    .filter(guide => 
      guide.faith.toLowerCase() === faith.toLowerCase() ||
      guide.faith.toLowerCase().includes(faith.toLowerCase()) ||
      faith.toLowerCase().includes(guide.faith.toLowerCase())
    )
    .map(guide => updateGuideUrl(guide));
}

/**
 * Validate that all 13 faith groups have guides available
 * @param guides - Array of spiritual guides
 * @returns Report on faith group coverage
 */
export function validateFaithGroupCoverage(guides: SpiritualGuide[]): {
  complete: boolean;
  missingFaiths: string[];
  coverage: Array<{
    faith: FaithGroup;
    hasGuides: boolean;
    guideCount: number;
  }>;
} {
  const missingFaiths: string[] = [];
  const coverage: Array<{
    faith: FaithGroup;
    hasGuides: boolean;
    guideCount: number;
  }> = [];

  FAITH_GROUPS.forEach(faith => {
    const faithGuides = getGuidesByFaith(faith, guides);
    const hasGuides = faithGuides.length > 0;
    
    coverage.push({
      faith,
      hasGuides,
      guideCount: faithGuides.length
    });

    if (!hasGuides) {
      missingFaiths.push(faith);
    }
  });

  return {
    complete: missingFaiths.length === 0,
    missingFaiths,
    coverage
  };
}

/**
 * Log validation report to console for debugging
 * @param guides - Array of spiritual guides to validate
 */
export function logValidationReport(guides: SpiritualGuide[]): void {
  console.group('🔍 DivinityAGI Guide URL Validation Report');
  
  const validation = validateAllGuides(guides);
  const stats = getFaithGroupStatistics(guides);
  const coverage = validateFaithGroupCoverage(guides);

  console.log('\n📊 Overall Statistics:');
  console.log(`Total Guides: ${validation.totalGuides}`);
  console.log(`✅ Valid URLs: ${validation.validGuides}`);
  console.log(`❌ Invalid URLs: ${validation.invalidGuides}`);
  console.log(`⚠️  Missing from Mapping: ${validation.missingFromMapping}`);

  console.log('\n🌍 Faith Group Coverage:');
  coverage.coverage.forEach(({ faith, hasGuides, guideCount }) => {
    const status = hasGuides ? '✅' : '❌';
    console.log(`${status} ${faith}: ${guideCount} guides`);
  });

  if (coverage.missingFaiths.length > 0) {
    console.warn('\n⚠️  Missing Faith Groups:', coverage.missingFaiths);
  }

  if (validation.issues.length > 0) {
    console.group('\n❗ Issues Found:');
    validation.issues.forEach(issue => {
      console.log(`\n${issue.guide} (${issue.guideId}):`);
      console.log(`  Issue: ${issue.issue}`);
      console.log(`  Current URL: ${issue.currentUrl}`);
      if (issue.correctUrl) {
        console.log(`  Correct URL: ${issue.correctUrl}`);
      }
    });
    console.groupEnd();
  }

  console.groupEnd();
}

/**
 * Export utility function to ensure guides have correct URLs at runtime
 * Use this in components that display guides
 * @param guides - Array of guides to process
 * @returns Array of guides with validated URLs
 */
export function ensureCorrectGuideUrls(guides: SpiritualGuide[]): SpiritualGuide[] {
  return guides.map(guide => updateGuideUrl(guide));
}
