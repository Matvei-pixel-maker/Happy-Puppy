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
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <img src="/logo.png" alt="Happy Puppy" className="h-10 w-10 rounded-2xl object-contain" />
          <span className="text-lg font-extrabold tracking-wide md:text-xl">{t.brand}</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <a href="#menu" className="transition-colors hover:text-[#d97a9e]">{t.nav.menu}</a>
          <a href="#about" className="transition-colors hover:text-[#d97a9e]">{t.nav.about}</a>
          <a href="#contacts" className="transition-colors hover:text-[#d97a9e]">{t.nav.contacts}</a>
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1 rounded-3xl border border-[#4a3b32]/10 bg-white/60 p-1 shadow-sm backdrop-blur"
            role="group"
            aria-label="Language"
          >
            {LANGUAGES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`rounded-2xl px-2.5 py-1.5 text-xs font-bold transition-all ${
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
          <a
            href="#menu"
            className="rounded-3xl bg-[#f4a6b8] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#ee93aa]"
          >
            {t.nav.order}
          </a>
        </div>
      </div>
    </motion.header>
  )
}
