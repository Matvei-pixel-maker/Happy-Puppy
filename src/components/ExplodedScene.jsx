import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import BubbleTeaModel from './BubbleTeaModel'

// Запоминаем исходную позицию узла, чтобы потом всегда возвращаться ровно в неё.
function base(obj) {
  if (!obj.userData.base) obj.userData.base = obj.position.clone()
  return obj.userData.base
}

/**
 * Rig двигает части стакана по имени (name в BubbleTeaModel.jsx)
 * в зависимости от explodeRef.current.value (0 = целый стакан, 1 = разобран).
 * Значение пишет GSAP ScrollTrigger (scrub), здесь только сглаживание и применение.
 */
function Rig({ explodeRef, children }) {
  const root = useRef(null)
  const current = useRef(0)
  const viewportWidth = useThree((s) => s.viewport.width)

  useFrame((_, delta) => {
    const group = root.current
    if (!group) return

    const target = explodeRef.current.value
    // Экспоненциальное сглаживание — убирает «ступеньки» от колеса мыши.
    current.current += (target - current.current) * (1 - Math.exp(-10 * delta))
    const e = current.current

    const straw = group.getObjectByName('straw')
    const lid = group.getObjectByName('lid')
    const liquid = group.getObjectByName('liquid')
    const toppings = group.getObjectByName('toppings')

    if (straw) straw.position.y = base(straw).y + e * 1.0
    if (lid) lid.position.y = base(lid).y + e * 0.55
    if (liquid) liquid.position.y = base(liquid).y - e * 1.35

    if (toppings) {
      // Шарики разлетаются в стороны; на узком экране — не так далеко.
      const spread = Math.min(2.0, viewportWidth * 0.38)
      toppings.children.forEach((mesh, i) => {
        const b = base(mesh)
        let dx = b.x
        let dz = b.z
        const len = Math.hypot(dx, dz)
        if (len < 0.001) {
          dx = Math.cos(i)
          dz = Math.sin(i)
        } else {
          dx /= len
          dz /= len
        }
        const k = e * spread * (0.55 + (i % 3) * 0.3)
        mesh.position.set(b.x + dx * k, b.y - e * 0.3 + Math.sin(i * 1.7) * 0.25 * e, b.z + dz * k * 0.6)
      })
    }

    // Лёгкий поворот привязан к скроллу (а не к времени) — стакан не крутится сам по себе.
    group.rotation.y = e * 0.5
  })

  return <group ref={root}>{children}</group>
}

export default function ExplodedScene({ visual3D, explodeRef }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9.5], fov: 35 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <Rig explodeRef={explodeRef}>
          <BubbleTeaModel visual3D={visual3D} />
        </Rig>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
