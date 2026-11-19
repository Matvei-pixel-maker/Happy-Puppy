import { motion } from 'framer-motion'
import { useLanguage } from '../context/useLanguage'
import { LANGUAGES, LANGUAGE_LABELS } from '../data/translations'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#4a3b32]/10 bg-[#fdfbf7]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3">
        <a href="#top" className="flex items-center gap-1.5">
          <img src="/logo.png" alt="Happy Puppy" className="h-7 w-7 rounded-2xl object-contain md:h-10 md:w-10 md:rounded-2xl drop-shadow-md" />
          <span className={`whitespace-nowrap mr-3 md:mr-0 text-sm font-extrabold tracking-tight md:text-lg`}>{t.brand}</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <a href="#menu" className="transition-colors hover:text-[#d97a9e]">{t.nav.menu}</a>
          <a href="#about" className="transition-colors hover:text-[#d97a9e]">{t.nav.about}</a>
          <a href="#contacts" className="transition-colors hover:text-[#d97a9e]">{t.nav.contacts}</a>
        </nav>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 rounded-3xl border border-[#4a3b32]/10 bg-white/60 p-0.5 shadow-sm backdrop-blur ml-1 md:ml-0`}
            role="group"
            aria-label="Language"
          >
            {LANGUAGES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`rounded-2xl px-2 py-0.5 text-[10px] font-bold transition-all ${
                  lang === code
                    ? 'bg-[#f4a6b8] text-white shadow-sm'
                    : 'text-[#4a3b32]/70 hover:bg-[#bfeadf]/50 hover:text-[#4a3b32]'
                }`}
                aria-pressed={lang === code}
              >
                {LANGUAGE_LABELS[code]}
              </button>
            ))}
          </div>
          <motion.a
            href="#contacts"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-3xl bg-[#f4a6b8] px-2.5 py-1 text-[10px] font-bold text-white shadow-lg transition-all hover:bg-[#ee93aa]"
          >
            {t.nav.order}
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}
