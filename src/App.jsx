import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ScanPage from './pages/ScanPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'

export default function App() {
  return <Routes><Route path="/" element={<Home />} /><Route path="/scan" element={<ScanPage />} /><Route path="/results" element={<ResultsPage />} /><Route path="*" element={<Home />} /></Routes>
}
