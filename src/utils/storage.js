const API_BASE = 'http://localhost:3001/api'

export async function loadQuizzes(){
  try{
    const res = await fetch(`${API_BASE}/quizzes`)
    if(!res.ok) throw new Error('Failed to load quizzes')
    return await res.json()
  }catch(e){ 
    console.error('loadQuizzes error:', e)
    return [] 
  }
}

export async function saveQuiz(quiz){
  try{
    const res = await fetch(`${API_BASE}/quizzes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quiz)
    })
    if(!res.ok) throw new Error('Failed to save quiz')
    return await res.json()
  }catch(e){ 
    console.error('saveQuiz error:', e)
    throw e
  }
}

export async function deleteQuiz(id){
  try{
    const res = await fetch(`${API_BASE}/quizzes/${id}`, {
      method: 'DELETE'
    })
    if(!res.ok) throw new Error('Failed to delete quiz')
    return await res.json()
  }catch(e){ 
    console.error('deleteQuiz error:', e)
    throw e
  }
}

export async function loadResults(){
  try{
    const res = await fetch(`${API_BASE}/results`)
    if(!res.ok) throw new Error('Failed to load results')
    return await res.json()
  }catch(e){ 
    console.error('loadResults error:', e)
    return [] 
  }
}

export async function saveResult(result){
  try{
    const res = await fetch(`${API_BASE}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    })
    if(!res.ok) throw new Error('Failed to save result')
    return await res.json()
  }catch(e){ 
    console.error('saveResult error:', e)
    throw e
  }
}

export function genId(prefix='id'){
  return prefix + '_' + Math.random().toString(36).slice(2,9)
}
