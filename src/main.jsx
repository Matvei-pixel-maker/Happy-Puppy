import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LanguageProvider from './context/LanguageProvider'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// На мобильных отключаем Lenis — нативный скролл работает быстрее и не перехватывает касания
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

let lenis = null
if (!isMobile) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    // Не перехватывать скролл сразу при инициализации
    anchorScrollDuration: 0,
  })

  // Synchronize Lenis with GSAP ticker
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  
  // Сброс скролла после инициализации Lenis
  setTimeout(() => {
    lenis.scrollTo(0, { immediate: true })
  }, 0)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
