interface BreakpointsInterface {
  sm: number
  md: number
  lg: number
  xl: number
}

const breakpoints: BreakpointsInterface = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

export const mq = (bp: keyof BreakpointsInterface) => {
  return `@media (min-width: ${breakpoints[bp]}px)`
}
