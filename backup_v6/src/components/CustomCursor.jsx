import { useEffect, useState } from 'react'

/**
 * CustomCursor — кастомный курсор из logo.png.
 * CSS-курсоры (url()) часто не отображаются, если картинка больше 32×32
 * или в неподдерживаемом формате, поэтому курсор реализован через DOM-элемент,
 * который следует за мышкой.
 *
 * - pointer-events: none — не блокирует клики по кнопкам и ссылкам
 * - На мобильных устройствах не отображается
 * - Не меняется на «руку» при наведении на интерактивные элементы
 */

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // На мобильных устройствах курсор не нужен
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setVisible(false)
      return
    }

    setVisible(true)

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed pointer-events-none select-none z-[9999]"
      style={{
        left: pos.x,
        top: pos.y,
        width: 32,
        height: 32,
        transform: 'translate(-50%, -50%)',
        backgroundImage: "url('/logo.png')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  )
}
