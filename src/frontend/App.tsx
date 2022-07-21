import { Global, ThemeProvider } from '@emotion/react'
import { useScrollToTop } from '@/hooks'
import { PageLayout } from '@/layouts'
import Pages from './routes'
import { globalStyles, theme } from './styles'

const App = () => {
  useScrollToTop()

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <PageLayout>
        <Pages />
      </PageLayout>
    </ThemeProvider>
  )
}

export default App
