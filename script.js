const entryTitle = document.getElementById('entryTitle');
const entryDate = document.getElementById('entryDate');
const entryContent = document.getElementById('entryContent');
const addEntryBtn = document.getElementById('addEntryBtn');
const entriesContainer = document.getElementById('entriesContainer');

let entries = JSON.parse(localStorage.getItem('memoryLaneEntries')) || [];

function saveEntries() {
  localStorage.setItem('memoryLaneEntries', JSON.stringify(entries));
}

function renderEntries() {
  entriesContainer.innerHTML = '';
  entries.forEach((entry, index) => {
    const card = document.createElement('div');
    card.classList.add('entry-card');

    card.innerHTML = `
      <h3>${entry.title}</h3>
      <p class="entry-date">${entry.date}</p>
      <p>${entry.content}</p>
      <div class="entry-actions">
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      </div>
    `;
    entriesContainer.appendChild(card);
  });
}

addEntryBtn.addEventListener('click', () => {
  const title = entryTitle.value.trim();
  const date = entryDate.value;
  const content = entryContent.value.trim();

  if (!title || !date || !content) {
    alert('Please fill out all fields!');
    return;
  }

  entries.push({ title, date, content });
  saveEntries();
  renderEntries();

  entryTitle.value = '';
  entryDate.value = '';
  entryContent.value = '';
});

function deleteEntry(index) {
  if (confirm('Are you sure you want to delete this entry?')) {
    entries.splice(index, 1);
    saveEntries();
    renderEntries();
  }
}

function editEntry(index) {
  const entry = entries[index];
  entryTitle.value = entry.title;
  entryDate.value = entry.date;
  entryContent.value = entry.content;


  entries.splice(index, 1);
  renderEntries();
}

renderEntries();