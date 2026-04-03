const root = document.documentElement;
let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function setTheme(theme) {
  currentTheme = theme;
  root.setAttribute('data-theme', theme);
  const icon = theme === 'dark' ? '🌙' : '☀️';
  document.querySelector('.theme-toggle').textContent = icon;
}
setTheme(currentTheme);

document.querySelector('.theme-toggle').addEventListener('click', () => {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Form + status
const form   = document.getElementById('userForm');
const status = document.getElementById('statusScreen');

function showLoading() {
  form.classList.add('form-hidden');
  status.style.display = 'flex'; 
}

function hideLoading() {
  status.style.display = 'none';
  form.classList.remove('form-hidden');
}


async function handleSubmit(e) {
  e.preventDefault();
  const g = document.getElementById('gmail').value.trim();
  const n = document.getElementById('name').value.trim();
  const a = document.getElementById('age').value.trim();

  if (!g || !n || !a) {
    alert("All fields are required");
    return;
  }

  showLoading();


  const delay = new Promise(r => setTimeout(r, 2500));


  await fetch('save.php', {
    method: 'POST',
    body: new FormData(form)
  });


  await delay;

  hideLoading();
  form.reset();

 
  const successMsg = document.createElement('p');
  successMsg.textContent = "Submitted successful";
  successMsg.style.color = "#16a34a";
  successMsg.style.fontSize = "0.9rem";
  successMsg.style.marginTop = "0.5rem";
  successMsg.style.textAlign = "center";
  form.appendChild(successMsg);

  setTimeout(() => {
    if (successMsg.parentNode) successMsg.remove();
  }, 3000);
}

form.addEventListener('submit', handleSubmit);