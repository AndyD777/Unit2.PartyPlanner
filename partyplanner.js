const API_URL = 'git https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events';

const partyList = document.getElementById('party-list');
const form = document.getElementById('party-form');

let state = [];

function renderParties() {
  partyList.innerHTML = '';
  state.forEach(party => {
    const partyEl = document.createElement('div');
    partyEl.className = 'party';
    partyEl.innerHTML = `
      <h3>${party.name}</h3>
      <p><strong>Date:</strong> ${party.date}</p>
      <p><strong>Time:</strong> ${party.time}</p>
      <p><strong>Location:</strong> ${party.location}</p>
      <p>${party.description}</p>
      <button onclick="deleteParty(${party.id})">Delete</button>
    `;
    partyList.appendChild(partyEl);
  });
}

async function fetchParties() {
  const res = await fetch(API_URL);
  const data = await res.json();
  state = data;
  renderParties();
}

async function addParty(party) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(party)
  });
  const newParty = await res.json();
  state.push(newParty);
  renderParties();
}

async function deleteParty(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  state = state.filter(p => p.id !== id);
  renderParties();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const newParty = {
    name: document.getElementById('name').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    location: document.getElementById('location').value,
    description: document.getElementById('description').value
  };
  addParty(newParty);
  form.reset();
});

fetchParties();