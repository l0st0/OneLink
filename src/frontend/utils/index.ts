import { RgbColor } from 'react-colorful'

export const LOCAL_II_CANISTER = 'http://qhbym-qaaaa-aaaaa-aaafq-cai.localhost:8000/#authorize'

export const getBrightness = ({ r, g, b }: RgbColor) => (r * 299 + g * 587 + b * 114) / 1000
export const rgbToString = ({ r, g, b }: RgbColor) => `rgb(${r}, ${g}, ${b})`
export const rgbFromString = (rgb: string) => {
  const [r, g, b] = rgb
    .replace(/[^\d,]/g, '')
    .split(',')
    .map((item) => parseInt(item))
  return { r, g, b }
}
