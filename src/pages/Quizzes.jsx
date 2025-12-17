import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadQuizzes, saveQuiz, deleteQuiz, genId } from '../utils/storage'

function makeEmptyQuestion(){
  return { text: '', options: ['', '', '', ''], correct: 0 }
}

export default function Quizzes(){
  const [quizzes, setQuizzes] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [questions, setQuestions] = useState([ makeEmptyQuestion(), makeEmptyQuestion() ])

  const navigate = useNavigate()

  useEffect(()=>{
    loadQuizzes().then(setQuizzes)
  }, [])

  async function refresh(){
    const data = await loadQuizzes()
    setQuizzes(data)
  }

  function startQuiz(id){
    navigate(`/play/${id}`)
  }

  async function deleteQuizConfirm(id){
    if(!confirm('Delete quiz?')) return
    try{
      await deleteQuiz(id)
      refresh()
    }catch(e){
      alert('Failed to delete quiz')
    }
  }

  function addQuestionUI(){
    setQuestions(qs => [...qs, makeEmptyQuestion()])
  }

  function updateQuestion(idx, patch){
    setQuestions(qs => qs.map((q,i)=> i===idx ? { ...q, ...patch } : q))
  }

  function updateOption(qidx, optidx, value){
    setQuestions(qs => qs.map((q,i)=>{
      if(i!==qidx) return q
      const newOpts = [...q.options]
      newOpts[optidx] = value
      return { ...q, options: newOpts }
    }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    const t = title.trim()
    const d = desc.trim()
    if(!t){ alert('Give a title'); return }
    const qs = []
    questions.forEach(q=>{
      const qtext = (q.text||'').trim()
      const opts = q.options.map(o=> (o||'').trim())
      const correct = Number.isFinite(Number(q.correct)) ? parseInt(q.correct||'0',10) : 0
      if(!qtext || opts.some(o=>!o)) return
      qs.push({ text: qtext, options: opts, correct })
    })
    const newQuiz = { id: genId('quiz'), title: t, desc: d, questions: qs }
    try{
      await saveQuiz(newQuiz)
      // reset
      setTitle('')
      setDesc('')
      setQuestions([ makeEmptyQuestion(), makeEmptyQuestion() ])
      refresh()
    }catch(e){
      alert('Failed to save quiz')
    }
  }

  return (
    <div className="container">
      <section className="panel">
        <h2>Quizzes</h2>
        <div id="quiz-list">
          {quizzes.length===0 && <div className="small">No quizzes yet</div>}
          {quizzes.map(q=> (
            <div className="card" key={q.id}>
              <h3>{q.title}</h3>
              <p className="small">{q.desc || ''}</p>
              <div style={{marginTop:8}}>
                <button className="btn" onClick={()=>startQuiz(q.id)}>Play</button>
                <button className="btn" onClick={()=>deleteQuizConfirm(q.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel panel-aside" style={{marginTop:20}}>
        <h2>Create new quiz</h2>
        <form id="create-form" className="form" onSubmit={handleSubmit}>
          <div>
            <input id="title" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
          </div>
          <div>
            <input id="desc" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
          </div>

          <div id="questions-area" className="form-questions">
            {questions.map((q, qi)=> (
              <div className="question" key={qi}>
                <input placeholder={`Question ${qi+1}`} className="q-text" required value={q.text} onChange={e=>updateQuestion(qi, { text: e.target.value })} />
                <div className="opts">
                  {q.options.map((opt, oi)=> (
                    <input key={oi} placeholder={`Option ${String.fromCharCode(65+oi)}`} className="opt" required value={opt} onChange={e=>updateOption(qi, oi, e.target.value)} />
                  ))}
                </div>
                <label className="small">Correct option: 
                  <select className="correct" value={q.correct} onChange={e=>updateQuestion(qi, { correct: parseInt(e.target.value,10) })}>
                    {q.options.map((_, oi)=>(
                      <option key={oi} value={oi}>{String.fromCharCode(65+oi)}</option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" id="add-q" className="btn" onClick={addQuestionUI}>Add question</button>
            <button type="submit" className="btn primary">Create quiz</button>
          </div>
        </form>
      </section>
    </div>
  )
}
