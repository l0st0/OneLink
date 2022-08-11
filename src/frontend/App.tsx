import { Global, ThemeProvider } from '@emotion/react'
import { useAppDispatch, useScrollToTop } from '@/hooks'
import Pages from './routes'
import { theme, globalStyles } from '@/styles'
import React from 'react'
import { getIsAuth } from './store/user/userSlice'

const App = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getIsAuth())
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
