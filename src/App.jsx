import { useState } from "react";
import AppDA from "./AppDA.jsx";
import AppEN from "./AppEN.jsx";

export default function App() {
  const [lang, setLang] = useState(navigator.language?.startsWith("en") ? "en" : "da");
  return lang === "da" ? <AppDA onLangChange={setLang} /> : <AppEN onLangChange={setLang} />;
}
