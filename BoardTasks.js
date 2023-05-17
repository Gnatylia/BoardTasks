// BoardTasks.js 
console.log('BoardTasks.js loaded');

let inputs = document.querySelector('.inputs');
let reset = document.getElementById('reset');
let add = document.getElementById('add');
let tasks = document.querySelector('.tasks');

let errorElem = document.getElementById('error');


function GetTask() {

    // clear error
    errorElem.innerHTML = "";

    var task = {}; // declare variable of object

    var taskElement = inputs.querySelector('#task');
    task['note'] = taskElement.value; //declare property of object

    var dateElement = document.getElementById('date');
    task['date'] = dateElement.value; //declare property of object

    var timeElement = document.getElementById('time');
    task['time'] = timeElement.value; //declare property of object

    //console.log('task = %o', task);
    //#region example of task
    //task; {
    //note: taskElement.value,
    //date: dateElement.value,
    //time: timeElement.value
    //},
    //#endregion

    // check each property for empty value
    for (var propName in task) {

        if (task[propName] == '') {
            //alert("please fill all fileds of the form.");
            errorElem.innerHTML = "please fill all fileds of the form.";
            return null;
        }
    }

    var taskID = 'id' + Math.random();
    task.id = taskID.replace(".", "");

    return task;
} // GetTask

function GetNoteBox(task) {

    var noteBox = document.createElement('div');
    noteBox.className = 'noteBox';
    noteBox.id = task.id;

    // TODO: add noteBoxID to id

    var closeButton = document.createElement('button');
    closeButton.className = 'button';
    closeButton.innerHTML = 'X';
    closeButton.setAttribute('noteBoxID', task.id);
    // add event to button
    closeButton.addEventListener('click', removeNote);

    var note = document.createElement('div');
    note.className = 'note';
    note.innerHTML = task.note;

    var date = document.createElement('div');
    date.className = 'date';
    date.innerHTML = task.date;

    var time = document.createElement('div');
    time.className = 'time';
    time.innerHTML = task.time;

    noteBox.appendChild(closeButton);
    noteBox.appendChild(note);
    noteBox.appendChild(date);
    noteBox.appendChild(time);


    return noteBox;
} // GetNoteBox

function removeNote(e) {
    // this - button
    console.log('removeNote: this = %o', this);

    var noteBoxID = this.getAttribute('noteBoxID');
    var noteBox = document.getElementById(noteBoxID);

    // TODO: transition
    noteBox.style.opacity = 0; // for fade out

    setTimeout(function(params) {
        tasks.removeChild(noteBox);
    }, 3000);
    //TODO: transition the end

    //tasks.removeChild(noteBox);

    // remove from storage

    localStorage.removeItem(noteBoxID);
    //removeNote
}


function ResetForm() {
    var taskElement = document.getElementById('task');
    taskElement.value = ""; //reset value

    var dateElement = document.getElementById('date');
    dateElement.value = ""; //reset value

    var timeElement = document.getElementById('time');
    timeElement.value = ""; //reset value
}

// ------------- code of application ---
function AddTask() {
    var task = GetTask();

    if (task == null) {
        return;
    }

    AddNote(task);

    SaveToStorage(task);
    ResetForm();
} // Main

function AddNote(task) {
    var noteBox = GetNoteBox(task);
    console.log('Main:noteBox = %o', noteBox);
    tasks.appendChild(noteBox);
    setTimeout(function() {
        noteBox.style.opacity = 1;
    }, 50);
}

function LoadApp() {
    console.log("LoadApp: ");

    // add event for buttons
    reset.addEventListener('click', ResetForm);
    add.addEventListener('click', AddTask);

    // load items from storage
    var _items = LoadFromStorage();

    if (_items.length == 0)
        return;

    for (var i = 0; i < _items.length; i++) {
        var task = _items[i];

        AddNote(task);
    } // for

} //loadApp

function SaveToStorage(task) {
    var saveTask = JSON.stringify(task);
    localStorage.setItem(task.id, saveTask);
} //saveToStorage


function LoadFromStorage() {
    var _result = [];

    for (var key in localStorage) {
        // пропустит такие ключи, как "setItem", "getItem" и так далее
        if (!localStorage.hasOwnProperty(key)) continue;

        var saveTask = localStorage[key];
        console.log('saveTask = ' + saveTask);
        var note = JSON.parse(saveTask);
        _result.push(note);
    }
    return _result;
} // loadFromStorage


//-------------------------------------
LoadApp();