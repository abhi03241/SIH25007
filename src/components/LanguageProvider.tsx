import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    // App
    'app.title': 'LivestockCare',
    'app.subtitle': 'Smart Cattle Management System',
    'app.mission': "At LivestockCare, we believe healthy cattle mean healthy families. But sometimes, small traces of medicines, called microresidues, remain in milk, meat, or eggs. These invisible leftovers can silently harm your cattle, spread diseases to people, and reduce trust in your products. That's why we bring you a smart system where you can easily register cattle, connect with trusted veterinarians, get safe treatment alerts, and even chat with us in your own language. Simple, smart, and farmer-friendly—your partner in keeping livestock safe and your community healthier.",

    // Roles
    'roles.farmer': 'Farmer',
    'roles.veterinarian': 'Veterinarian',
    'roles.admin': 'Admin',
    'roles.farmer_description': 'Register and manage your livestock, track treatments, and connect with veterinarians.',
    'roles.vet_description': 'Provide professional care, manage treatments, and issue digital prescriptions.',
    'roles.admin_description': 'Monitor AMU trends, generate reports, and ensure compliance across regions.',

    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',

    // Nav
    'nav.dashboard': 'Dashboard',
    'nav.cattle': 'My Cattle',
    'nav.treatments': 'Treatments',
    'nav.profile': 'Profile',

    // Farmer features
    'farmer.register_cattle': 'Register New Cattle',
    'farmer.my_veterinarian': 'My Veterinarian',
    'farmer.treatment_history': 'Treatment History',
    'farmer.feature_registration': 'Cattle Registration',
    'farmer.feature_treatment_history': 'Treatment History',
    'farmer.feature_vet_consultation': 'Vet Consultation',
    'farmer.feature_offline_support': 'Offline Support',

    // Vet features
    'vet.farmers': 'Farmers',
    'vet.treatments': 'Treatments',
    'vet.prescriptions': 'Prescriptions',
    'vet.feature_patient_management': 'Patient Management',
    'vet.feature_prescriptions': 'Digital Prescriptions',
    'vet.feature_treatment_forms': 'Treatment Forms',
    'vet.feature_farmer_network': 'Farmer Network',

    // Admin features
    'admin.dashboard': 'Admin Dashboard',
    'admin.analytics': 'Real-time Analytics',
    'admin.reports': 'Compliance Reports',
    'admin.feature_analytics': 'Real-time Analytics',
    'admin.feature_reports': 'Compliance Reports',
    'admin.feature_monitoring': 'Regional Monitoring',
    'admin.feature_data_export': 'Data Export',

    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',

    // Landing page
    'landing.choose_role': 'Choose Your Role',
    'landing.role_description': 'Select your role to access specialized features designed for your needs.',
    'landing.continue_as': 'Continue as',

    // Stats
    'stats.active_farmers': 'Active Farmers',
    'stats.veterinarians': 'Veterinarians',
    'stats.registered_cattle': 'Registered Cattle',
    'stats.treatments_tracked': 'Treatments Tracked',

    // Features section
    'features.heading': 'Why Choose LivestockCare?',
    'features.subheading': 'Our comprehensive platform brings together modern technology and agricultural expertise to revolutionize livestock management.',
    'features.mobile_first': 'Mobile First',
    'features.mobile_first_desc': 'Works perfectly on mobile devices with offline capabilities',
    'features.real_time_updates': 'Real-time Updates',
    'features.real_time_updates_desc': 'Get instant notifications and live data synchronization',
    'features.location_tracking': 'Location Tracking',
    'features.location_tracking_desc': 'GPS-enabled features for regional monitoring and analytics',
    'features.advanced_analytics': 'Advanced Analytics',
    'features.advanced_analytics_desc': 'Comprehensive reporting and trend analysis tools',

    // Farmer Auth
    'farmerAuth.title.login': 'Farmer Login',
    'farmerAuth.title.register': 'Farmer Registration',
    'farmerAuth.title.verifyOtp': 'Verify OTP',
    'farmerAuth.details.login': 'Enter your Aadhaar and phone number',
    'farmerAuth.details.register': 'Enter your Aadhaar, name, and phone number',
    'farmerAuth.otp.placeholder': 'Enter 6-digit OTP',
    'farmerAuth.aadhaar.label': 'Aadhaar Number',
    'farmerAuth.aadhaar.placeholder': 'Enter 12-digit Aadhaar number',
    'farmerAuth.name.label': 'Full Name',
    'farmerAuth.name.placeholder': 'Enter your full name',
    'farmerAuth.phone.label': 'Phone Number',
    'farmerAuth.phone.placeholder': 'Enter your mobile number',
    'farmerAuth.aadhaar.secure': 'Your Aadhaar is secure and encrypted',
    'farmerAuth.sendOtp': 'Send OTP',
    'farmerAuth.continueAsLogin': "Don't have an account? Register",
    'farmerAuth.continueAsRegister': 'Already have an account? Login',
    'farmerAuth.back': 'Back',
    'farmerAuth.verify': 'Verify & Login',
    'farmerAuth.resendOtp': 'Resend OTP',
    'farmerAuth.toast.missingInfo': 'Please fill all required fields.',
    'farmerAuth.toast.missingLoginInfo': 'Please enter Aadhaar and phone number.',
    'farmerAuth.toast.otpSent': 'OTP sent to {phone}',
    'farmerAuth.toast.invalidOtp': 'Please enter the OTP.',
    'farmerAuth.toast.loginSuccess': 'Welcome to your farmer dashboard!',
    'farmerAuth.toast.otpResent': 'New OTP sent to {phone}',

    // Footer
    'footer.copyright': '© 2025 LivestockCare. Empowering smart agriculture through technology.',
  },

  hi: {
    'app.title': 'लाइवस्टॉककेयर',
    'app.subtitle': 'स्मार्ट पशु प्रबंधन प्रणाली',
    'app.mission': 'लाइवस्टॉककेयर में हमारा मानना है कि स्वस्थ पशु ही स्वस्थ परिवार की पहचान हैं। लेकिन कई बार दवाइयों के छोटे-छोटे अंश, जिन्हें माइक्रोरिज़िड्यू कहा जाता है, दूध, मांस या अंडों में रह जाते हैं। ये अदृश्य कण आपके पशुओं को कमजोर कर सकते हैं, इंसानों में बीमारियाँ फैला सकते हैं और आपके उत्पादों पर भरोसा घटा सकते हैं। इसी लिए हम लाए हैं एक स्मार्ट सिस्टम जहाँ आप आसानी से अपने पशु पंजीकृत कर सकते हैं, भरोसेमंद पशु चिकित्सकों से जुड़ सकते हैं, सुरक्षित उपचार अलर्ट पा सकते हैं और अपनी भाषा में हमसे चैट कर सकते हैं। आसान, स्मार्ट और किसान-मित्र—आपके पशु और आपके परिवार की सुरक्षा में आपका साथी।',
    
    'roles.farmer': 'किसान',
    'roles.veterinarian': 'पशु चिकित्सक',
    'roles.admin': 'व्यवस्थापक',
    'roles.farmer_description': 'अपने पशु पंजीकृत करें, उपचार ट्रैक करें और पशु चिकित्सकों से जुड़ें।',
    'roles.vet_description': 'व्यावसायिक देखभाल प्रदान करें, उपचार प्रबंधित करें और डिजिटल नुस्खे जारी करें।',
    'roles.admin_description': 'AMU ट्रेंड मॉनिटर करें, रिपोर्ट जनरेट करें और क्षेत्रीय अनुपालन सुनिश्चित करें।',

    'auth.login': 'लॉगिन',
    'auth.register': 'पंजीकरण',

    'nav.dashboard': 'डैशबोर्ड',
    'nav.cattle': 'मेरे पशु',
    'nav.treatments': 'उपचार',
    'nav.profile': 'प्रोफाइल',

    'farmer.register_cattle': 'नया पशु पंजीकृत करें',
    'farmer.my_veterinarian': 'मेरा पशु चिकित्सक',
    'farmer.treatment_history': 'उपचार इतिहास',
    'farmer.feature_registration': 'पशु पंजीकरण',
    'farmer.feature_treatment_history': 'उपचार इतिहास',
    'farmer.feature_vet_consultation': 'पशु चिकित्सक परामर्श',
    'farmer.feature_offline_support': 'ऑफ़लाइन सहायता',

    'vet.farmers': 'किसान',
    'vet.treatments': 'उपचार',
    'vet.prescriptions': 'नुस्खे',
    'vet.feature_patient_management': 'रोगी प्रबंधन',
    'vet.feature_prescriptions': 'डिजिटल नुस्खे',
    'vet.feature_treatment_forms': 'उपचार फॉर्म',
    'vet.feature_farmer_network': 'किसान नेटवर्क',

    'admin.dashboard': 'व्यवस्थापक डैशबोर्ड',
    'admin.analytics': 'रियल-टाइम विश्लेषण',
    'admin.reports': 'अनुपालन रिपोर्ट',
    'admin.feature_analytics': 'रियल-टाइम विश्लेषण',
    'admin.feature_reports': 'अनुपालन रिपोर्ट',
    'admin.feature_monitoring': 'क्षेत्रीय निगरानी',
    'admin.feature_data_export': 'डेटा निर्यात',

    'theme.light': 'हल्का',
    'theme.dark': 'गहरा',
    'theme.system': 'सिस्टम',

    'landing.choose_role': 'अपना रोल चुनें',
    'landing.role_description': 'अपनी आवश्यकताओं के अनुसार विशेष सुविधाओं तक पहुँचने के लिए रोल चुनें।',
    'landing.continue_as': 'जारी रखें',

    'stats.active_farmers': 'सक्रिय किसान',
    'stats.veterinarians': 'पशु चिकित्सक',
    'stats.registered_cattle': 'पंजीकृत पशु',
    'stats.treatments_tracked': 'ट्रैक किए गए उपचार',

    'features.heading': 'लाइवस्टॉककेयर क्यों चुनें?',
    'features.subheading': 'हमारा व्यापक प्लेटफ़ॉर्म आधुनिक तकनीक और कृषि विशेषज्ञता को एक साथ लाकर पशु प्रबंधन में क्रांति लाता है।',
    'features.mobile_first': 'मोबाइल फ्रेंडली',
    'features.mobile_first_desc': 'ऑफ़लाइन क्षमताओं के साथ मोबाइल डिवाइस पर पूरी तरह काम करता है',
    'features.real_time_updates': 'रियल-टाइम अपडेट',
    'features.real_time_updates_desc': 'तुरंत सूचनाएँ और लाइव डेटा सिंक प्राप्त करें',
    'features.location_tracking': 'स्थान ट्रैकिंग',
    'features.location_tracking_desc': 'क्षेत्रीय निगरानी और विश्लेषण के लिए GPS-समर्थित सुविधाएँ',
    'features.advanced_analytics': 'उन्नत विश्लेषण',
    'features.advanced_analytics_desc': 'विस्तृत रिपोर्टिंग और रुझान विश्लेषण उपकरण',

    'farmerAuth.title.login': 'किसान लॉगिन',
    'farmerAuth.title.register': 'किसान पंजीकरण',
    'farmerAuth.title.verifyOtp': 'OTP सत्यापित करें',
    'farmerAuth.details.login': 'अपना आधार और फ़ोन नंबर दर्ज करें',
    'farmerAuth.details.register': 'अपना आधार, नाम और फ़ोन नंबर दर्ज करें',
    'farmerAuth.otp.placeholder': '6-अंकों का OTP दर्ज करें',
    'farmerAuth.aadhaar.label': 'आधार नंबर',
    'farmerAuth.aadhaar.placeholder': '12-अंकों का आधार नंबर दर्ज करें',
    'farmerAuth.name.label': 'पूरा नाम',
    'farmerAuth.name.placeholder': 'अपना पूरा नाम दर्ज करें',
    'farmerAuth.phone.label': 'फ़ोन नंबर',
    'farmerAuth.phone.placeholder': 'अपना मोबाइल नंबर दर्ज करें',
    'farmerAuth.aadhaar.secure': 'आपका आधार सुरक्षित और एन्क्रिप्टेड है',
    'farmerAuth.sendOtp': 'OTP भेजें',
    'farmerAuth.continueAsLogin': 'खाता नहीं है? पंजीकरण करें',
    'farmerAuth.continueAsRegister': 'पहले से खाता है? लॉगिन करें',
    'farmerAuth.back': 'वापस',
    'farmerAuth.verify': 'सत्यापित करें और लॉगिन करें',
    'farmerAuth.resendOtp': 'OTP पुनः भेजें',
    'farmerAuth.toast.missingInfo': 'कृपया सभी आवश्यक फ़ील्ड भरें।',
    'farmerAuth.toast.missingLoginInfo': 'कृपया आधार और फ़ोन नंबर दर्ज करें।',
    'farmerAuth.toast.otpSent': '{phone} पर OTP भेजा गया',
    'farmerAuth.toast.invalidOtp': 'कृपया OTP दर्ज करें।',
    'farmerAuth.toast.loginSuccess': 'आपके किसान डैशबोर्ड में स्वागत है!',
    'farmerAuth.toast.otpResent': '{phone} पर नया OTP भेजा गया',

    'footer.copyright': '© 2025 LivestockCare। तकनीक के माध्यम से स्मार्ट कृषि को सशक्त बनाना।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
