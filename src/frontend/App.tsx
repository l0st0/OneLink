import { Global, ThemeProvider } from '@emotion/react'
import { useScrollToTop } from '@/hooks'
import { globalStyles, theme } from '@/styles'
import Pages from './routes'
import './styles/tailwind.css'

const App = () => {
  useScrollToTop()

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Pages />
    </ThemeProvider>
  )
}

export default App
