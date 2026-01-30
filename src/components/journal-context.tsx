import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner@2.0.3";

interface JournalEntry {
  id: string;
  date: Date;
  prompt?: string;
  content: string;
  mood?: "joyful" | "peaceful" | "grateful" | "contemplative" | "struggling" | "hopeful";
  tags?: string[];
}

interface SpiritualGoal {
  id: string;
  title: string;
  description: string;
  category: "meditation" | "prayer" | "study" | "service" | "gratitude" | "custom";
  targetDays: number;
  currentStreak: number;
  longestStreak: number;
  completedDates: string[]; // ISO date strings
  startDate: Date;
  isActive: boolean;
}

interface JournalPrompt {
  id: string;
  text: string;
  category: "gratitude" | "reflection" | "growth" | "divine" | "challenge" | "wisdom";
  faithSpecific?: string[]; // Optional: specific faith traditions this applies to
}

interface JournalContextType {
  // Journal Entries
  entries: JournalEntry[];
  addEntry: (content: string, mood?: JournalEntry["mood"], prompt?: string) => void;
  deleteEntry: (id: string) => void;
  updateEntry: (id: string, content: string, mood?: JournalEntry["mood"]) => void;
  getEntriesByDateRange: (startDate: Date, endDate: Date) => JournalEntry[];
  getTodayEntry: () => JournalEntry | undefined;
  
  // Journal Prompts
  dailyPrompt: JournalPrompt;
  refreshPrompt: () => void;
  allPrompts: JournalPrompt[];
  
  // Spiritual Goals
  goals: SpiritualGoal[];
  addGoal: (title: string, description: string, category: SpiritualGoal["category"], targetDays: number) => void;
  deleteGoal: (id: string) => void;
  markGoalComplete: (id: string) => void;
  updateGoalStreak: (id: string) => void;
  getActiveGoals: () => SpiritualGoal[];
  
