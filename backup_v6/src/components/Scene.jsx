import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import BubbleTeaModel from './BubbleTeaModel'

function createCuteEnvMap() {
  if (typeof document === 'undefined') return null

  const size = 512
  const images = []

  for (let i = 0; i < 6; i++) {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    // Нежный градиент неба: розовый сверху, мятный посередине, кремовый снизу
    const gradient = ctx.createLinearGradient(0, 0, 0, size)
    gradient.addColorStop(0, '#f4a6b8') // верх — розовый (акцент happy-puppy)
    gradient.addColorStop(0.45, '#bfeadf') // середина — мятный
    gradient.addColorStop(1, '#fdfbf7') // низ — кремовый (фон сайта)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    // Мягкие облачка
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
    ctx.beginPath()
    ctx.arc(size * 0.25, size * 0.28, size * 0.14, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(size * 0.72, size * 0.38, size * 0.11, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(size * 0.48, size * 0.5, size * 0.16, 0, Math.PI * 2)
    ctx.fill()

    images.push(canvas)
  }

  const cubeMap = new THREE.CubeTexture(images)
  cubeMap.needsUpdate = true
  cubeMap.colorSpace = THREE.SRGBColorSpace

  return cubeMap
}

export default function Scene({ visual3D }) {
  const [isMobile, setIsMobile] = useState(false)
  const cupRef = useRef(null)
  const isDraggingRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const envMap = useMemo(() => createCuteEnvMap(), [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Глобальные обработчики перетаскивания стакана пальцем только на мобилке.
  // Вращение работает только когда палец на самом стакане — по фону скролл не блокируется.
  useEffect(() => {
    const onMove = (e) => {
      if (!isDraggingRef.current || !isMobile || !cupRef.current) return
      const dx = e.clientX - lastPosRef.current.x
      const dy = e.clientY - lastPosRef.current.y
      cupRef.current.rotation.y += dx * 0.005
      cupRef.current.rotation.x += dy * 0.005
      lastPosRef.current = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => {
      isDraggingRef.current = false
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointerleave', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointerleave', onUp)
    }
  }, [isMobile])

  return (
    <div className="relative z-0 h-[500px] w-full cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.4, 6.2], fov: 35 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <Float speed={1.6} rotationIntensity={isMobile ? 0 : 0.35} floatIntensity={0.6}>
          <group
            ref={cupRef}
            onPointerDown={(e) => {
              if (!isMobile) return
              e.preventDefault() // блокируем скролл при захвате стакана
              isDraggingRef.current = true
              lastPosRef.current = { x: e.clientX, y: e.clientY }
            }}
          >
            <BubbleTeaModel visual3D={visual3D} isMobile={isMobile} />
          </group>
        </Float>
        <Environment map={envMap} />
        <OrbitControls enablePan={false} enableRotate={!isMobile} enableZoom={!isMobile} minDistance={5.5} maxDistance={10} />
      </Canvas>
    </div>
  )
}
