import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ScanPage from './pages/ScanPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import RecommendationsPage from './pages/RecommendationsPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ScanProvider } from './context/ScanContext.jsx'
import PhotoModal from './components/PhotoModal.jsx'

export default function App() {
  return <AuthProvider><ScanProvider><Routes><Route path="/" element={<Home />} /><Route path="/scan" element={<ScanPage />} /><Route path="/results" element={<ResultsPage />} /><Route path="/history" element={<HistoryPage />} /><Route path="/recommendations" element={<RecommendationsPage />} /><Route path="*" element={<Home />} /></Routes><PhotoModal/></ScanProvider></AuthProvider>
}
