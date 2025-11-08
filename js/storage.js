// helpers for localStorage
const KEY_QUIZZES = 'neon_quizzes_v1';
const KEY_RESULTS = 'neon_quiz_results_v1';

function loadQuizzes(){
  try{
    return JSON.parse(localStorage.getItem(KEY_QUIZZES) || '[]');
  }catch(e){ return []; }
}
function saveQuizzes(arr){
  localStorage.setItem(KEY_QUIZZES, JSON.stringify(arr));
}

function loadResults(){ return JSON.parse(localStorage.getItem(KEY_RESULTS) || '[]'); }
function saveResults(arr){ localStorage.setItem(KEY_RESULTS, JSON.stringify(arr)); }

function genId(prefix='id'){
  return prefix + '_' + Math.random().toString(36).slice(2,9);
}
