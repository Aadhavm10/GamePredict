import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Match from './pages/Match.jsx'
import Stats from './pages/Stats.jsx'
import Settings from './pages/Settings.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match" element={<Match />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
