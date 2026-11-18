/**
 * Проверка поддержки WebGL.
 * В некоторых мобильных WebView (Telegram, встроенные браузеры) контекст
 * создать не удаётся — в этом случае <Canvas> из @react-three/fiber бросает
 * исключение и размонтирует всё React-дерево (страница становится пустой).
 */
export function hasWebGL() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl') ||
      canvas.getContext('webgl2')
    return Boolean(gl && typeof gl.getParameter === 'function')
  } catch {
    return false
  }
}
