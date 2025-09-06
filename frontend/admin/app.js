// app.js - Admin helper & page logic
const BASE_URL = 'http://localhost:5000'; // change if needed
const TOKEN_KEY = 'admin_token';

// --- Auth helpers
function getToken(){ return localStorage.getItem(TOKEN_KEY); }
function setToken(t){ localStorage.setItem(TOKEN_KEY, t); }
function clearToken(){ localStorage.removeItem(TOKEN_KEY); }

async function authFetch(path, opts = {}) {
  const headers = opts.headers || {};
  if (!opts.body || typeof opts.body === 'string') headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(BASE_URL + path, { ...opts, headers });
  if (res.status === 401) {
    clearToken();
    window.location = 'login.html';
    throw new Error('Unauthorized');
  }
  // attempt JSON
  const text = await res.text();
  try { return JSON.parse(text); } catch(e) { return text; }
}

// --- Public function login used by login.html
async function adminLogin(email, password) {
  const res = await fetch(BASE_URL + '/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const err = await res.json().catch(()=>({ message: res.statusText }));
    throw new Error(err.message || 'Login failed');
  }
  const data = await res.json();
  if (!data.token && !data.accessToken) throw new Error('No token returned from server');
  setToken(data.token || data.accessToken);
  return data;
}

function adminLogout(){
  clearToken();
  window.location = 'login.html';
}

function ensureAuth(){
  if (!getToken()) window.location = 'login.html';
}

// --- Dashboard
async function loadStats(){
  try {
    const data = await authFetch('/api/stats/admin');
    document.getElementById('totalTourists').textContent = data.totalTourists ?? data.total ?? '—';
    document.getElementById('activeJourneys').textContent = data.activeJourneys ?? '—';
    document.getElementById('activePanics').textContent = data.activePanics ?? '—';
  } catch (err) {
    console.error(err);
  }
}

// --- Tourists list
async function loadTourists(){
  try {
    const data = await authFetch('/api/admin/tourists');
    const tourists = Array.isArray(data) ? data : (data.tourists || []);
    const tbody = document.querySelector('#tourists-table tbody');
    tbody.innerHTML = '';
    tourists.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${t.name || ''}</td>
        <td>${t.email || ''}</td>
        <td>${t.phone || ''}</td>
        <td>${t.startDate ? new Date(t.startDate).toLocaleDateString() : ''}</td>
        <td>${t.endDate ? new Date(t.endDate).toLocaleDateString() : ''}</td>
        <td>${t.verified ? 'Yes' : 'No'}</td>
        <td><a href="tourist.html?id=${t._id || t.id}">View</a></td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
  }
}

// --- Tourist details
async function loadTouristDetails(id){
  try {
    const t = await authFetch(`/api/admin/tourists/${id}`);
    const out = document.getElementById('details');
    out.innerHTML = `
      <h2>${t.name || ''}</h2>
      <p><strong>Email:</strong> ${t.email || ''}</p>
      <p><strong>Phone:</strong> ${t.phone || ''}</p>
      <p><strong>ID Type:</strong> ${t.idType || ''}</p>
      <p><strong>Verified:</strong> ${t.verified ? 'Yes' : 'No'}</p>
      <p><strong>Itinerary:</strong> ${(t.itinerary || []).join(', ')}</p>
      <p><strong>Blockchain tx:</strong> ${t.verificationTxHash || '—'}</p>
    `;
  } catch (err) {
    document.getElementById('details').textContent = 'Failed to load details';
    console.error(err);
  }
}

// --- Panics
async function loadPanics(){
  try {
    const res = await authFetch('/api/admin/panic');
    const list = Array.isArray(res) ? res : (res.panics || []);
    const ul = document.getElementById('panics-list');
    ul.innerHTML = '';
    list.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div><strong>${p.tourist?.name || p.tourist}</strong> — ${p.message || ''}</div>
        <div>At: ${p.createdAt ? new Date(p.createdAt).toLocaleString() : ''} | Loc: ${p.location?.lat || ''}, ${p.location?.lon || ''}</div>
        <button data-id="${p._id || p.id}">Resolve</button>
      `;
      li.querySelector('button').addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        try {
          await resolvePanic(id);
          li.remove();
        } catch(err) {
          alert('Failed to resolve panic');
        }
      });
      ul.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

async function resolvePanic(id){
  await authFetch(`/api/admin/panic/${id}/resolve`, { method: 'PUT' });
  return true;
}