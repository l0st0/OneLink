import { Routes, Route } from 'react-router-dom'
import { Admin, Home } from '@/views'
import { BasicRoutes } from './utils'
import { AdminRoutes } from './utils/routes/AdminRoutes'

export const Pages = () => {
  return (
    <Routes>
      <Route element={<BasicRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

export default Pages
