// Utility functions for guide type operations
// Lightweight file to avoid importing heavy context files

export type GuideType = 'faith-page' | 'companion' | 'verified-leader';

/**
 * List of verified leader names for detection
 */
const VERIFIED_LEADER_NAMES = [
  "Master Steinruck",
  "Master Tim Steinruck", 
  "Tim Steinruck",
  "James Warren \"Flaming Eagle\" Mooney",
  "Flaming Eagle"
];

/**
 * Check if a guide name matches a verified leader
 */
export function isVerifiedLeader(guideName: string): boolean {
  return VERIFIED_LEADER_NAMES.includes(guideName);
}

/**
 * Get the correct guide type for a guide, with verification override
 */
export function determineGuideType(guideName: string, savedGuideType?: GuideType): GuideType {
  // Check if this is a verified leader first (highest priority)
  if (isVerifiedLeader(guideName)) {
    return 'verified-leader';
  }
  
  // Otherwise use the saved guide type or default to faith-page
  return savedGuideType || 'faith-page';
}

/**
 * Get heart color based on guide type
 * - Red (#EF4444) for faith page guides (default)
 * - Blue (#3B82F6) for companion guides
 * - Green (#10B981) for verified leader guides
 */
export function getHeartColorForGuideType(guideType?: GuideType): string {
  switch (guideType) {
    case 'companion':
      return '#3B82F6'; // Blue for companions
    case 'verified-leader':
      return '#10B981'; // Green for verified leaders
    case 'faith-page':
    default:
      return '#EF4444'; // Red for faith page guides (default)
  }
}

/**
 * Get heart color class for Tailwind
 */
export function getHeartColorClassForGuideType(guideType?: GuideType): string {
  switch (guideType) {
    case 'companion':
      return 'text-blue-500 fill-blue-500';
    case 'verified-leader':
      return 'text-green-500 fill-green-500';
    case 'faith-page':
    default:
      return 'text-red-500 fill-red-500';
  }
}