import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Quizzes from './pages/Quizzes'
import Play from './pages/Play'
import Results from './pages/Results'

export default function App(){
  return (
    <BrowserRouter>
      <div className="app-root">
        <header className="topbar">
          <h1><Link to="/" className="link-plain">Best quiz</Link></h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/results" className="ml-12">Results</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Quizzes />} />
            <Route path="/play/:id" element={<Play />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
