import { Global, ThemeProvider } from '@emotion/react'
import { useScrollToTop } from '@/hooks'
import Pages from './routes'
import { theme, globalStyles } from '@/styles'

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
