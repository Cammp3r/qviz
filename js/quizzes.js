// Quizzes page logic
(function(){
  const listEl = document.getElementById('quiz-list');
  const form = document.getElementById('create-form');
  const addQ = document.getElementById('add-q');
  const questionsArea = document.getElementById('questions-area');

  function renderList(){
    const arr = loadQuizzes();
    listEl.innerHTML = '';
    if(!arr.length) listEl.innerHTML = '<div class="small">No quizzes yet</div>';
    arr.forEach(q=>{
      const card = document.createElement('div'); card.className='card';
      card.innerHTML = `<h3>${escapeHtml(q.title)}</h3><p class="small">${escapeHtml(q.desc || '')}</p>
        <div style="margin-top:8px"><button class="btn" onclick="startQuiz('${q.id}')">Play</button>
        <button class="btn" onclick="deleteQuizConfirm('${q.id}')">Delete</button></div>`;
      listEl.appendChild(card);
    });
  }

  // attach helpers globally for onclick in markup
  window.startQuiz = function(id){
    location.href = `play.html?id=${id}`;
  };
  window.deleteQuizConfirm = function(id){
    if(!confirm('Delete quiz?')) return;
    const arr = loadQuizzes().filter(x=>x.id!==id);
    saveQuizzes(arr); renderList();
  };

  function addQuestionUI(){
    const idx = questionsArea.children.length;
    const div = document.createElement('div'); div.className='question';
    div.innerHTML = `
      <input placeholder="Question ${idx+1}" class="q-text" required />
      <input placeholder="Option A" class="opt" required />
      <input placeholder="Option B" class="opt" required />
      <input placeholder="Option C" class="opt" required />
      <input placeholder="Option D" class="opt" required />
      <label class="small">Correct option index (0-3): <input class="correct" type="number" min="0" max="3" value="0" /></label>
    `;
    questionsArea.appendChild(div);
  }

  addQ.addEventListener('click', ()=> addQuestionUI());
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const desc = document.getElementById('desc').value.trim();
    if(!title){ alert('Give a title'); return; }
    const qs = [];
    Array.from(questionsArea.children).forEach(qdiv=>{
      const qtext = qdiv.querySelector('.q-text').value.trim();
      const opts = Array.from(qdiv.querySelectorAll('.opt')).map(i=>i.value.trim());
      const correct = parseInt(qdiv.querySelector('.correct').value||'0',10);
      if(!qtext || opts.some(o=>!o)){ /* skip invalid */ return; }
      qs.push({text:qtext, options:opts, correct: correct});
    });
    const newQuiz = { id: genId('quiz'), title, desc, questions: qs };
    const arr = loadQuizzes(); arr.push(newQuiz); saveQuizzes(arr);
    // reset form
    form.reset(); questionsArea.innerHTML=''; renderList();
  });

  // utility
  function escapeHtml(s){ return s.replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }

  // initial
  addQuestionUI();
  renderList();
})();
