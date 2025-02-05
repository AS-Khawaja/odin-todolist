const addbtn=document.getElementById('addTask');
const taskinput=document.getElementById('taskinput');
const tasklist=document.getElementById('taskList');

loadtasks();

function addTask(){
    const task=taskinput.value.trim();

    if(task){
        createTaskElement(task);

        taskinput.value='';

        savetasks();
    }else{
        alert('Please enter a task');
    }
}

addbtn.addEventListener('click',addTask);

function createTaskElement(task){
    const listItem=document.createElement('li');

    listItem.textContent=task;

    const deletebtn= document.createElement('button');
    deletebtn.textContent='Delete';
    deletebtn.className='deleteTask';

    listItem.appendChild(deletebtn);

    tasklist.appendChild(listItem);

    deletebtn.addEventListener('click',function(){
        tasklist.removeChild(listItem);
        savetasks();
    });

}

function savetasks(){
    let tasks=[];

    tasklist.querySelectorAll('li').forEach(function(item){
        tasks.push(item.textContent.replace('Delete','').trim());
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function loadtasks(){
    const tasks=JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(createTaskElement);
}