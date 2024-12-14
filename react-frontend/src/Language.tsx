import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext({ language: "en", setLanguage: (lang: string) => {} });

export const LanguageProvider = ({ children } : any) => {
  const [language, setLanguage] = useState("en");
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
