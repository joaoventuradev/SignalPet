import { useEffect } from "react";
import { useTranslation } from "../service/TranslationProvider";
import { reportHeader } from "../utils/constants";

const styles = {
  container: {
    backgroundColor: "#064c60",
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "space-between",
    padding: "1rem",
    width: "100%",
  },
  logo: {
    width: "10rem",
  },
  secondaryText: {
    color: "#fff",
  },
};

const ReportHeader = () => {
  const { setLanguage, language } = useTranslation();

  const detectAndSetLanguage = () => {
    const browserLanguage = navigator.language.split("-")[0];
    const supportedLanguages = ["en", "de", "es", "fr", "pt"];

    if (supportedLanguages.includes(browserLanguage)) {
      setLanguage(browserLanguage);
    } else {
      setLanguage("en");
    }
  };

  useEffect(() => {
    detectAndSetLanguage();
  }, []);

  const buttonStyle = (lang: string) => {
    return lang === language
      ? { border: "2px solid blue" }
      : {};
  };

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => setLanguage("en")}
          style={buttonStyle("en")} 
        >
          English
        </button>
        <button
          onClick={() => setLanguage("de")}
          style={buttonStyle("de")} 
        >
          German
        </button>
        <button
          onClick={() => setLanguage("es")}
          style={buttonStyle("es")} 
        >
          Spanish
        </button>
        <button
          onClick={() => setLanguage("fr")}
          style={buttonStyle("fr")} 
        >
          French
        </button>
        <button
          onClick={() => setLanguage("pt")}
          style={buttonStyle("pt")} 
        >
          Portuguese
        </button>
      </div>
      <div style={styles.container}>
        <img
          alt="Logo"
          src={require("../static/logo.png")}
          style={styles.logo}
        />
        <span style={styles.secondaryText} translate="yes">
          {reportHeader.secondaryText}
        </span>
      </div>
    </>
  );
};

export default ReportHeader;
