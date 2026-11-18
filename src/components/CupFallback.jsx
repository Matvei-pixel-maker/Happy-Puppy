/**
 * CupFallback — статичная замена 3D-стакана.
 * Показывается, если WebGL недоступен (мобильные WebView) или сцена упала.
 */
export default function CupFallback({ visual3D }) {
  const liquidColor = visual3D?.liquidColor ?? '#c68b59'
  const toppingColor = visual3D?.toppingColor ?? '#1a110b'

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative" style={{ width: 160, height: 260 }}>
        {/* Стакан */}
        <div
          className="absolute inset-x-0 bottom-0 rounded-b-[2rem] rounded-t-[1rem] border-2 border-white/70 shadow-xl backdrop-blur-sm"
          style={{
            top: 0,
            background: 'linear-gradient(160deg, rgba(255,255,255,0.55), rgba(255,255,255,0.15))',
            clipPath: 'polygon(6% 0%, 94% 0%, 84% 100%, 16% 100%)',
          }}
        >
          {/* Жидкость */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              top: '28%',
              background: liquidColor,
              borderRadius: '0 0 2rem 2rem',
              clipPath: 'polygon(3% 0%, 97% 0%, 84% 100%, 16% 100%)',
              opacity: 0.85,
            }}
          />
          {/* Шарики тапиоки */}
          {[
            [22, 88],
            [44, 90],
            [66, 87],
            [33, 80],
            [55, 81],
            [44, 72],
          ].map(([left, bottom], i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                bottom: `${bottom}%`,
                width: 14,
                height: 14,
                backgroundColor: toppingColor,
                transform: 'translateX(-50%)',
                boxShadow: 'inset -2px -2px 3px rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>

        {/* Трубочка */}
        <div
          className="absolute rounded-full"
          style={{
            width: 14,
            height: 190,
            right: 30,
            top: -40,
            background: 'linear-gradient(180deg, #f59e0b, #d97706)',
            transform: 'rotate(9deg)',
          }}
        />

        {/* Крышка */}
        <div
          className="absolute inset-x-0 rounded-full border border-white/60 bg-[#f3f4f6] shadow-md"
          style={{ top: -6, height: 16 }}
        />
      </div>
    </div>
  )
}
