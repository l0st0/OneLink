import { Route, Routes } from 'react-router-dom'
import { AdminRoutes, BasicRoutes } from '@/layouts'
import { About, Appearance, Home, Links } from '@/views'

export const Pages = () => {
  return (
    <Routes>
      <Route path="/:name" element={<Home />} />

      <Route element={<BasicRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AdminRoutes />}>
        <Route path="/admin/links" element={<Links />} />
        <Route path="/admin/about" element={<About />} />
        <Route path="/admin/appearance" element={<Appearance />} />
      </Route>
    </Routes>
  )
}

export default Pages
