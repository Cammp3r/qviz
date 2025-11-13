(function(){
  const el = document.getElementById('results-list');
  const results = loadResults();
  if(!results.length){ el.innerHTML = '<div class="small">No results yet</div>'; return; }
  el.innerHTML = '<div class="grid"></div>';
  const grid = el.querySelector('.grid');
  results.slice().reverse().forEach(r=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<h3>${escapeHtml(r.quizTitle)} — ${r.score}/${r.total}</h3>
      <p class="small">${new Date(r.date).toLocaleString()}</p>
      <div style="margin-top:8px"><button class="btn" onclick="replay('${r.quizId}')">Play again</button></div>`;
    grid.appendChild(card);
  });

  window.replay = function(qid){ location.href = `play.html?id=${qid}`; };

  function escapeHtml(s){ return (s||'').toString().replace(/[&<>"']/g,(m)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
})();
