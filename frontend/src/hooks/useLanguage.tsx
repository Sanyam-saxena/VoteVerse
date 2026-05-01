import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "mr" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    hero_title: "VoteVerse",
    hero_subtitle: "Interactive election education for every citizen.",
    start_simulator: "Start Simulator",
    ask_ai: "Ask AI Assistant"
  },
  hi: {
    hero_title: "वोटवर्स",
    hero_subtitle: "प्रत्येक नागरिक के लिए इंटरैक्टिव चुनाव शिक्षा।",
    start_simulator: "सिम्युलेटर शुरू करें",
    ask_ai: "AI सहायक से पूछें"
  },
  mr: {
    hero_title: "वोटवर्स",
    hero_subtitle: "प्रत्येक नागरिकासाठी परस्परसंवादी निवडणूक शिक्षण।",
    start_simulator: "सिम्युलेटर सुरू करा",
    ask_ai: "AI सहाय्यकाला विचारा"
  },
  ta: {
    hero_title: "வாட்வெர்ஸ்",
    hero_subtitle: "ஒவ்வொரு குடிமகனுக்கும் ஊடாடும் தேர்தல் கல்வி.",
    start_simulator: "சிமுலேட்டரைத் தொடங்கவும்",
    ask_ai: "AI உதவியாளரிடம் கேளுங்கள்"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
