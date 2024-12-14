import React, { createContext, useContext, useState, useEffect } from "react";
import translateText from "./translationService";

interface TranslationContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  translatePage: () => void;
}

const TranslationContext = createContext<TranslationContextProps>({
  language: "en",
  setLanguage: () => {},
  translatePage: () => {},
});

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState("en");

  const translatePage = async () => {
    try {
      const elements = document.querySelectorAll("[translate='yes']");
      const elementsArray = Array.from(elements);
      elementsArray.forEach(async (element) => {
        if (
          element.textContent != "" &&
          !element.textContent?.includes("ID:")
        ) {
          const originalText = element.textContent || "";
          const origialId = element.id;
          const translatedText = await translateText(
            origialId,
            originalText,
            language
          );
          element.textContent = translatedText;
        }
      });
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`); // Exibe a mensagem de erro
    }
  };

  useEffect(() => {
    translatePage();
  }, [language]);

  return (
    <TranslationContext.Provider
      value={{ language, setLanguage, translatePage }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
