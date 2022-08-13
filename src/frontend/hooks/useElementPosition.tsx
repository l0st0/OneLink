import React from 'react'

interface useElementPositionProps<T> {
  ref: React.RefObject<T>
}

export const useElementPosition = <T extends HTMLDivElement>({ ref }: useElementPositionProps<T>) => {
  const [topOffset, setTopOffset] = React.useState(0)

  React.useEffect(() => {
    const getPosition = () => {
      if (!ref?.current) return
      const topOffset = ref.current.offsetTop
      setTopOffset(topOffset)
    }

    getPosition()
    window.addEventListener('resize', getPosition)
    return () => window.removeEventListener('resize', getPosition)
  }, [ref])

  return { topOffset }
}
