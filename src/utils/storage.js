export const KEY_QUIZZES = 'neon_quizzes_v1'
export const KEY_RESULTS = 'neon_quiz_results_v1'

export function loadQuizzes(){
  try{
    return JSON.parse(localStorage.getItem(KEY_QUIZZES) || '[]')
  }catch(e){ return [] }
}

export function saveQuizzes(arr){
  localStorage.setItem(KEY_QUIZZES, JSON.stringify(arr))
}

export function loadResults(){
  try{ return JSON.parse(localStorage.getItem(KEY_RESULTS) || '[]') }
  catch(e){ return [] }
}
export function saveResults(arr){ localStorage.setItem(KEY_RESULTS, JSON.stringify(arr)) }

export function genId(prefix='id'){
  return prefix + '_' + Math.random().toString(36).slice(2,9)
}
