import { IconProps } from '@/types'
import { SpinnerSvg } from '../ui'

export const OneLinkIcon = ({ width = 32, spin, spinSpeed }: IconProps) => {
  return (
    <SpinnerSvg
      width={width}
      viewBox="0 0 46 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      spin={spin}
      spinSpeed={spinSpeed}
    >
      <path
        d="M27 15C27 21.6274 21.6274 27 15 27C8.37258 27 3 21.6274 3 15C3 8.37258 8.37258 3 15 3"
        stroke="#0E1C40"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M31 27C37.6274 27 43 21.6274 43 15C43 8.37258 37.6274 3 31 3C24.3726 3 19 8.37258 19 15"
        stroke="#64A0FA"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </SpinnerSvg>
  )
}

export const OneLinkTextIcon = ({ width = 104 }: IconProps) => {
  return (
    <svg width={width} viewBox="0 0 393 74" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M34.7 73.5C29.5 73.5 24.7667 72.5 20.5 70.5C16.3 68.5 12.6667 65.8 9.6 62.4C6.6 58.9333 4.26667 55.0667 2.6 50.8C0.933333 46.4667 0.1 42.0333 0.1 37.5C0.1 32.7667 0.966667 28.2667 2.7 24C4.5 19.6667 6.93333 15.8333 10 12.5C13.1333 9.1 16.8 6.43333 21 4.49999C25.2667 2.5 29.9333 1.5 35 1.5C40.1333 1.5 44.8 2.53333 49 4.6C53.2667 6.66666 56.9 9.43333 59.9 12.9C62.9 16.3667 65.2333 20.2333 66.9 24.5C68.5667 28.7667 69.4 33.1667 69.4 37.7C69.4 42.3667 68.5333 46.8667 66.8 51.2C65.0667 55.4667 62.6333 59.3 59.5 62.7C56.4333 66.0333 52.7667 68.6667 48.5 70.6C44.3 72.5333 39.7 73.5 34.7 73.5ZM14.1 37.5C14.1 40.5667 14.5667 43.5333 15.5 46.4C16.4333 49.2667 17.7667 51.8333 19.5 54.1C21.3 56.3 23.4667 58.0667 26 59.4C28.6 60.6667 31.5333 61.3 34.8 61.3C38.1333 61.3 41.1 60.6333 43.7 59.3C46.3 57.9 48.4667 56.0667 50.2 53.8C51.9333 51.4667 53.2333 48.9 54.1 46.1C55.0333 43.2333 55.5 40.3667 55.5 37.5C55.5 34.4333 55 31.5 54 28.7C53.0667 25.8333 51.7 23.3 49.9 21.1C48.1667 18.8333 46 17.0667 43.4 15.8C40.8667 14.4667 38 13.8 34.8 13.8C31.4 13.8 28.4 14.5 25.8 15.9C23.2667 17.2333 21.1333 19.0333 19.4 21.3C17.6667 23.5667 16.3333 26.1 15.4 28.9C14.5333 31.7 14.1 34.5667 14.1 37.5ZM126.898 73H113.498V43.6C113.498 39.4 112.764 36.3333 111.298 34.4C109.831 32.4667 107.798 31.5 105.198 31.5C103.398 31.5 101.564 31.9667 99.6977 32.9C97.8977 33.8333 96.2643 35.1333 94.7977 36.8C93.331 38.4 92.2643 40.2667 91.5977 42.4V73H78.1977V20.6H90.2977V30.3C91.631 28.0333 93.331 26.1333 95.3977 24.6C97.4643 23 99.831 21.8 102.498 21C105.231 20.1333 108.098 19.7 111.098 19.7C114.364 19.7 117.031 20.3 119.098 21.5C121.231 22.6333 122.831 24.2 123.898 26.2C125.031 28.1333 125.798 30.3333 126.198 32.8C126.664 35.2667 126.898 37.7667 126.898 40.3V73ZM162.849 74C158.649 74 154.849 73.3 151.449 71.9C148.049 70.4333 145.149 68.4667 142.749 66C140.349 63.4667 138.483 60.6 137.149 57.4C135.883 54.1333 135.249 50.7 135.249 47.1C135.249 42.1 136.349 37.5333 138.549 33.4C140.816 29.2667 144.016 25.9667 148.149 23.5C152.349 20.9667 157.283 19.7 162.949 19.7C168.683 19.7 173.583 20.9667 177.649 23.5C181.716 25.9667 184.816 29.2667 186.949 33.4C189.149 37.4667 190.249 41.8667 190.249 46.6C190.249 47.4 190.216 48.2333 190.149 49.1C190.083 49.9 190.016 50.5667 189.949 51.1H149.449C149.716 53.7667 150.483 56.1 151.749 58.1C153.083 60.1 154.749 61.6333 156.749 62.7C158.816 63.7 161.016 64.2 163.349 64.2C166.016 64.2 168.516 63.5667 170.849 62.3C173.249 60.9667 174.883 59.2333 175.749 57.1L187.249 60.3C185.983 62.9667 184.149 65.3333 181.749 67.4C179.416 69.4667 176.649 71.1 173.449 72.3C170.249 73.4333 166.716 74 162.849 74ZM149.149 42.6H176.549C176.283 39.9333 175.516 37.6333 174.249 35.7C173.049 33.7 171.449 32.1667 169.449 31.1C167.449 29.9667 165.216 29.4 162.749 29.4C160.349 29.4 158.149 29.9667 156.149 31.1C154.216 32.1667 152.616 33.7 151.349 35.7C150.149 37.6333 149.416 39.9333 149.149 42.6Z"
        fill="#0E1C40"
      />
      <path
        d="M199.713 73V2H213.513V60.9H249.713V73H199.713ZM256.811 73V20.6H270.211V73H256.811ZM256.811 13.3V-1.90735e-06H270.211V13.3H256.811ZM330.999 73H317.599V43.6C317.599 39.4 316.866 36.3333 315.399 34.4C313.933 32.4667 311.899 31.5 309.299 31.5C307.499 31.5 305.666 31.9667 303.799 32.9C301.999 33.8333 300.366 35.1333 298.899 36.8C297.433 38.4 296.366 40.2667 295.699 42.4V73H282.299V20.6H294.399V30.3C295.733 28.0333 297.433 26.1333 299.499 24.6C301.566 23 303.933 21.8 306.599 21C309.333 20.1333 312.199 19.7 315.199 19.7C318.466 19.7 321.133 20.3 323.199 21.5C325.333 22.6333 326.933 24.2 327.999 26.2C329.133 28.1333 329.899 30.3333 330.299 32.8C330.766 35.2667 330.999 37.7667 330.999 40.3V73ZM378.451 73L363.151 50.4L356.051 57.4V73H342.651V-1.90735e-06H356.051V44.2L377.151 20.7H391.351L371.851 42.9L392.751 73H378.451Z"
        fill="#64A0FA"
      />
    </svg>
  )
}
