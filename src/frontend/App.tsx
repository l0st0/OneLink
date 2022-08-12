import React from 'react'
import { Global, ThemeProvider } from '@emotion/react'
import { useScrollToTop } from '@/hooks'
import { theme, globalStyles } from '@/styles'
import { useMainStore } from '@/store'
import Pages from './routes'

const App = () => {
  const getIsAuth = useMainStore((state) => state.getIsAuth)

  React.useEffect(() => {
    getIsAuth()
  }, [])

  useScrollToTop()

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Pages />
    </ThemeProvider>
  )
}

export default App
