import React from 'react'
import { loadResults } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

export default function Results(){
  const navigate = useNavigate()
  const results = loadResults()
  if(!results.length) return <div className="container"><div className="small">No results yet</div></div>

  return (
    <div className="container">
      <div id="results-list">
        <div className="grid">
          {results.slice().reverse().map(r=> (
            <div className="card" key={r.id}>
              <h3>{r.quizTitle} — {r.score}/{r.total}</h3>
              <p className="small">{new Date(r.date).toLocaleString()}</p>
              <div style={{marginTop:8}}><button className="btn" onClick={()=>navigate(`/play/${r.quizId}`)}>Play again</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
