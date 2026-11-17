import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { id: 1, image: '/cafe9.jpg', alt: 'Интерьер кофейни 1' },
  { id: 2, image: '/cafe10.jpg', alt: 'Интерьер кофейни 2' },
  { id: 3, image: '/cafe7.jpg', alt: 'Интерьер кофейни 3' },
  { id: 4, image: '/cafe8.jpg', alt: 'Интерьер кофейни 4' },
  { id: 5, image: '/cafe3.webp', alt: 'Интерьер кофейни 5' },
]

export default function PhotoIntro() {
  const sectionRef = useRef(null)
  const imageRefs = useRef([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const imageElements = imageRefs.current
    const totalCards = imageElements.length

    if (!section || !imageElements[0]) return undefined

    gsap.set(imageElements[0], { y: '0%', scale: 1, rotation: 0 })
    for (let i = 1; i < totalCards; i++) {
      if (!imageElements[i]) continue
      gsap.set(imageElements[i], { y: '100%', scale: 1, rotation: 0 })
    }

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * totalCards}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    })

    for (let i = 0; i < totalCards - 1; i++) {
      const currentImage = imageElements[i]
      const nextImage = imageElements[i + 1]
      if (!currentImage || !nextImage) continue

      scrollTimeline.to(
        currentImage,
        { scale: 0.7, rotation: 5, autoAlpha: 0, duration: 1, ease: 'none' },
        i,
      )
      scrollTimeline.to(
        nextImage,
        { y: '0%', duration: 1, ease: 'none' },
        i,
      )
    }

    // Плавное затухание последней фотки — переход на сайт
    scrollTimeline.to(
      imageElements[totalCards - 1],
      { autoAlpha: 0, duration: 0.8, ease: 'power2.out' },
      totalCards - 1.5,
    )
    // Гасим все предыдущие фото, чтобы 4-я не мелькала за 5-й
    scrollTimeline.to(
      imageElements.slice(0, totalCards - 1),
      { autoAlpha: 0, duration: 0.01 },
      totalCards - 1.5,
    )

    return () => {
      scrollTimeline.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#fdfbf7]">
      <div className="top-0 z-10 h-screen w-full flex items-center justify-center">
        <div className="relative h-[85vh] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto overflow-hidden rounded-[3rem] shadow-2xl border border-white/60 bg-white/80 backdrop-blur-sm">
          {CARDS.map((card, i) => (
            <img
              key={card.id}
              src={card.image}
              alt={card.alt}
              className="absolute inset-0 h-full w-full object-cover rounded-[3rem]"
              ref={(el) => {
                imageRefs.current[i] = el
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
