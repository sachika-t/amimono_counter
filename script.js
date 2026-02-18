let count = parseInt(localStorage.getItem('kc_count') || '0');
let goal = parseInt(localStorage.getItem('kc_goal') || '0');

const display = document.getElementById('countDisplay');
const nextNum = document.getElementById('nextNum');
const goalInput = document.getElementById('goalInput');
const progressWrap = document.getElementById('progressWrap');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const progressPct = document.getElementById('progressPct');
const completeBanner = document.getElementById('completeBanner');

if (goal) goalInput.value = goal;
render();

goalInput.addEventListener('input', () => {
  goal = parseInt(goalInput.value) || 0;
  localStorage.setItem('kc_goal', goal);
  render();
});

function countUp() {
  count++;
  localStorage.setItem('kc_count', count);
  bump();
  render();
}

function countDown() {
  if (count > 0) {
    count--;
    localStorage.setItem('kc_count', count);
    render();
  }
}

function setCount() {
  const v = prompt('何段目まで編み終えましたか？', count);
  if (v !== null) {
    const n = parseInt(v);
    if (!isNaN(n) && n >= 0) {
      count = n;
      localStorage.setItem('kc_count', count);
      render();
    }
  }
}

function resetCount() {
  if (confirm('カウントをリセットしますか？')) {
    count = 0;
    localStorage.setItem('kc_count', 0);
    render();
  }
}

function bump() {
  display.classList.remove('bump');
  void display.offsetWidth;
  display.classList.add('bump');
  setTimeout(() => display.classList.remove('bump'), 150);
}

function render() {
  display.textContent = count;
  nextNum.textContent = `第${count + 1}段`;
  document.getElementById('btnCount').textContent = `✓ ${count + 1}段目を編み終えた`;

  if (goal > 0) {
    progressWrap.style.display = 'block';
    const pct = Math.min(100, Math.round(count / goal * 100));
    progressFill.style.width = pct + '%';
    progressText.textContent = `${count} / ${goal} 段`;
    progressPct.textContent = pct + '%';
    completeBanner.classList.toggle('show', count >= goal);
  } else {
    progressWrap.style.display = 'none';
    completeBanner.classList.remove('show');
  }
}
