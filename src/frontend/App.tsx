import { Route, Routes } from 'react-router-dom'
import { useScrollToTop } from '@/hooks'
import { AdminRoute, BasicRoute } from '@/layouts'
import { About, Home, Links, Look } from '@/views'
import './styles/tailwind.css'

const App = () => {
  useScrollToTop()

  return (
    <Routes>
      <Route path="/:name" element={<Home />} />

      <Route element={<BasicRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Links />} />
        <Route path="/admin/links" element={<Links />} />
        <Route path="/admin/about" element={<About />} />
        <Route path="/admin/look" element={<Look />} />
      </Route>
    </Routes>
  )
}

export default App
