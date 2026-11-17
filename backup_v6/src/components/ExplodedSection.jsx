import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExplodedScene from './ExplodedScene'
import { useLanguage } from '../context/useLanguage'

gsap.registerPlugin(ScrollTrigger)

const TEXTS = [
  {
    key: 'tea',
    className: 'left-4 top-[28%] md:left-10 md:top-[26%]',
    align: 'text-left',
    from: { x: -40 },
    start: 0.5,
  },
  {
    key: 'milk',
    className: 'left-4 bottom-[4%] md:left-10 md:bottom-[16%]',
    align: 'text-left',
    from: { x: -40 },
    start: 1.2,
  },
  {
    key: 'tapioca',
    className: 'right-4 top-[40%] md:right-10 md:top-[46%]',
    align: 'text-right',
    from: { x: 40 },
    start: 1.9,
  },
]

export default function ExplodedSection({ visual3D }) {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const textRefs = useRef({})
  // Значение 0..1, которое пишет GSAP и читает 3D-сцена.
  const explodeRef = useRef({ value: 0 })

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const ctx = gsap.context(() => {
      const state = explodeRef.current
      state.value = 0

      // Одна анимация «разборка» (~3 с), которую ScrollTrigger сам проигрывает вперёд
      // при скролле вниз и в обратную сторону при возврате вверх (toggleActions).
      // Тексты — часть того же таймлайна, поэтому при сборке они плавно исчезают
      // в обратном порядке: сначала «Тапиока», потом «Свежее молоко», потом «Натуральный чай».
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          // Без pin (pin-spacer): сцену держит CSS sticky внутри секции высотой 200vh.
          start: 'top top+=80', // сцена встала под шапкой — разборка проигрывается
          end: 'bottom bottom', // низ секции дошёл до низа экрана — дальше обычный скролл
          // onEnter: play — разбирается при скролле вниз;
          // onLeaveBack: reverse — собирается обратно, когда вернулись выше начала секции.
          // onLeave / onEnterBack: none — внизу и при повторном входе ничего не меняется.
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      })

      tl.to(state, { value: 1, duration: 3.2, ease: 'power1.inOut' }, 0)
      tl.to(
        headerRef.current,
        { y: -60, autoAlpha: 0, duration: 3.2, ease: 'power1.inOut' },
        0
      )
      TEXTS.forEach(({ key, from, start }) => {
        const el = textRefs.current[key]
        if (!el) return
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 16, ...from },
          { autoAlpha: 1, x: 0, y: 0, duration: 1.3, ease: 'sine.inOut' },
          start,
        )
      })
    }, section)

    // Пересчёт позиций после загрузки шрифтов/картинок/Canvas.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const timer = window.setTimeout(refresh, 400)

    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="exploded"
      ref={sectionRef}
      className="relative z-20 mb-20 h-[200vh]"
    >
      <div className="sticky top-20 h-[calc(100vh-5rem)] min-h-[520px] overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-lg backdrop-blur-sm">
        <div
          ref={headerRef}
          className="pointer-events-none absolute inset-x-0 top-2 md:top-6 z-10 text-center"
        >
          <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#d97a9e]">
            {t.exploded.eyebrow}
          </p>
          <h2 className="text-3xl font-extrabold md:text-4xl">{t.exploded.title}</h2>
        </div>

        <ExplodedScene visual3D={visual3D} explodeRef={explodeRef} />

        {TEXTS.map(({ key, className, align }) => (
          <div
            key={key}
            ref={(el) => {
              textRefs.current[key] = el
            }}
            className={`pointer-events-none absolute z-10 max-w-[42%] opacity-0 md:max-w-xs ${className} ${align}`}
          >
            <h3 className="mb-1 text-lg font-extrabold md:text-2xl">{t.exploded[key].title}</h3>
            <p className="text-xs leading-relaxed text-[#4a3b32]/75 md:text-base">{t.exploded[key].text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
