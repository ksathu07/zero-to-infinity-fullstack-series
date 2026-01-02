let count = 0;

const els = {
  countEl: document.getElementById('count'),
  increase: document.getElementById('increase'),
  decrease: document.getElementById('decrease'),
  reset: document.getElementById('reset'),
  themeBtn: document.getElementById('themeBtn')
};

function init() {
  const saved = localStorage.getItem('day2Count');
  if (saved !== null) count = parseInt(saved);
  render();
  bindEvents();
}

function render() {
  els.countEl.textContent = count;
  localStorage.setItem('day2Count', count.toString());
}

function bindEvents() {
  els.increase.onclick = () => { 
    count++; 
    render(); 
  };
  
  els.decrease.onclick = () => { 
    count--;  // Allows negative (spec exact)
    render(); 
  };
  
  els.reset.onclick = () => { 
    count = 0; 
    render(); 
  };
  
  els.themeBtn.onclick = () => {
    document.documentElement.classList.toggle('dark');
    document.documentElement.classList.toggle('light');
  };
}

init();