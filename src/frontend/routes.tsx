import { Route, Routes } from 'react-router-dom'
import { AdminRoutes, BasicRoutes } from '@/features'
import { Home, Links } from '@/views'
import { Appearance } from './views/Admin/Appearance'

export const Pages = () => {
  return (
    <Routes>
      <Route path="/:name" element={<Home />} />

      <Route element={<BasicRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AdminRoutes />}>
        <Route path="/admin/links" element={<Links />} />
        <Route path="/admin/appearance" element={<Appearance />} />
      </Route>
    </Routes>
  )
}

export default Pages
