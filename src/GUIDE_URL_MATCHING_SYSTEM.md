# Guide URL Matching System - Complete Documentation

## Overview
The Guide URL Matching System ensures that every matched spiritual guide opens their correct D-ID conversation agent link. This system is critical to the app's success as it connects users with the right guide conversation.

## Problem Solved
Previously, when users matched with guides like Bhairav or Mata Amritanandamayi (Amma), clicking "Launch Conversation" would sometimes open a generic fallback agent instead of the specific guide's D-ID conversation link.

## System Architecture

### 1. Master Guide Database (CSV)
**File:** `/DivinityAGI_Master_Guide_Database.csv`

This is the single source of truth for all guide data including:
- Guide ID (e.g., `hindu-bhairav`, `mata-amritanandamayi`)
- Guide Name (e.g., `Bhairav`, `Mata Amritanandamayi (Amma)`)
- Faith Tradition (e.g., `Hinduism`, `Buddhism`, `Christianity`)
- Other guide attributes (specialties, personality, etc.)

### 2. Guide Chat URL Mapping
**File:** `/components/guide-chat-url-mapping.ts`

Centralized mapping of all guides to their D-ID chat URLs:

```typescript
export const GUIDE_CHAT_URL_MAP: Record<string, GuideChatMapping> = {
  'hindu-bhairav': {
    guideId: 'hindu-bhairav',
    guideName: 'Bhairav',
    faith: 'Hinduism',
    chatUrl: 'https://link.divinityagi.com/hinduism-3'
  },
  'mata-amritanandamayi': {
    guideId: 'mata-amritanandamayi',
    guideName: 'Mata Amritanandamayi (Amma)',
    faith: 'Hinduism',
    chatUrl: 'https://link.divinityagi.com/hindu-amma-1'
  },
  // ... all other guides
};
```

**Key Functions:**
- `getGuideChatUrlById(guideId)` - Primary lookup method (most reliable)
- `getGuideChatUrl(guideName, faith?)` - Fallback lookup by name
- `getFallbackChatUrlByFaith(faith)` - Last resort fallback by faith tradition
- `validateGuideChatUrl(guide)` - Validates guide has proper chatUrl

### 3. Guide Matching Data
**Files:** 
- `/components/guide-matching-data.ts` (main guides)
- `/components/guide-matching-data-additional.ts` (additional guides like Amma)

These files now COMBINE both arrays into a single `guides` export:

```typescript
import { additionalGuides } from './guide-matching-data-additional';

const mainGuides: SpiritualGuide[] = [ /* ... */ ];

// COMBINED EXPORT - includes all guides
export const guides: SpiritualGuide[] = [
  ...mainGuides,
  ...additionalGuides
];
```

### 4. Guide Matching Process
**File:** `/components/guide-matching-process.tsx`

When a guide is matched, the system now saves:
```typescript
const guideData = {
  guideName: matchResult.guide.name,
  guideId: matchResult.guide.id,        // ← Primary ID for lookup
  id: matchResult.guide.id,              // ← Also saved as 'id'
  matchedGuideId: matchResult.guide.id,  // ← Legacy field
  chatUrl: matchResult.guide.chatUrl,    // ← D-ID conversation link
  faith: matchResult.guide.faith,
  // ... other fields
};
```

### 5. Chat Component (Launch Conversation)
**File:** `/components/chat2.tsx`

Multi-priority fallback system ensures correct URL is ALWAYS found:

```typescript
// PRIORITY 1: Use chatUrl from saved guide data
let chatUrl = createdGuide.chatUrl;

// PRIORITY 2: Lookup by guide ID (most reliable)
if (!chatUrl) {
  const guideId = createdGuide.guideId || createdGuide.id;
  chatUrl = getGuideChatUrlById(guideId);
}

// PRIORITY 3: Lookup by guide name + faith
if (!chatUrl && createdGuide.guideName) {
  chatUrl = getGuideChatUrl(createdGuide.guideName, createdGuide.faith);
}

// PRIORITY 4: Search guide database
if (!chatUrl) {
  const guide = guides.find(g => 
    g.name === createdGuide.guideName && 
    g.faith === createdGuide.faith
  );
  chatUrl = guide?.chatUrl;
}

// PRIORITY 5: Fallback by faith tradition (last resort)
if (!chatUrl) {
  chatUrl = getFallbackChatUrlByFaith(createdGuide.faith);
}

// Open conversation with correct URL
setOverlayUrl(chatUrl);
setIsOverlayOpen(true);
```

## URL Format Convention

All D-ID chat URLs follow this pattern:
```
https://link.divinityagi.com/{faith-tradition}-{number}
```

Examples:
- Christianity: `christianity-1`, `christianity-2`, `christianity-3`, ...
- Hinduism: `hinduism-1`, `hinduism-2`, `hinduism-3`, `hindu-amma-1`
- Buddhism: `buddhism-1`, `buddhism-2`, `buddhism-3`, ...
- Islam: `islam-1`, `islam-2`, `islam-3`, ...
- Judaism: `judaism-1`, `judaism-2`, `judaism-3`, ...

