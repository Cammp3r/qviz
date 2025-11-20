import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { loadQuizzes, loadResults, saveResults, genId } from '../utils/storage'

export default function Play(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState([])

  useEffect(()=>{
    const quizzes = loadQuizzes()
    const q = quizzes.find(x=>x.id===id)
    if(!q){ setQuiz(null); return }
    setQuiz(q)
    setAnswers(new Array(q.questions.length).fill(null))
    setIdx(0)
  }, [id])

  if(quiz===null){
    return (
      <div className="container">
        <h2>Quiz not found</h2>
        <div className="small">Go back and choose a quiz.</div>
      </div>
    )
  }

  function selectOption(i){
    setAnswers(a=>{
      const copy = [...a]; copy[idx]=i; return copy
    })
  }

  function prev(){ setIdx(i=>Math.max(0,i-1)) }
  function next(){ setIdx(i=>Math.min(quiz.questions.length-1,i+1)) }

  function finishQuiz(){
    let score = 0
    for(let i=0;i<quiz.questions.length;i++){
      if(answers[i]===quiz.questions[i].correct) score++
    }
    const all = loadResults()
    all.push({ id: genId('res'), quizId: quiz.id, quizTitle: quiz.title, score, total: quiz.questions.length, date: new Date().toISOString() })
    saveResults(all)
    navigate('/results')
  }

  const q = quiz.questions[idx]

  return (
    <div className="container">
      <h2 id="quiz-title">{quiz.title}</h2>
      <div id="quiz-desc" className="small">{quiz.desc || ''}</div>
      <div id="question-area">
        <div className="question">
          <h3>Q{idx+1}. {q.text}</h3>
          {q.options.map((opt,i)=> (
            <div key={i} className={`option ${answers[idx]===i ? 'selected' : ''}`} onClick={()=>selectOption(i)}>{opt}</div>
          ))}
        </div>
        <div className="small">{idx+1} / {quiz.questions.length}</div>
      </div>

      <div style={{marginTop:8}}>
        <button id="prev" className="btn" onClick={prev} disabled={idx===0}>Prev</button>
        <button id="next" className="btn" onClick={next} disabled={idx===quiz.questions.length-1}>Next</button>
        <button id="finish" className="btn" onClick={finishQuiz}>Finish</button>
      </div>
    </div>
  )
}
