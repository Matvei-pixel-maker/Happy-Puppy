import { useEffect, useMemo, useRef, useState, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import BubbleTeaModel from './BubbleTeaModel'
import CanvasErrorBoundary from './CanvasErrorBoundary'
import CupFallback from './CupFallback'
import { hasWebGL } from '../lib/webgl'

function createCuteEnvMap() {
  if (typeof document === 'undefined') return null

  const size = 512
  const images = []

  for (let i = 0; i < 6; i++) {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) continue

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

  if (images.length < 6) return null

  const cubeMap = new THREE.CubeTexture(images)
  cubeMap.needsUpdate = true
  cubeMap.colorSpace = THREE.SRGBColorSpace

  return cubeMap
}

export default function Scene({ visual3D }) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  )
  const [webglOk, setWebglOk] = useState(() => hasWebGL())
  const cupRef = useRef(null)
  const envMap = useMemo(() => createCuteEnvMap(), [])

  useEffect(() => {
    let ticking = false
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    const onResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          check()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setWebglOk(hasWebGL())
  }, [])

  return (
    <div
      className={`
        relative z-0 h-[500px] w-full
        ${isMobile ? '' : 'cursor-grab active:cursor-grabbing'}
      `}
    >
      {webglOk ? (
        <CanvasErrorBoundary fallback={<CupFallback visual3D={visual3D} />}>
          <Suspense fallback={<CupFallback visual3D={visual3D} />}>
            <Canvas
              dpr={isMobile ? 1 : [1, 2]}
              camera={{ position: [0, 0.4, 6.2], fov: 35 }}
              pointerEvents={isMobile ? 'none' : 'auto'}
              frameloop="demand"
              gl={{ antialias: !isMobile, powerPreference: 'default', failIfMajorPerformanceCaveat: false }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault())
              }}
            >
              <ambientLight intensity={isMobile ? 1.4 : 0.7} />
              <directionalLight position={[3, 5, 4]} intensity={isMobile ? 2.0 : 1.2} />
              <directionalLight position={[-3, 2, -2]} intensity={isMobile ? 1.0 : 0.4} />
              <Float speed={1.6} rotationIntensity={0} floatIntensity={0.6}>
                <group ref={cupRef}>
                  <BubbleTeaModel visual3D={visual3D} isMobile={isMobile} />
                </group>
              </Float>
              {isMobile || !envMap ? null : (
                <>
                  <Environment map={envMap} />
                  <OrbitControls enableZoom={false} />
                </>
              )}
            </Canvas>
          </Suspense>
        </CanvasErrorBoundary>
      ) : (
        <CupFallback visual3D={visual3D} />
      )}
    </div>
  )
}
