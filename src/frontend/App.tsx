import { ThemeProvider } from '@emotion/react'
import { useScrollToTop } from '@/hooks'
import Pages from './routes'
import { theme } from './styles'

const App = () => {
  useScrollToTop()

  return (
    <ThemeProvider theme={theme}>
      <Pages />
    </ThemeProvider>
  )
}

export default App
