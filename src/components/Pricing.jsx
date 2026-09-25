import { useScan } from '../context/ScanContext.jsx'
export default function Pricing(){const {startScan}=useScan();return <section className="redesign-closer-section"><div className="redesign-wrap"><div className="redesign-closer"><h2>Your first scan takes about two minutes.</h2><button className="redesign-button light" onClick={startScan}>Start a skin scan</button></div></div></section>}
