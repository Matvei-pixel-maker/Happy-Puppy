import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'

function Toppings({ type, color }) {
  const positions = useMemo(() => {
    const pts = []
    const count = type === 'jelly' ? 10 : 14
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 0.18 + (i % 3) * 0.12
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = -0.95 + Math.floor(i / 7) * 0.18
      pts.push([x, y, z])
    }
    return pts
  }, [type])

  const isJelly = type === 'jelly'
  const size = isJelly ? 0.11 : 0.085

  return (
    <group name="toppings">
      {positions.map((pos, i) => (
        <mesh key={i} name={`topping-${i}`} position={pos} renderOrder={1}>
          {isJelly ? (
            <boxGeometry args={[size, size, size]} />
          ) : (
            <sphereGeometry args={[size, 24, 24]} />
          )}
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.05} />
        </mesh>
      ))}
    </group>
  )
}

export default function BubbleTeaModel({ visual3D }) {
  const liquidColor = visual3D?.liquidColor ?? '#c68b59'
  const toppingColor = visual3D?.toppingColor ?? '#1a110b'
  const toppingType = visual3D?.toppingType ?? 'tapioca'
  const logoTexture = useTexture('/logo.png')

  return (
    <group name="bubble-tea" position={[0, -0.2, 0]}>
      {/* Plastic cup */}
      <mesh name="cup">
        <cylinderGeometry args={[0.72, 0.62, 2.4, 48, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.3}
          depthWrite={false}
          roughness={0.08}
          transmission={0.6}
          thickness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.12}
          side={2}
        />
      </mesh>

      {/* Logo on front of cup (curved to cup surface) */}
      <mesh name="cup-logo" position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.697, 0.659, 0.9, 48, 1, true, -0.7, 1.4]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent
          alphaTest={0.02}
          toneMapped={false}
          side={2}
        />
      </mesh>

      {/* Cup bottom */}
      <mesh name="cup-bottom" position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.62, 48]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.3}
          depthWrite={false}
          roughness={0.08}
          transmission={0.5}
          thickness={0.25}
        />
      </mesh>

      {/* Liquid */}
      <mesh name="liquid" position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.67, 0.58, 1.95, 48]} />
        <meshPhysicalMaterial
          color={liquidColor}
          transparent={true}
          opacity={0.8}
          depthWrite={false}
          roughness={0.15}
          transmission={0}
          thickness={0}
        />
      </mesh>

      {/* Lid */}
      <mesh name="lid" position={[0, 1.23, 0]}>
        <cylinderGeometry args={[0.74, 0.72, 0.08, 48]} />
        <meshPhysicalMaterial color="#f3f4f6" roughness={0.3} metalness={0.05} clearcoat={0.4} />
      </mesh>

      {/* Straw */}
      <group name="straw" position={[0.18, 0.5, 0]} rotation={[0, 0, -0.18]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 3.1, 24]} />
          <meshPhysicalMaterial color="#f59e0b" roughness={0.2} clearcoat={0.6} />
        </mesh>
        <mesh position={[0, -1.55, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 24]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
      </group>

      {/* Toppings */}
      <Toppings type={toppingType} color={toppingColor} />
    </group>
  )
}

useTexture.preload('/logo.png')
