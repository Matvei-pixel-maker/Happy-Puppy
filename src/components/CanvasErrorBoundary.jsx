import { Component } from 'react'

/**
 * Ловит ошибки внутри 3D-сцены (в т.ч. сбой создания WebGL-контекста),
 * чтобы при падении Canvas продолжал работать остальной сайт.
 * Suspense такие ошибки НЕ перехватывает — нужен именно ErrorBoundary.
 */
export default class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('[Canvas] 3D-сцена недоступна, показываю заглушку:', error?.message)
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}
