import { Route, Routes } from 'react-router-dom'
import { AdminRoutes, BasicRoutes } from '@/layouts'
import { About, Home, Links, Look } from '@/views'

export const Pages = () => {
  return (
    <Routes>
      <Route path="/:name" element={<Home />} />

      <Route element={<BasicRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<Links />} />
        <Route path="/admin/links" element={<Links />} />
        <Route path="/admin/about" element={<About />} />
        <Route path="/admin/look" element={<Look />} />
      </Route>
    </Routes>
  )
}

export default Pages
