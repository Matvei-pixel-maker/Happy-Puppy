import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './LanguageContext'
import { LANGUAGES } from '../data/translations'

const STORAGE_KEY = 'happy-puppy-lang'

function getInitialLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && LANGUAGES.includes(saved)) return saved
  } catch {
    // localStorage может быть недоступен — используем язык по умолчанию
  }
  return 'ru'
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'cn' ? 'zh' : lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // игнорируем
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}