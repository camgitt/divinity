import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useLocalization } from "./localization-context";
import { Language } from "./translations/translations";
import { Globe, Check, Languages } from "lucide-react";

interface LanguageSelectorProps {
  variant?: "button" | "card" | "minimal";
  showLabel?: boolean;
}

export function LanguageSelector({ variant = "button", showLabel = true }: LanguageSelectorProps) {
  const { language, setLanguage, supportedLanguages, t } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = supportedLanguages.find(lang => lang.code === language);

  if (variant === "minimal") {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#162844]/60 border border-[#1E3A5F]/30 text-slate-300 hover:text-white hover:bg-[#162844]/80 transition-all"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">{currentLang?.flag} {currentLang?.code.toUpperCase()}</span>
        </button>
        
        <LanguageSelectorModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          currentLanguage={language}
          onSelectLanguage={(lang) => {
            setLanguage(lang);
            setIsOpen(false);
          }}
          supportedLanguages={supportedLanguages}
        />
      </>
    );
  }

  if (variant === "card") {
    return (
      <>
        <Card 
          className="bg-[#162844]/60 border-[#1E3A5F]/60 p-4 cursor-pointer hover:bg-[#162844]/80 transition-all"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7A4FFF]/30 to-[#4CAF50]/30 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#7A4FFF]" />
              </div>
              <div>
                <h4 className="text-white text-sm">{t('common_language')}</h4>
                <p className="text-slate-400 text-xs">{currentLang?.nativeName}</p>
              </div>
            </div>
            <div className="text-2xl">{currentLang?.flag}</div>
          </div>
        </Card>
        
        <LanguageSelectorModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          currentLanguage={language}
          onSelectLanguage={(lang) => {
            setLanguage(lang);
            setIsOpen(false);
          }}
          supportedLanguages={supportedLanguages}
        />
      </>
    );
  }

  // Default button variant
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="border-[#1E3A5F]/50 text-slate-300 hover:text-white"
      >
        <Globe className="w-4 h-4 mr-2" />
        {showLabel && <span className="mr-2">{t('common_language')}</span>}
        <span>{currentLang?.flag} {currentLang?.nativeName}</span>
      </Button>
      
      <LanguageSelectorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentLanguage={language}
        onSelectLanguage={(lang) => {
          setLanguage(lang);
          setIsOpen(false);
        }}
        supportedLanguages={supportedLanguages}
      />
    </>
  );
}

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  supportedLanguages: Array<{ code: Language; name: string; nativeName: string; flag: string }>;
}

function LanguageSelectorModal({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
  supportedLanguages,
}: LanguageSelectorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1426] border-[#1E3A5F]/50 max-w-md max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7A4FFF]/30 to-[#4CAF50]/30 flex items-center justify-center">
              <Languages className="w-6 h-6 text-[#7A4FFF]" />
            </div>
            <div>
              <DialogTitle className="text-white">Select Language</DialogTitle>
              <DialogDescription className="text-slate-400">
                Choose your preferred language
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] pr-2 scrollbar-hide">
          <div className="grid grid-cols-1 gap-3">
            {supportedLanguages.map((lang, index) => {
              const isSelected = lang.code === currentLanguage;
              
              return (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectLanguage(lang.code)}
                  className={`
                    relative flex items-center justify-between p-4 rounded-xl border transition-all
                    ${isSelected 
                      ? 'bg-gradient-to-br from-[#7A4FFF]/20 to-[#4CAF50]/20 border-[#7A4FFF]/50' 
                      : 'bg-[#162844]/40 border-[#1E3A5F]/30 hover:bg-[#162844]/60 hover:border-[#1E3A5F]/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{lang.flag}</div>
                    <div className="text-left">
                      <div className={`text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {lang.nativeName}
                      </div>
                      <div className="text-xs text-slate-400">{lang.name}</div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7A4FFF] to-[#4CAF50] flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                  
                  {lang.code === 'ar' && (
                    <Badge variant="outline" className="absolute top-2 right-2 border-[#FFD369]/50 text-[#FFD369] text-xs">
                      RTL
                    </Badge>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#1E3A5F]/30">
          <p className="text-slate-400 text-xs text-center">
            More languages coming soon • Contribute translations
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
