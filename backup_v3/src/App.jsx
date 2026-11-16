import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { MENU_ITEMS } from './data/menu'
import Scene from './components/Scene'
import Decor from './components/Decor'
import ExplodedSection from './components/ExplodedSection'
import BubbleBackground from './components/BubbleBackground'
import './App.css'

const CATEGORIES = ['Все', 'Молочные чаи', 'Фруктовые и ягодные', 'Матча и авторские']

function App() {
  const [selected, setSelected] = useState(MENU_ITEMS[0])
  const [activeCategory, setActiveCategory] = useState('Все')
  const [lang, setLang] = useState('RU')

  const filteredItems = useMemo(() => {
    if (activeCategory === 'Все') return MENU_ITEMS
    return MENU_ITEMS.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  // Плавная прокрутка по якорям (#menu, #about...) без CSS scroll-behavior, чтобы не ломать ScrollTrigger
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href').slice(1)
      const target = id ? document.getElementById(id) : null
      if (!target && id) return
      e.preventDefault()
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fdfbf7] text-[#4a3b32]">
      {/* Фон с плавающими шариками тапиоки на весь сайт */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BubbleBackground />
      </div>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[#4a3b32]/10 bg-[#fdfbf7]/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.png" alt="Happy Puppy" className="h-10 w-10 rounded-2xl object-contain" />
            <span className="text-lg font-extrabold tracking-wide md:text-xl">HAPPY PUPPY</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#menu" className="transition-colors hover:text-[#d97a9e]">Меню</a>
            <a href="#about" className="transition-colors hover:text-[#d97a9e]">О нас</a>
            <a href="#contacts" className="transition-colors hover:text-[#d97a9e]">Контакты</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-3xl border border-[#4a3b32]/10 bg-white/60 p-1 shadow-sm backdrop-blur">
              {['RU', 'EN', 'CN'].map((code) => (
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
                  {code}
                </button>
              ))}
            </div>
            <a
              href="#menu"
              className="rounded-3xl bg-[#f4a6b8] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#ee93aa]"
            >
              Заказать
            </a>
          </div>
        </div>
      </motion.header>

      <main id="top" className="mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-32">
        <section className="relative mb-20 grid items-center gap-10 md:grid-cols-2">
          <div className="relative z-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 inline-flex rounded-3xl bg-[#bfeadf]/60 px-4 py-2 text-sm font-semibold text-[#2f5d52] shadow-sm"
            >
              Натуральные ингредиенты · Свежие топпинги
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-5 text-5xl font-extrabold leading-tight md:text-6xl"
            >
              Лучший бабл-ти в Минске
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mb-8 max-w-xl text-lg leading-relaxed text-[#4a3b32]/80 md:text-xl"
            >
              Готовим напитки из натуральных ингредиентов: свежие ягоды, ароматный чай, молоко и
              топпинги ручной работы. Выберите вкус — и настройте свой идеальный стакан.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={scrollToMenu}
                className="rounded-3xl bg-[#f4a6b8] px-7 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#ee93aa]"
              >
                Выбрать напиток
              </button>
              <div className="inline-flex items-center gap-3 rounded-3xl border border-[#4a3b32]/10 bg-white/60 px-4 py-3 shadow-sm backdrop-blur">
                <span
                  className="inline-block h-4 w-4 rounded-full ring-2 ring-white shadow"
                  style={{ backgroundColor: selected.visual3D.liquidColor }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold">{selected.name.ru}</p>
                  <p className="text-xs text-[#4a3b32]/60">Вы выбрали · вращайте стакан</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative z-0 -mx-6 w-[calc(100%+3rem)] min-h-[500px] md:mx-0 md:w-full md:min-h-auto"
          >
            {/* 2D-декор: фрукты, ягоды и листики вокруг стакана */}
            <Decor />

            <div className="relative z-10">
              <Scene visual3D={selected.visual3D} />
            </div>
          </motion.div>
        </section>

        <ExplodedSection visual3D={selected.visual3D} />

        <section id="menu" className="relative z-20 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#d97a9e]">
              Меню
            </p>
            <h2 className="mb-3 text-4xl font-extrabold md:text-5xl">Выберите свой вкус</h2>
            <p className="max-w-2xl text-lg text-[#4a3b32]/75">
              Нажмите на карточку напитка, чтобы изменить цвет жидкости и топпинги в 3D-стакане.
              Стакан можно вращать мышкой.
            </p>
          </motion.div>

          <div className="mb-8 flex flex-wrap gap-3">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-3xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-[#f4a6b8] text-white shadow-lg'
                      : 'border border-[#4a3b32]/10 bg-white/60 text-[#4a3b32] hover:bg-[#bfeadf]/50'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const active = selected.id === item.id
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -16 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelected(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelected(item)
                      }
                    }}
                    className={`group cursor-pointer rounded-3xl border p-6 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                      active
                        ? 'border-[#f4a6b8] bg-white/80 ring-2 ring-[#f4a6b8]/60'
                        : 'border-white/60 bg-white/55 hover:border-[#bfeadf] hover:bg-white/75'
                    }`}
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#4a3b32]/60">
                          {item.category}
                        </p>
                        <h3 className="mt-1 text-xl font-bold leading-snug">{item.name.ru}</h3>
                        <p className="text-sm text-[#4a3b32]/60">{item.name.en}</p>
                      </div>
                      <span
                        className="mt-1 inline-block h-5 w-5 shrink-0 rounded-full ring-2 ring-white shadow"
                        style={{ backgroundColor: item.visual3D.liquidColor }}
                        aria-hidden="true"
                      />
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-[#4a3b32]/75">
                      {item.description.ru}
                    </p>

                    <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                      <div className="flex flex-col">
                        <span className="text-[#4a3b32]/60">{item.volume}</span>
                        <span className="mt-1 inline-flex w-fit rounded-3xl bg-[#bfeadf]/70 px-3 py-1 text-[#2f5d52]">
                          {item.price.toFixed(2)} BYN
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelected(item)
                        }}
                        className="inline-flex items-center gap-2 rounded-3xl bg-[#f4a6b8] px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#ee93aa]"
                        aria-label={`Добавить в заказ: ${item.name.ru}`}
                        title="Добавить в заказ"
                      >
                        <ShoppingBag size={18} />
                        <span className="hidden sm:inline">В заказ</span>
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        <section id="about" className="relative z-20 mt-24 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/60 bg-white/60 p-8 shadow-lg backdrop-blur-md md:p-10"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#d97a9e]">О нас</p>
            <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">Happy Puppy Cafe</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-[#4a3b32]/80">
              Мы — уютная кофейня бабл-ти в Минске. Используем только натуральные ингредиенты,
              варим тапиоку вручную и готовим каждый напиток с заботой, чтобы он был таким же тёплым
              и радостным, как встреча с любимым щенком.
            </p>
          </motion.div>
        </section>

        <section id="contacts" className="relative z-20 mt-10 mb-8 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-[#4a3b32]/10 bg-[#bfeadf]/30 p-8 shadow-lg md:p-10"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#2f5d52]">Контакты</p>
            <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">Загляните к нам</h2>
            <div className="grid gap-4 text-lg text-[#4a3b32]/80 md:grid-cols-3">
              <div className="rounded-3xl bg-white/60 p-5 shadow-sm backdrop-blur">
                <p className="font-semibold">Адрес</p>
                <p>Минск, ул. Янки Купалы, 19</p>
              </div>
              <div className="rounded-3xl bg-white/60 p-5 shadow-sm backdrop-blur">
                <p className="font-semibold">Время работы</p>
                <p>Пн-Чт 11:00 — 22:00, Пт-Вс 11:00-23:00</p>
              </div>
              <div className="rounded-3xl bg-white/60 p-5 shadow-sm backdrop-blur">
                <p className="font-semibold">Телефон</p>
                <p>+375257265129</p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}

export default App
