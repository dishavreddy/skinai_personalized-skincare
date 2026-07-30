import { createContext, useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ScanContext = createContext(null)
export function ScanProvider({ children }) {
  const [open, setOpen] = useState(false), [pendingImage, setPendingImage] = useState(null)
  const navigate = useNavigate()
  const startScan = () => setOpen(true)
  const confirmPhoto = (file, preview) => { setPendingImage({ file, preview }); setOpen(false); navigate('/scan') }
  return <ScanContext.Provider value={{ open, setOpen, pendingImage, setPendingImage, startScan, confirmPhoto }}>{children}</ScanContext.Provider>
}
export const useScan = () => useContext(ScanContext)
