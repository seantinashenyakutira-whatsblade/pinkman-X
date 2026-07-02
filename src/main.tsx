import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import AdminPage from './pages/AdminPage'
import SocialFollow from './pages/SocialFollow'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/social-verify" element={<SocialFollow />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
