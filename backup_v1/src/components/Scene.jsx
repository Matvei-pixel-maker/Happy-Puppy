import { Canvas } from '@react-three/fiber'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import BubbleTeaModel from './BubbleTeaModel'

export default function Scene({ visual3D }) {
  return (
    <div className="relative z-0 h-[500px] w-full cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.4, 4.2], fov: 35 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.6}>
          <BubbleTeaModel visual3D={visual3D} />
        </Float>
        <Environment preset="city" />
        <OrbitControls enablePan={false} minDistance={3} maxDistance={7} />
      </Canvas>
    </div>
  )
}
