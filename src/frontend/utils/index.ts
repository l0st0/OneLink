import { RgbColor } from 'react-colorful'

export const LOCAL_II_CANISTER = 'http://qhbym-qaaaa-aaaaa-aaafq-cai.localhost:8000/#authorize'

export const getBrightness = ({ r, g, b }: RgbColor) => (r * 299 + g * 587 + b * 114) / 1000
export const isLightBrightness = (color: string = '') => getBrightness(rgbFromString(color)) > 128

export const rgbToString = ({ r, g, b }: RgbColor) => `rgb(${r}, ${g}, ${b})`

export const rgbFromString = (rgb?: string) => {
  if (!rgb || !rgb.length) return { r: 0, g: 0, b: 0 }

  const [r, g, b] = rgb
    .replace(/[^\d,]/g, '')
    .split(',')
    .map((item) => parseInt(item))
  return { r, g, b }
}

export const rgbToHex = (rgb: string) => {
  const { b, g, r } = rgbFromString(rgb)

  const componentToHex = (c: number) => {
    const hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return ''

  const rgb = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
  return rgbToString(rgb)
}
