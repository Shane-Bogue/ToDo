
const list = document.getElementById('container');
const a = document.getElementById('add');

a.onclick = () => CreateElement(0);

function CreateElement(text) {
    var div = document.createElement('div');
    var p = document.createElement('p');
    var wrapper = document.createElement('aside');
    var edit = document.createElement('img');
    var close = document.createElement('img');

    div.appendChild(p);
    div.appendChild(wrapper);
    edit.src ='Edit.svg'
    close.src ='Close.svg'

    edit.onclick = () =>  {
        let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

        let curTask = tasks.findIndex(e => e.task == div.firstChild.innerHTML);
        p.innerHTML =  prompt('Edit:', text);
        text = p.innerHTML;
        tasks[curTask].task = text
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    close.onclick = () => {
        let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

        tasks.splice(tasks.findIndex(e => e.task == div.firstChild.innerHTML), 1);

        list.removeChild(div);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    edit.style.width = '3vw'
    close.style.width = '5vw'

    wrapper.appendChild(edit);
    wrapper.appendChild(close);

    if (text == 0) {
        text = prompt('Task To Do:');
        localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: text }]));
    }

    p.innerHTML = text;
    list.appendChild(div);
    
    document.getElementById("add").scrollIntoView({behavior: 'smooth'});

    p.onclick = () => {
        p.style.textDecoration = p.style.textDecoration == 'line-through' ? '' : 'line-through';
        p.style.setProperty("--check-secondary", "#303030");
    }
}

window.onload = loadTasks;

function loadTasks() {
  if (localStorage.getItem("tasks") == null) return;
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    CreateElement(task.task)
  });
}