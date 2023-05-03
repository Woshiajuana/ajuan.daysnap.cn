import { useEffect } from 'react'

interface useOverflowOptions {
  visible?: boolean
  el?: HTMLElement
}

export function useOverflow(options: useOverflowOptions) {
  const { visible, el } = options
  useEffect(() => {
    const ele = el || document.body
    ele.style.overflow = visible ? 'hidden' : ''
    return () => {
      ele.style.overflow = ''
    }
  }, [visible, el])
}