  // Analytics
  getTotalEntries: () => number;
  getCurrentStreaks: () => number;
  getMoodDistribution: () => Record<string, number>;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

// Comprehensive journal prompts library
const JOURNAL_PROMPTS: JournalPrompt[] = [
  // Gratitude Prompts
  { id: "g1", text: "What are three things I'm grateful for today?", category: "gratitude" },
  { id: "g2", text: "Who in my life am I most thankful for, and why?", category: "gratitude" },
  { id: "g3", text: "What challenge am I grateful for, looking back?", category: "gratitude" },
  { id: "g4", text: "What simple pleasure brought me joy today?", category: "gratitude" },
  { id: "g5", text: "How has my spiritual practice blessed my life?", category: "gratitude" },
  
  // Reflection Prompts
  { id: "r1", text: "What lesson did I learn from today's experiences?", category: "reflection" },
  { id: "r2", text: "How did I show kindness or compassion today?", category: "reflection" },
  { id: "r3", text: "What could I have done differently today?", category: "reflection" },
  { id: "r4", text: "What emotions did I experience most strongly today?", category: "reflection" },
  { id: "r5", text: "How did I practice my values today?", category: "reflection" },
  
  // Growth Prompts
  { id: "gr1", text: "What spiritual practice do I want to deepen?", category: "growth" },
  { id: "gr2", text: "What fear or limitation am I ready to release?", category: "growth" },
  { id: "gr3", text: "How am I growing in patience and understanding?", category: "growth" },
  { id: "gr4", text: "What new insight have I gained this week?", category: "growth" },
  { id: "gr5", text: "How can I better serve others?", category: "growth" },
  
  // Divine Connection Prompts
  { id: "d1", text: "Where did I see the divine at work today?", category: "divine" },
  { id: "d2", text: "How did I feel connected to something greater today?", category: "divine" },
  { id: "d3", text: "What scripture or teaching spoke to me today?", category: "divine" },
  { id: "d4", text: "How am I being called to grow spiritually?", category: "divine" },
  { id: "d5", text: "What prayer or meditation touched my heart today?", category: "divine" },
  
  // Challenge Prompts
  { id: "c1", text: "What challenge am I facing, and how can faith help?", category: "challenge" },
  { id: "c2", text: "What am I struggling to forgive or accept?", category: "challenge" },
  { id: "c3", text: "Where do I need guidance right now?", category: "challenge" },
  { id: "c4", text: "What burden can I release today?", category: "challenge" },
  { id: "c5", text: "How can I find peace in this difficult moment?", category: "challenge" },
  
  // Wisdom Prompts
  { id: "w1", text: "What wisdom have I gained from my journey?", category: "wisdom" },
  { id: "w2", text: "What advice would I give my younger self?", category: "wisdom" },
  { id: "w3", text: "What truth am I discovering about myself?", category: "wisdom" },
  { id: "w4", text: "How has my understanding deepened over time?", category: "wisdom" },
  { id: "w5", text: "What do I know now that I wish I'd known sooner?", category: "wisdom" },
];

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [goals, setGoals] = useState<SpiritualGoal[]>([]);
  const [dailyPrompt, setDailyPrompt] = useState<JournalPrompt>(JOURNAL_PROMPTS[0]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem('divinityagi_journal_entries');
      const storedGoals = localStorage.getItem('divinityagi_spiritual_goals');
      
      if (storedEntries) {
        const parsed = JSON.parse(storedEntries);
        // Convert date strings back to Date objects
        const entriesWithDates = parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setEntries(entriesWithDates);
      }
      
      if (storedGoals) {
        const parsed = JSON.parse(storedGoals);
        const goalsWithDates = parsed.map((goal: any) => ({
          ...goal,
          startDate: new Date(goal.startDate)
        }));
        setGoals(goalsWithDates);
      }
      
      // Set daily prompt based on day of year
      const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const promptIndex = dayOfYear % JOURNAL_PROMPTS.length;
      setDailyPrompt(JOURNAL_PROMPTS[promptIndex]);
    } catch (error) {
      console.error('Failed to load journal data:', error);
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('divinityagi_journal_entries', JSON.stringify(entries));
    } catch (error) {
      console.error('Failed to save journal entries:', error);
    }
  }, [entries]);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('divinityagi_spiritual_goals', JSON.stringify(goals));
    } catch (error) {
      console.error('Failed to save spiritual goals:', error);
    }
  }, [goals]);

  const addEntry = useCallback((content: string, mood?: JournalEntry["mood"], prompt?: string) => {
    const newEntry: JournalEntry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date(),
      content,
      mood,
      prompt,
      tags: []
    };
    
    setEntries(prev => [newEntry, ...prev]);
    toast.success("Journal entry saved!");
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast.success("Entry deleted");
  }, []);

  const updateEntry = useCallback((id: string, content: string, mood?: JournalEntry["mood"]) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, content, mood } : entry
    ));
    toast.success("Entry updated");
  }, []);

  const getEntriesByDateRange = useCallback((startDate: Date, endDate: Date) => {
    return entries.filter(entry => 
      entry.date >= startDate && entry.date <= endDate
    );
  }, [entries]);

  const getTodayEntry = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return entries.find(entry => entry.date >= today && entry.date < tomorrow);
  }, [entries]);

  const refreshPrompt = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * JOURNAL_PROMPTS.length);
    setDailyPrompt(JOURNAL_PROMPTS[randomIndex]);
  }, []);

  // Spiritual Goals Functions
  const addGoal = useCallback((
    title: string, 
    description: string, 
    category: SpiritualGoal["category"], 
    targetDays: number
  ) => {
    const newGoal: SpiritualGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      description,
      category,
      targetDays,
      currentStreak: 0,
      longestStreak: 0,
      completedDates: [],
      startDate: new Date(),
      isActive: true
    };
    
    setGoals(prev => [...prev, newGoal]);
    toast.success(`Goal "${title}" created! 🎯`);
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
    toast.success("Goal removed");
  }, []);

  const markGoalComplete = useCallback((id: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        // Check if already completed today
        if (goal.completedDates.includes(today)) {
          toast.info("Already completed today!");
          return goal;
        }
        
        // Check if completed yesterday for streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const newStreak = goal.completedDates.includes(yesterdayStr) 
          ? goal.currentStreak + 1 
          : 1;
        
        const newLongestStreak = Math.max(newStreak, goal.longestStreak);
        
        // Check for milestone
        if (newStreak === 7) {
          toast.success(`🔥 7-day streak on "${goal.title}"!`);
        } else if (newStreak === 30) {
          toast.success(`✨ 30-day streak on "${goal.title}"! Amazing!`);
        } else if (newStreak === 100) {
          toast.success(`🌟 100-day streak on "${goal.title}"! Legendary!`);
        } else {
          toast.success(`Goal completed! 🎉 ${newStreak} day streak!`);
        }
        
        return {
          ...goal,
          completedDates: [...goal.completedDates, today],
          currentStreak: newStreak,
          longestStreak: newLongestStreak
        };
      }
      return goal;
    }));
  }, []);

  const updateGoalStreak = useCallback((id: string) => {
    // This checks and updates streaks (useful for daily refresh)
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        // If not completed today or yesterday, reset streak
        if (!goal.completedDates.includes(today) && !goal.completedDates.includes(yesterdayStr)) {
          return { ...goal, currentStreak: 0 };
        }
      }
      return goal;
    }));
  }, []);

  const getActiveGoals = useCallback(() => {
    return goals.filter(goal => goal.isActive);
  }, [goals]);

  // Analytics
  const getTotalEntries = useCallback(() => entries.length, [entries]);

  const getCurrentStreaks = useCallback(() => {
    return goals.reduce((total, goal) => total + goal.currentStreak, 0);
  }, [goals]);

  const getMoodDistribution = useCallback(() => {
    const distribution: Record<string, number> = {};
    entries.forEach(entry => {
      if (entry.mood) {
        distribution[entry.mood] = (distribution[entry.mood] || 0) + 1;
      }
    });
    return distribution;
  }, [entries]);

  return (
    <JournalContext.Provider
      value={{
        entries,
        addEntry,
        deleteEntry,
        updateEntry,
        getEntriesByDateRange,
        getTodayEntry,
        dailyPrompt,
        refreshPrompt,
        allPrompts: JOURNAL_PROMPTS,
        goals,
        addGoal,
        deleteGoal,
        markGoalComplete,
        updateGoalStreak,
        getActiveGoals,
        getTotalEntries,
        getCurrentStreaks,
        getMoodDistribution,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
}
