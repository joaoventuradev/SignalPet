async function translateText(id: string, text: string, targetLang: string): Promise<string> {
    const response = await fetch(`http://localhost:3001/api/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text, targetLang }),
    });
    const data = await response.json();
    return data.translatedText;
  }
  
  export default translateText;