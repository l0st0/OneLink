import { Global, ThemeProvider } from '@emotion/react'
import { useAppDispatch, useScrollToTop } from '@/hooks'
import Pages from './routes'
import { theme, globalStyles } from '@/styles'
import React from 'react'
import { getIsAuth, getUser } from './store/user/userSlice'

const App = () => {
  const dispatch = useAppDispatch()

  const initLoad = async () => {
    const isAuth = await dispatch(getIsAuth()).unwrap()
    if (isAuth) dispatch(getUser())
  }

  React.useEffect(() => {
    initLoad()
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
