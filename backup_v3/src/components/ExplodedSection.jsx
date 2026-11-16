import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExplodedScene from './ExplodedScene'

gsap.registerPlugin(ScrollTrigger)

const TEXTS = [
  {
    key: 'tea',
    title: 'Натуральный чай',
    text: 'Свежезаваренный листовой чай без ароматизаторов и порошков.',
    className: 'left-4 top-[22%] md:left-10 md:top-[26%]',
    align: 'text-left',
    from: { x: -40 },
    start: 1,
  },
  {
    key: 'milk',
    title: 'Свежее молоко',
    text: 'Фермерское молоко или растительная альтернатива на выбор.',
    className: 'left-4 bottom-[12%] md:left-10 md:bottom-[16%]',
    align: 'text-left',
    from: { x: -40 },
    start: 1.8,
  },
  {
    key: 'tapioca',
    title: 'Тапиока',
    text: 'Шарики варим вручную каждое утро — мягкие и слегка тягучие.',
    className: 'right-4 top-[44%] md:right-10 md:top-[46%]',
    align: 'text-right',
    from: { x: 40 },
    start: 2.6,
  },
]

export default function ExplodedSection({ visual3D }) {
  const sectionRef = useRef(null)
  const textRefs = useRef({})
  // Значение 0..1, которое пишет GSAP (scrub) и читает 3D-сцена.
  const explodeRef = useRef({ value: 0 })

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const ctx = gsap.context(() => {
      const state = explodeRef.current
      state.value = 0

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top+=80', // 80px — высота фиксированной шапки
          end: '+=300%', // длина «проскролла» внутри секции
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Длительность таймлайна = 10 условных единиц, scrub растягивает её на весь скролл.
      // 0 → 4: разлёт, 4 → 6: пауза, 6 → 10: сборка обратно в целый стакан.
      tl.to(state, { value: 1, duration: 4, ease: 'power1.inOut' }, 0)
      tl.to(state, { value: 0, duration: 4, ease: 'power1.inOut' }, 6)

      TEXTS.forEach(({ key, from, start }) => {
        const el = textRefs.current[key]
        if (!el) return
        tl.fromTo(
          el,
          { autoAlpha: 0, ...from },
          { autoAlpha: 1, x: 0, duration: 1.2, ease: 'power2.out' },
          start,
        )
        // Исчезают, когда детали начинают собираться обратно.
        tl.to(el, { autoAlpha: 0, duration: 0.8, ease: 'power1.in' }, 6.4 + start * 0.4)
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
      className="relative z-20 mb-20 h-[calc(100vh-5rem)] min-h-[520px] overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-lg backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute inset-x-0 top-6 z-10 text-center">
        <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#d97a9e]">
          Из чего мы делаем
        </p>
        <h2 className="text-3xl font-extrabold md:text-4xl">Каждый слой — со вкусом</h2>
      </div>

      <ExplodedScene visual3D={visual3D} explodeRef={explodeRef} />

      {TEXTS.map(({ key, title, text, className, align }) => (
        <div
          key={key}
          ref={(el) => {
            textRefs.current[key] = el
          }}
          className={`pointer-events-none absolute z-10 max-w-[42%] opacity-0 md:max-w-xs ${className} ${align}`}
        >
          <h3 className="mb-1 text-lg font-extrabold md:text-2xl">{title}</h3>
          <p className="text-xs leading-relaxed text-[#4a3b32]/75 md:text-base">{text}</p>
        </div>
      ))}
    </section>
  )
}
