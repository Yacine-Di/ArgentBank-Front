import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/index.jsx'
import './index.css'
import Nav from './components/Nav/index.jsx'
import Footer from './components/Footer/index.jsx'
import Login from './pages/Login/index.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    </StrictMode>
)
