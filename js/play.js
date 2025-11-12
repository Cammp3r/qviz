(function(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const titleEl = document.getElementById('quiz-title');
  const descEl = document.getElementById('quiz-desc');
  const qArea = document.getElementById('question-area');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const finishBtn = document.getElementById('finish');

  const quizzes = loadQuizzes();
  const quiz = quizzes.find(q=>q.id===id);
  if(!quiz){
    titleEl.textContent = 'Quiz not found'; qArea.innerHTML = '<div class="small">Go back and choose a quiz.</div>';
    prevBtn.style.display=nextBtn.style.display=finishBtn.style.display='none';
    return;
  }
  titleEl.textContent = quiz.title;
  descEl.textContent = quiz.desc || '';
  let idx = 0;
  const answers = new Array(quiz.questions.length).fill(null);

  function renderQuestion(){
    const q = quiz.questions[idx];
    qArea.innerHTML = `<div class="question">
      <h3>Q${idx+1}. ${escapeHtml(q.text)}</h3>
      ${q.options.map((opt,i)=>`<div class="option ${answers[idx]===i?'selected':''}" data-i="${i}">${escapeHtml(opt)}</div>`).join('')}
    </div>
    <div class="small"> ${idx+1} / ${quiz.questions.length} </div>`;
    Array.from(qArea.querySelectorAll('.option')).forEach(el=>{
      el.addEventListener('click', ()=>{
        answers[idx] = parseInt(el.dataset.i,10);
        renderQuestion();
      });
    });
    prevBtn.disabled = idx===0;
    nextBtn.disabled = idx===quiz.questions.length-1;
  }

  prevBtn.addEventListener('click', ()=>{ idx = Math.max(0, idx-1); renderQuestion(); });
  nextBtn.addEventListener('click', ()=>{ idx = Math.min(quiz.questions.length-1, idx+1); renderQuestion(); });
  finishBtn.addEventListener('click', finishQuiz);

  function finishQuiz(){
    let score = 0;
    for(let i=0;i<quiz.questions.length;i++){
      if(answers[i]===quiz.questions[i].correct) score++;
    }

    const all = loadResults();
    all.push({
      id: genId('res'),
      quizId: quiz.id,
      quizTitle: quiz.title,
      score,
      total: quiz.questions.length,
      date: new Date().toISOString()
    });
    saveResults(all);
  
    location.href = `results.html`;
  }

  renderQuestion();

  function escapeHtml(s){ return s.replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }
})();
