import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    'app.title': 'LivestockCare',
    'app.subtitle': 'Smart Cattle Management System',
    'app.mission': "At LivestockCare, we believe healthy cattle mean healthy families. But sometimes, small traces of medicines, called microresidues, remain in milk, meat, or eggs. These invisible leftovers can silently harm your cattle, spread diseases to people, and reduce trust in your products. That's why we bring you a smart system where you can easily register cattle, connect with trusted veterinarians, get safe treatment alerts, and even chat with us in your own language. Simple, smart, and farmer-friendly—your partner in keeping livestock safe and your community healthier. 🌱",
    'roles.farmer': 'Farmer',
    'roles.veterinarian': 'Veterinarian',
    'roles.admin': 'Admin',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.cattle': 'My Cattle',
    'nav.treatments': 'Treatments',
    'nav.profile': 'Profile',
    'farmer.register_cattle': 'Register New Cattle',
    'farmer.my_veterinarian': 'My Veterinarian',
    'farmer.treatment_history': 'Treatment History',
    'vet.farmers': 'Farmers',
    'vet.treatments': 'Treatments',
    'vet.prescriptions': 'Prescriptions',
    'admin.dashboard': 'Admin Dashboard',
    'admin.analytics': 'Analytics',
    'admin.reports': 'Reports',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
  },
  hi: {
    'app.title': 'लाइवस्टॉककेयर',
    'app.subtitle': 'स्मार्ट पशु प्रबंधन प्रणाली',
    'app.mission': 'लाइवस्टॉककेयर में हमारा मानना है कि स्वस्थ पशु ही स्वस्थ परिवार की पहचान हैं। लेकिन कई बार दवाइयों के छोटे-छोटे अंश, जिन्हें माइक्रोरिज़िड्यू कहा जाता है, दूध, मांस या अंडों में रह जाते हैं। ये अदृश्य कण आपके पशुओं को कमजोर कर सकते हैं, इंसानों में बीमारियाँ फैला सकते हैं और आपके उत्पादों पर भरोसा घटा सकते हैं। इसी लिए हम लाए हैं एक स्मार्ट सिस्टम जहाँ आप आसानी से अपने पशु पंजीकृत कर सकते हैं, भरोसेमंद पशु चिकित्सकों से जुड़ सकते हैं, सुरक्षित उपचार अलर्ट पा सकते हैं और अपनी भाषा में हमसे चैट कर सकते हैं। आसान, स्मार्ट और किसान-मित्र—आपके पशु और आपके परिवार की सुरक्षा में आपका साथी। 🌱',
    'roles.farmer': 'किसान',
    'roles.veterinarian': 'पशु चिकित्सक',
    'roles.admin': 'व्यवस्थापक',
    'auth.login': 'लॉगिन',
    'auth.register': 'पंजीकरण',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.cattle': 'मेरे पशु',
    'nav.treatments': 'उपचार',
    'nav.profile': 'प्रोफाइल',
    'farmer.register_cattle': 'नया पशु पंजीकृत करें',
    'farmer.my_veterinarian': 'मेरा पशु चिकित्सक',
    'farmer.treatment_history': 'उपचार इतिहास',
    'vet.farmers': 'किसान',
    'vet.treatments': 'उपचार',
    'vet.prescriptions': 'नुस्खे',
    'admin.dashboard': 'व्यवस्थापक डैशबोर्ड',
    'admin.analytics': 'विश्लेषण',
    'admin.reports': 'रिपोर्ट',
    'theme.light': 'हल्का',
    'theme.dark': 'गहरा',
    'theme.system': 'सिस्टम',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};