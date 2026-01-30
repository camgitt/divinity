import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, TranslationKey } from "./translations/translations";

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  isRTL: boolean;
  supportedLanguages: Array<{ code: Language; name: string; nativeName: string; flag: string }>;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  // Detect browser language or fallback to saved preference
  const getInitialLanguage = (): Language => {
    try {
      // Check saved preference first
      const saved = localStorage.getItem('divinityagi_language');
      if (saved && translations[saved as Language]) {
        return saved as Language;
      }

      // Detect browser language
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      
      // Map browser language to supported languages
      const langMap: Record<string, Language> = {
        'en': 'en',
        'es': 'es',
        'ar': 'ar',
        'hi': 'hi',
        'zh': 'zh',
        'fr': 'fr',
        'pt': 'pt',
        'ru': 'ru',
        'de': 'de',
        'ja': 'ja',
      };
      
      return langMap[browserLang] || 'en';
    } catch {
      return 'en';
    }
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage());

  // RTL languages
  const rtlLanguages: Language[] = ['ar', 'ur', 'he'];
  const isRTL = rtlLanguages.includes(language);

  // Supported languages with metadata
  const supportedLanguages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'zh' as Language, name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'fr' as Language, name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'pt' as Language, name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
    { code: 'ru' as Language, name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'de' as Language, name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja' as Language, name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  ];

  // Translation function with parameter substitution
  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let text = translations[language]?.[key] || translations['en'][key] || key;
    
    // Replace parameters in format {param}
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), String(value));
      });
    }
    
    return text;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('divinityagi_language', lang);
    } catch (e) {
      console.error('Failed to save language preference:', e);
    }
  };

  // Apply RTL direction to HTML element
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t, isRTL, supportedLanguages }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within LocalizationProvider');
  }
  return context;
}
