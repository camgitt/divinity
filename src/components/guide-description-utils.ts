/**
 * Utility functions for generating concise, contextually-appropriate guide descriptions
 */

interface Guide {
  name: string;
  faith: string;
  role: string;
  ageGroup: string;
  specialties: string[];
  personality?: string[];
  sect?: string[];
  description?: string;
}

/**
 * Generates a concise, age-appropriate summary description for a guide
 * Max 2-3 sentences that sync with the guide's actual attributes
 */
export function generateGuideSummary(guide: Guide): string {
  const ageDescriptors: Record<string, string> = {
    young: "A vibrant young",
    mature: "An experienced",
    elder: "A wise elder"
  };

  const ageDescriptor = ageDescriptors[guide.ageGroup] || "A";
  
  // Get only the top 2 specialties for brevity
  const primarySpecialties = guide.specialties.slice(0, 2).join(" and ");
  
  // Simplified format: just age, faith, role, and top specialties
  return `${ageDescriptor} ${guide.faith} ${guide.role.toLowerCase()} specializing in ${primarySpecialties}.`;
}

/**
 * Condenses an existing long description to 2-3 sentences max
 */
export function condenseDescription(description: string, maxSentences: number = 2): string {
  if (!description) return "";
  
  // Split into sentences
  const sentences = description
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  // Return first N sentences
  return sentences.slice(0, maxSentences).join(". ") + ".";
}

/**
 * Gets age-appropriate descriptor text for display
 */
export function getAgeDisplay(ageGroup: string): string {
  const ageDisplayMap: Record<string, string> = {
    young: "Young",
    mature: "Mature",
    elder: "Elder"
  };
  
  return ageDisplayMap[ageGroup] || ageGroup;
}

/**
 * Ensures guide description matches their actual age attribute
 * Fixes hardcoded age references in descriptions
 */
export function fixAgeInDescription(description: string, actualAge: string): string {
  if (!description) return "";
  
  // Replace hardcoded age references with actual age
  const ageMap: Record<string, string> = {
    young: "young",
    mature: "mature",
    elder: "elder"
  };
  
  const correctAge = ageMap[actualAge] || actualAge;
  
  // Replace common patterns like "A mature..." or "An elder..."
  let fixed = description
    .replace(/A (young|mature|elder)\s/i, (match, capturedAge) => {
      return `A ${correctAge} `;
    })
    .replace(/An (young|mature|elder)\s/i, (match, capturedAge) => {
      const article = correctAge === 'elder' ? 'An' : 'A';
      return `${article} ${correctAge} `;
    });
  
  return fixed;
}