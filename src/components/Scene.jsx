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

    const gradient = ctx.createLinearGradient(0, 0, 0, size)
    gradient.addColorStop(0, '#f4a6b8')
    gradient.addColorStop(0.45, '#bfeadf')
    gradient.addColorStop(1, '#fdfbf7')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

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
  const envMap = useMemo(() => createCuteEnvMap(), [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      className={`
        relative z-0 h-[500px] w-full
        ${isMobile ? '' : 'cursor-grab active:cursor-grabbing'}
      `}
    >
      <Canvas
        dpr={isMobile ? 1 : [1, 2]}
        camera={{ position: [0, 0.4, 6.2], fov: 35 }}
        // На мобилке полностью отключаем интерактивность Canvas,
        // чтобы касания не перехватывали скролл страницы.
        pointerEvents={isMobile ? 'none' : 'auto'}
      >
        <ambientLight intensity={isMobile ? 1.4 : 0.7} />
        <directionalLight position={[3, 5, 4]} intensity={isMobile ? 2.0 : 1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={isMobile ? 1.0 : 0.4} />
        <Float speed={1.6} rotationIntensity={0} floatIntensity={0.6}>
          <group ref={cupRef}>
            <BubbleTeaModel visual3D={visual3D} isMobile={isMobile} />
          </group>
        </Float>
        {isMobile ? null : (
          <>
            <Environment map={envMap} />
            <OrbitControls enableZoom={false} />
          </>
        )}
      </Canvas>
    </div>
  )
}