## Guide Coverage

The system now includes comprehensive coverage for all faith traditions:

### Christianity (6 guides)
- Pope Francis → christianity-1
- Pastor David → christianity-2
- Sister Isabella Rossi → christianity-3
- Elder Smith Jr. → christianity-4
- Father Brian → christianity-5
- Saint Francis → christianity-6

### Judaism (5 guides)
- Rabbi Eliyahu Stein → judaism-1
- Rabbi Miriam Levin → judaism-2
- Rabbi Shmuel Ben Eliezer → judaism-3
- Rabbi David Levin → judaism-4
- Leah Brenner → judaism-5

### Islam (3 guides)
- Sheikh Yusuf ibn Ahmad → islam-1
- Sheikh Rahman al-Huda → islam-2
- Sayyid Hassan al-Rida → islam-3

### Buddhism (6 guides)
- Sensei Shinran → buddhism-1
- Daishi Ren → buddhism-2
- Venerable Ananda → buddhism-3
- Lama Ananda → buddhism-4
- Lama Dorje → buddhism-5
- Roshi Koan → buddhism-6

### Hinduism (5 guides)
- Anika → hinduism-1
- Shakti Devi → hinduism-2
- Bhairav → hinduism-3
- Advaith → hinduism-4
- Mata Amritanandamayi (Amma) → hinduism-7

### Bahá'í Faith (3 guides)
- Dr. Leila Farzan → bahai-1
- Navid Rahmani → bahai-2
- Farid Anvari → bahai-3

### Sikhism (3 guides)
- Bhai Harjit Singh → sikhism-1
- Bhai Amritpal Singh → sikhism-2
- Satguru Ram Singh → sikhism-3

### Taoism (5 guides)
- Master Li Shen → taoism-1
- Mei Ling → taoism-2
- Xu Yunyao → taoism-3
- Gao Lian → taoism-4
- Liang Zhen → taoism-5

### Confucianism (1 guide)
- Zhou Wei → confucianism-1

### Shinto (5 guides)
- Hikari no Mori → shinto-1
- Kenta Moriyama → shinto-2
- Haruto Takamori → shinto-3
- Emperor Meiji → shinto-4
- Ayaka Hoshino → shinto-5

### Jainism (4 guides)
- Ācārya Satyaprabha → jainism-1
- Sādhvī Pratibha → jainism-2
- Ācārya Ānand → jainism-3
- Ācārya Pratibha → jainism-4

### Polytheism & Universal (4 guides)
- Odin Allfather → norse-1
- Zeus King of Olympus → greek-1
- Ra Lord of the Sun → egyptian-1
- Priestess Oshun → yoruba-1

**Total: 50+ guides with unique D-ID conversation links**

## Debugging

When a conversation is launched, check the browser console (F12) for debug logs:

```
=== Launch Conversation Debug ===
createdGuide: {...}
createdGuide.chatUrl: https://link.divinityagi.com/hinduism-3
createdGuide.guideId: hindu-bhairav
createdGuide.guideName: Bhairav
createdGuide.faith: Hinduism
Step 1 - chatUrl from createdGuide: https://link.divinityagi.com/hinduism-3
=== Final chatUrl selected: https://link.divinityagi.com/hinduism-3
```

If the wrong URL is selected, the logs will show which step found the URL and help diagnose the issue.

## Testing Checklist

To verify the system works correctly:

1. ✅ Match with Bhairav → Should open `hinduism-3`
2. ✅ Match with Mata Amritanandamayi (Amma) → Should open `hindu-amma-1`
3. ✅ Match with Pope Francis → Should open `christianity-1`
4. ✅ Match with Rabbi Shmuel → Should open `judaism-3`
5. ✅ Match with Sheikh Rahman → Should open `islam-2`
6. ✅ Check console logs show correct URL at each step
7. ✅ Verify D-ID agent loads with correct guide personality

## Maintenance

When adding new guides:

1. Add guide to `/DivinityAGI_Master_Guide_Database.csv`
2. Add guide to `/components/guide-matching-data.ts` or `-additional.ts`
3. Add mapping to `/components/guide-chat-url-mapping.ts`
4. Ensure guide has `id`, `name`, `faith`, and `chatUrl` fields
5. Test matching and conversation launch

## Benefits

✅ **Reliability**: Multi-level fallback ensures correct URL is always found
✅ **Maintainability**: Centralized mapping makes updates easy
✅ **Debuggability**: Detailed console logs help diagnose issues
✅ **Scalability**: Easy to add new guides with proper URLs
✅ **User Experience**: Users always get the correct guide conversation

## Last Updated
January 13, 2026 - Complete system rebuild with comprehensive guide coverage
