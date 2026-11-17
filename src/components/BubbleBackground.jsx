import { useEffect, useRef } from 'react'

/**
 * BubbleBackground — плавающие пузырьки/шарики тапиоки на 2D Canvas.
 * Оптимизация:
 * - requestAnimationFrame, отмена при размонтировании.
 * - pointer-events-none — не перекрывает текст и 3D-стакан.
 * - Движение мыши только при активном курсоре; на тачах пузырьки просто всплывают.
 * - Позиционирование абсолютное внутри Hero-секции.
 */

const COLORS = ['#c68b59', '#a05a2c', '#8d5524', '#ff758f', '#ffd166', '#bfeadf']

function BubbleBackground() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0 })
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    // На мобилке меньше пузырей — меньше нагрузки на CPU и аккумулятор
    const isMobile = window.innerWidth < 768
    const BUBBLE_COUNT = isMobile ? 12 : 22

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.ceil(rect.width * dpr)
      canvas.height = Math.ceil(rect.height * dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
      sizeRef.current = { w: Math.floor(rect.width), h: Math.floor(rect.height) }
    }
    window.addEventListener('resize', resize)
    resize()

    const mousemove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const mouseleave = () => {
      mouseRef.current = { ...mouseRef.current, active: false }
    }
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseleave', mouseleave)

    const bubbles = Array.from({ length: BUBBLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 6 + Math.random() * 26,
      speed: 0.00008 + Math.random() * 0.0002,
      drift: 0.00002 + Math.random() * 0.00006,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.15 + Math.random() * 0.15,
      blur: Math.random() > 0.5 ? 14 : 0,
    }))

    let t = 0

    const animate = () => {
      t += 0.01
      const { w, h } = sizeRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const b of bubbles) {
        b.y -= b.speed
        b.x += Math.sin(t * b.drift + b.phase) * 0.0003
        if (b.x < 0) b.x = 1
        if (b.x > 1) b.x = 0.999
        if (b.y < -0.1) b.y = 1.1

        if (mouseRef.current.active && w > 0 && h > 0) {
          const mx = mouseRef.current.x / w
          const my = mouseRef.current.y / h
          const dx = b.x - mx
          const dy = b.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 0.18) {
            const force = (0.18 - dist) / 0.18
            b.x = Math.min(1, Math.max(0, b.x + (dx / dist) * force * 0.012))
            b.y = Math.min(1, Math.max(0, b.y + (dy / dist) * force * 0.012))
          }
        }

        const px = b.x * w
        const py = b.y * h

        ctx.save()
        ctx.globalAlpha = b.opacity
        ctx.fillStyle = b.color
        if (b.blur) {
          ctx.shadowBlur = b.blur
          ctx.shadowColor = b.color
        }
        ctx.beginPath()
        ctx.arc(px, py, b.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('mouseleave', mouseleave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      />
    </div>
  )
}

export default BubbleBackground
