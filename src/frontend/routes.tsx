import { Routes, Route } from 'react-router-dom'
import { Home } from '@/views'
import { BasicRoutes } from './utils'

export const Pages = () => {
  return (
    <Routes>
      <Route element={<BasicRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default Pages
