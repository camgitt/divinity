// Centralized Community Circles Data for all Faith Traditions
// This data is shared between the Circle of Faiths page and individual faith pages

export interface CommunityCircle {
  id: string;
  title: string;
  description: string;
  image: string;
  members: number;
  activity: string;
  tags: string[];
  category: string; // Which faith tradition this belongs to
  isPrivate: boolean;
  language: string;
  recentActivity: string;
  faithColor: string; // Primary color for the faith
  faithColorHover: string; // Hover color for the faith
}

export const communityCirclesData: CommunityCircle[] = [
  // Christianity Circles
  {
    id: "christian-contemplatives",
    title: "Christian Contemplatives",
    description: "Exploring the mystical traditions of Christian prayer and meditation in the Orthodox tradition.",
    image: "https://images.unsplash.com/photo-1741352247254-02b91a3b9e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjBwcmF5ZXIlMjBtZWRpdGF0aW9uJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU5MzQ1MDc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 1247,
    activity: "Active today",
    tags: ["Prayer", "Meditation", "Scripture"],
    category: "Christianity",
    isPrivate: false,
    language: "English",
    recentActivity: "Discussion: 'The Desert Fathers and Modern Contemplation' started 2 hours ago",
    faithColor: "#E53935",
    faithColorHover: "#C62828"
  },
  {
    id: "christian-scripture-study",
    title: "Gospel Study Fellowship",
    description: "Deep diving into the teachings of Christ through scripture study and discussion.",
    image: "https://images.unsplash.com/photo-1758638153798-493e93e9a081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjBib29rJTIwc3R1ZHklMjB3aXNkb20lMjBsZWFybmluZ3xlbnwxfHx8fDE3NTkzNDUxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 1834,
    activity: "2 hours ago",
    tags: ["Gospel", "Bible Study", "Fellowship"],
    category: "Christianity",
    isPrivate: false,
    language: "English",
    recentActivity: "Weekly study: Understanding the Sermon on the Mount",
    faithColor: "#E53935",
    faithColorHover: "#C62828"
  },

  // Islam Circles
  {
    id: "quran-study-circle",
    title: "Quran Study Circle",
    description: "Daily reflection on Quranic verses with tafsir and practical application for modern life.",
    image: "https://images.unsplash.com/photo-1711552466299-591f90722fcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwbW9zcXVlJTIwcGVhY2VmdWwlMjBwcmF5ZXJ8ZW58MXx8fHwxNzU5MzQ1MDg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 2456,
    activity: "Active today",
    tags: ["Quran", "Tafsir", "Reflection"],
    category: "Islam",
    isPrivate: false,
    language: "English",
    recentActivity: "Discussion: 'Understanding Surah Al-Fatiha' - 52 new insights",
    faithColor: "#2E7D32",
    faithColorHover: "#1B5E20"
  },
  {
    id: "ummah-connections",
    title: "Ummah Connections",
    description: "Building brotherhood and sisterhood through shared Islamic values and community support.",
    image: "https://images.unsplash.com/photo-1711552466299-591f90722fcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwbW9zcXVlJTIwcGVhY2VmdWwlMjBwcmF5ZXJ8ZW58MXx8fHwxNzU5MzQ1MDg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 3187,
    activity: "3 hours ago",
    tags: ["Community", "Service", "Brotherhood"],
    category: "Islam",
    isPrivate: false,
    language: "English",
    recentActivity: "Community iftar planning for Ramadan - volunteers needed",
    faithColor: "#2E7D32",
    faithColorHover: "#1B5E20"
  },

  // Buddhism Circles
  {
    id: "buddhist-meditation-circle",
    title: "Buddhist Meditation Circle",
    description: "Practicing mindfulness and compassion through traditional Buddhist meditation techniques.",
    image: "https://images.unsplash.com/photo-1573285702030-f7952e595655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMG1lZGl0YXRpb24lMjB0ZW1wbGUlMjBzZXJlbmV8ZW58MXx8fHwxNzU5MzQ1MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 1756,
    activity: "1 hour ago",
    tags: ["Mindfulness", "Compassion", "Meditation"],
    category: "Buddhism",
    isPrivate: false,
    language: "English",
    recentActivity: "Guided loving-kindness meditation shared by member Sarah",
    faithColor: "#F9A825",
    faithColorHover: "#F57F17"
  },
  {
    id: "dharma-teachings",
    title: "Dharma Teachings Circle",
    description: "Studying the Buddha's teachings and applying them to everyday life challenges.",
    image: "https://images.unsplash.com/photo-1573285702030-f7952e595655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMG1lZGl0YXRpb24lMjB0ZW1wbGUlMjBzZXJlbmV8ZW58MXx8fHwxNzU5MzQ1MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 923,
    activity: "5 hours ago",
    tags: ["Dharma", "Wisdom", "Study"],
    category: "Buddhism",
    isPrivate: false,
    language: "English",
    recentActivity: "New series: The Four Noble Truths in modern context",
    faithColor: "#F9A825",
    faithColorHover: "#F57F17"
  },

  // Hinduism Circles
  {
    id: "hindu-philosophy-study",
    title: "Hindu Philosophy Study",
    description: "Delving deep into Vedantic teachings and exploring the paths of yoga and devotion.",
    image: "https://images.unsplash.com/photo-1639792378050-85d804ba7b98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbCUyMGRldm90aW9ufGVufDF8fHx8MTc1OTM0NTA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    members: 1634,
    activity: "4 hours ago",
    tags: ["Vedanta", "Yoga", "Devotion"],
    category: "Hinduism",
    isPrivate: false,
    language: "English",
    recentActivity: "Chapter 12 of the Bhagavad Gita discussion scheduled for tomorrow",
    faithColor: "#F4511E",
    faithColorHover: "#D84315"
  },
  {
    id: "bhakti-devotion",
    title: "Bhakti Devotion Circle",
    description: "Celebrating the path of devotional love through kirtan, bhajan, and shared practice.",
    image: "https://images.unsplash.com/photo-1639792378050-85d804ba7b98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbCUyMGRldm90aW9ufGVufDF8fHx8MTc1OTM0NTA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    members: 2103,
    activity: "Active today",
    tags: ["Bhakti", "Kirtan", "Devotion"],
    category: "Hinduism",
    isPrivate: false,
    language: "English",
    recentActivity: "Virtual kirtan session tonight at 7 PM EST",
    faithColor: "#F4511E",
    faithColorHover: "#D84315"
  },

  // Judaism Circles
  {
    id: "jewish-wisdom-traditions",
    title: "Jewish Wisdom Traditions",
    description: "Exploring Kabbalah, Talmudic wisdom, and modern Jewish spirituality.",
    image: "https://images.unsplash.com/photo-1686953008244-dfe0ab20c4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdpc2glMjBzeW5hZ29ndWUlMjB3aXNkb20lMjBzdHVkeXxlbnwxfHx8fDE3NTkzNDUwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 1523,
    activity: "6 hours ago",
    tags: ["Kabbalah", "Talmud", "Torah"],
    category: "Judaism",
    isPrivate: true,
    language: "English",
    recentActivity: "Private study session: Tree of Life symbolism discussion",
    faithColor: "#1565C0",
    faithColorHover: "#0D47A1"
  },
  {
    id: "torah-study-group",
    title: "Torah Study Group",
    description: "Weekly parasha study with traditional and contemporary commentary.",
    image: "https://images.unsplash.com/photo-1686953008244-dfe0ab20c4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdpc2glMjBzeW5hZ29ndWUlMjB3aXNkb20lMjBzdHVkeXxlbnwxfHx8fDE3NTkzNDUwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 987,
    activity: "Active today",
    tags: ["Torah", "Study", "Commentary"],
    category: "Judaism",
    isPrivate: false,
    language: "English",
    recentActivity: "This week's portion: Bereishit - discussing creation narratives",
    faithColor: "#1565C0",
    faithColorHover: "#0D47A1"
  },

  // Sikhism Circles
  {
    id: "sikh-service-circle",
    title: "Sikh Service Circle",
    description: "Living the principles of service, equality, and devotion in daily life.",
    image: "https://images.unsplash.com/photo-1562336522-2fcfdcd88d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtoJTIwZ3VyZHdhcmElMjBjb21tdW5pdHklMjBzZXJ2aWNlfGVufDF8fHx8MTc1OTM0NTEwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    members: 1445,
    activity: "3 hours ago",
    tags: ["Service", "Equality", "Devotion"],
    category: "Sikhism",
    isPrivate: false,
    language: "English",
    recentActivity: "Community service project planning for local food bank",
    faithColor: "#F57F17",
    faithColorHover: "#E65100"
  },
  {
    id: "gurbani-study",
    title: "Gurbani Study Circle",
    description: "Exploring the divine wisdom of the Guru Granth Sahib through study and reflection.",
    image: "https://images.unsplash.com/photo-1562336522-2fcfdcd88d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtoJTIwZ3VyZHdhcmElMjBjb21tdW5pdHklMjBzZXJ2aWNlfGVufDF8fHx8MTc1OTM0NTEwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    members: 876,
    activity: "Active today",
    tags: ["Gurbani", "Study", "Wisdom"],
    category: "Sikhism",
    isPrivate: false,
    language: "English",
    recentActivity: "Daily Hukamnama reflection and discussion",
    faithColor: "#F57F17",
    faithColorHover: "#E65100"
  },

  // Jainism Circles
  {
    id: "jain-ahimsa-practice",
    title: "Ahimsa Practice Circle",
    description: "Exploring non-violence in thought, word, and deed through Jain principles.",
    image: "https://images.unsplash.com/photo-1573285702030-f7952e595655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMG1lZGl0YXRpb24lMjB0ZW1wbGUlMjBzZXJlbmV8ZW58MXx8fHwxNzU5MzQ1MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 567,
    activity: "2 hours ago",
    tags: ["Ahimsa", "Non-violence", "Practice"],
    category: "Jainism",
    isPrivate: false,
    language: "English",
    recentActivity: "Discussion: Practicing compassion in everyday interactions",
    faithColor: "#FFB300",
    faithColorHover: "#FF8F00"
  },

  // Polytheism Circles
  {
    id: "polytheistic-traditions",
    title: "Polytheistic Traditions Circle",
    description: "Honoring many gods and exploring diverse polytheistic paths from around the world.",
    image: "https://images.unsplash.com/photo-1705313381805-deb249066982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmZhaXRoJTIwY29tbXVuaXR5JTIwdW5pdHklMjBkaXZlcnNpdHl8ZW58MXx8fHwxNzU5MzQ1MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 834,
    activity: "4 hours ago",
    tags: ["Polytheism", "Traditions", "Diversity"],
    category: "Polytheism",
    isPrivate: false,
    language: "English",
    recentActivity: "Full moon ritual discussion - sharing practices",
    faithColor: "#F59E0B",
    faithColorHover: "#D97706"
  },

  // Confucianism Circles
  {
    id: "confucian-virtue-study",
    title: "Confucian Virtue Circle",
    description: "Studying the Analects and cultivating virtue through moral development.",
    image: "https://images.unsplash.com/photo-1758638153798-493e93e9a081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjBib29rJTIwc3R1ZHklMjB3aXNkb20lMjBsZWFybmluZ3xlbnwxfHx8fDE3NTkzNDUxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 445,
    activity: "Active today",
    tags: ["Virtue", "Ethics", "Study"],
    category: "Confucianism",
    isPrivate: false,
    language: "English",
    recentActivity: "Weekly Analects reading: The importance of Ren (benevolence)",
    faithColor: "#5D4037",
    faithColorHover: "#3E2723"
  },

  // General/Interfaith Circles
  {
    id: "interfaith-dialogue-hub",
    title: "Interfaith Dialogue Hub",
    description: "Fostering understanding and unity across all spiritual traditions through respectful conversation.",
    image: "https://images.unsplash.com/photo-1705313381805-deb249066982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmZhaXRoJTIwY29tbXVuaXR5JTIwdW5pdHklMjBkaXZlcnNpdHl8ZW58MXx8fHwxNzU5MzQ1MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 2856,
    activity: "Active now",
    tags: ["Unity", "Dialogue", "Understanding"],
    category: "General",
    isPrivate: false,
    language: "Multiple",
    recentActivity: "Live: What does compassion mean across traditions?",
    faithColor: "#7A4FFF",
    faithColorHover: "#6D28D9"
  },
  {
    id: "sacred-text-study",
    title: "Sacred Text Study Group",
    description: "Comparative study of wisdom literature from various spiritual traditions around the world.",
    image: "https://images.unsplash.com/photo-1758638153798-493e93e9a081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjBib29rJTIwc3R1ZHklMjB3aXNkb20lMjBsZWFybmluZ3xlbnwxfHx8fDE3NTkzNDUxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    members: 1723,
    activity: "5 hours ago",
    tags: ["Scripture", "Study", "Wisdom"],
    category: "General",
    isPrivate: false,
    language: "English",
    recentActivity: "Comparing creation stories across traditions - Week 3",
    faithColor: "#7A4FFF",
    faithColorHover: "#6D28D9"
  }
];

