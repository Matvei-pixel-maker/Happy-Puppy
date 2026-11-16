import { motion } from 'framer-motion'

/**
 * 2D-декор вокруг 3D-стакана.
 * Все элементы — inline SVG (без внешних ассетов), полупрозрачные,
 * с плавной левитацией через framer-motion.
 * Контейнер имеет pointer-events-none, чтобы не мешать OrbitControls.
 */

function Strawberry({ color = '#ff4d6d', leaf = '#74a848' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 16c10 0 18 5.5 18 14 0 10-9 22-18 26-9-4-18-16-18-26 0-8.5 8-14 18-14Z"
        fill={color}
      />
      <path d="M32 16c0-4 2-7 5-9-1 3-1 5 0 7 1-2 3-4 6-4-2 3-3 5-3 8h-8Z" fill={leaf} />
      <g fill="#fff" opacity="0.85">
        <ellipse cx="25" cy="28" rx="1.6" ry="2.2" />
        <ellipse cx="39" cy="28" rx="1.6" ry="2.2" />
        <ellipse cx="32" cy="36" rx="1.6" ry="2.2" />
        <ellipse cx="24" cy="40" rx="1.6" ry="2.2" />
        <ellipse cx="40" cy="40" rx="1.6" ry="2.2" />
        <ellipse cx="32" cy="47" rx="1.6" ry="2.2" />
      </g>
    </svg>
  )
}

function LemonSlice({ rind = '#ffd166', pulp = '#ff9f1c' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" fill={rind} />
      <circle cx="32" cy="32" r="19" fill={pulp} opacity="0.9" />
      <g stroke={rind} strokeWidth="2.4" strokeLinecap="round">
        <path d="M32 32V14" />
        <path d="M32 32 47 23" />
        <path d="M32 32 47 41" />
        <path d="M32 32v18" />
        <path d="M32 32 17 41" />
        <path d="M32 32 17 23" />
      </g>
    </svg>
  )
}

function MintLeaf({ color = '#52b788', vein = '#95d5b2' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 8c14 6 22 16 22 28 0 12-10 20-22 20S10 48 10 36C10 24 18 14 32 8Z"
        fill={color}
      />
      <path d="M32 14v34" stroke={vein} strokeWidth="2.2" strokeLinecap="round" />
      <g stroke={vein} strokeWidth="1.8" strokeLinecap="round" opacity="0.9">
        <path d="M32 22 22 17" />
        <path d="M32 30 20 25" />
        <path d="M32 38 21 34" />
        <path d="M32 22 42 17" />
        <path d="M32 30 44 25" />
        <path d="M32 38 43 34" />
      </g>
    </svg>
  )
}

function TapiocaPearls({ color = '#3b2b20' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill={color}>
        <circle cx="22" cy="40" r="7" />
        <circle cx="36" cy="44" r="6" />
        <circle cx="45" cy="33" r="5.5" />
        <circle cx="30" cy="28" r="6.5" />
        <circle cx="17" cy="28" r="4.5" />
        <circle cx="50" cy="45" r="4" />
      </g>
      <g fill="#fff" opacity="0.35">
        <circle cx="20" cy="37" r="2" />
        <circle cx="28" cy="25.5" r="1.8" />
        <circle cx="43" cy="31" r="1.6" />
      </g>
    </svg>
  )
}

function Sparkle({ color = '#ffd166' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 2c1.6 7.4 6.6 12.4 14 14-7.4 1.6-12.4 6.6-14 14-1.6-7.4-6.6-12.4-14-14 7.4-1.6 12.4-6.6 14-14Z"
        fill={color}
      />
    </svg>
  )
}

const FLOAT = (duration, delay, offsetY = 14, rotate = 6) => ({
  y: [0, -offsetY, 0],
  rotate: [-rotate, rotate, -rotate],
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut',
  },
})

export default function Decor() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
      {/* Клубника — верхний левый */}
      <motion.div
        animate={FLOAT(7, 0, 16, 7)}
        className="absolute left-[2%] top-[8%] w-14 opacity-70 md:w-20"
      >
        <Strawberry />
      </motion.div>

      {/* Лимон — верхний правый */}
      <motion.div
        animate={FLOAT(8.5, 0.8, 18, -8)}
        className="absolute right-[1%] top-[2%] w-14 opacity-70 md:w-20"
      >
        <LemonSlice />
      </motion.div>

      {/* Мята — нижний левый */}
      <motion.div
        animate={FLOAT(9.5, 1.4, 14, 10)}
        className="absolute bottom-[6%] left-[6%] w-12 opacity-70 md:w-16"
      >
        <MintLeaf />
      </motion.div>

      {/* Тапиока — нижний правый */}
      <motion.div
        animate={FLOAT(7.5, 0.4, 12, -6)}
        className="absolute bottom-[2%] right-[8%] w-12 opacity-70 md:w-16"
      >
        <TapiocaPearls />
      </motion.div>

      {/* Декоративные искры */}
      <motion.div
        animate={FLOAT(6, 0.3, 20, 20)}
        className="absolute left-[18%] top-[2%] w-6 opacity-70 md:w-8"
      >
        <Sparkle color="#f4a6b8" />
      </motion.div>
      <motion.div
        animate={FLOAT(6.8, 1.1, 22, -20)}
        className="absolute bottom-[22%] right-[1%] w-5 opacity-70 md:w-7"
      >
        <Sparkle color="#bfeadf" />
      </motion.div>
      <motion.div
        animate={FLOAT(5.4, 1.9, 16, 14)}
        className="absolute left-[1%] bottom-[32%] w-4 opacity-70 md:w-6"
      >
        <Sparkle color="#ffd166" />
      </motion.div>

      {/* Маленькая клубника справа снизу */}
      <motion.div
        animate={FLOAT(10, 2.4, 10, 12)}
        className="absolute right-[22%] bottom-[4%] w-8 opacity-70 md:w-11"
      >
        <Strawberry color="#ff758f" leaf="#95d5b2" />
      </motion.div>
    </div>
  )
}
