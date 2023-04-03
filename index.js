let Title = document.querySelector(".Title_text");
let Main = document.querySelector(".Main_text");
let addButton = document.querySelector(".save_btn");
let saveNote = document.querySelector(".notes");
ShowNotes()
let notes = [];
localStorage.setItem('notes',JSON.stringify(notes))

function addNotes() {
  let notes = localStorage.getItem("notes");
  if(notes===null){
    notes = [];
  }
  else{
    notes=JSON.parse(notes)
  }
  if (Main.value == "") {
    alert("Add your note");
    return;
  }
  let notesObj = {
    title: Title.value,
    text: Main.value,
  };
  Title.value='';
  Main.value='';
  notes.push(notesObj);
  localStorage.setItem("notes", JSON.stringify(notes));
  ShowNotes();
}
function ShowNotes() {
  let notesHtml = "";
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  for (let i = 0; i < notes.length; i++) {
if (notes[i].archived) {
    continue;
  }
  notesHtml += ` 
  <div class="note">
    <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
    <button class="archiveNote" id=${i} onclick="archiveNote(${i})">Archive</button>
    <h3 class="note_title">${
      notes[i].title === "" ? "Note" : notes[i].title
    }</h3>
    <div class="note_text">${notes[i].text}</div>
  </div>
  `;

  }
  saveNote.innerHTML = notesHtml;
}
function deleteNote(index)
{
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  notes.splice(index,1);
  localStorage.setItem("notes", JSON.stringify(notes));
  ShowNotes();
}
addButton.addEventListener("click", addNotes);

function archiveNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  let note = notes[index];
  note.archived = true;
  localStorage.setItem("notes", JSON.stringify(notes));
  ShowNotes();
}