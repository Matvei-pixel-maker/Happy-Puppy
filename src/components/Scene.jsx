import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import BubbleTeaModel from './BubbleTeaModel'

export default function Scene({ visual3D }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="relative z-0 h-[500px] w-full cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.4, 6.2], fov: 35 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.6}>
          <BubbleTeaModel visual3D={visual3D} isMobile={isMobile} />
        </Float>
        <Environment preset="city" />
        <OrbitControls enablePan={false} enableZoom={!isMobile} minDistance={5.5} maxDistance={10} />
      </Canvas>
    </div>
  )
}
