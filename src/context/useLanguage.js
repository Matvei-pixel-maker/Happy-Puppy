import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'
import { translations } from '../data/translations'

// Возвращает текущий язык, setLang и объект переводов t для текущего языка.
export function useLanguage() {
  const { lang, setLang } = useContext(LanguageContext)
  return { lang, setLang, t: translations[lang] ?? translations.ru }
}