// Helper function to get circles by category
export function getCirclesByCategory(category: string): CommunityCircle[] {
  if (category === "All") {
    return communityCirclesData;
  }
  return communityCirclesData.filter(circle => circle.category === category);
}

// Helper function to get circles for a specific faith
export function getCirclesForFaith(faithKey: string): CommunityCircle[] {
  const faithMap: Record<string, string> = {
    'christianity': 'Christianity',
    'islam': 'Islam',
    'buddhism': 'Buddhism',
    'hinduism': 'Hinduism',
    'judaism': 'Judaism',
    'sikhism': 'Sikhism',
    'jainism': 'Jainism',
    'polytheism': 'Polytheism',
    'confucianism': 'Confucianism',
    'daoism': 'Daoism',
    'taoism': 'Taoism',
    'shinto': 'Shinto',
    'bahai': 'Bahai'
  };

  const categoryName = faithMap[faithKey.toLowerCase()];
  return communityCirclesData.filter(circle => circle.category === categoryName);
}

// Helper function to search circles
export function searchCircles(query: string, category: string = "All"): CommunityCircle[] {
  const circles = category === "All" ? communityCirclesData : getCirclesByCategory(category);
  
  if (!query.trim()) {
    return circles;
  }

  const lowerQuery = query.toLowerCase();
  return circles.filter(circle =>
    circle.title.toLowerCase().includes(lowerQuery) ||
    circle.description.toLowerCase().includes(lowerQuery) ||
    circle.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
