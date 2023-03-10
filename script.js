const inputElement = document.querySelector(".newTextInput");
const addTaskButton = document.querySelector(".newTaskButton");
const tasksContainer = document.querySelector('.tasksContainer')
const taskItem = document.querySelector(".taskItem")

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () =>{
    const inputIsValid = validateInput();

    if(!inputIsValid){
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('taskItem')

    const taskContent = document.createElement('p')
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click',() => handleClick(taskContent))

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('far')
    deleteItem.classList.add('fa-trash-can')
   
    deleteItem.addEventListener("click",() => handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)


    tasksContainer.appendChild(taskItemContainer)

    inputElement.value = "";

    updateLocalStorage()

};



const handleClick = (taskContent) =>{
    const tasks = tasksContainer.childNodes;

    for (const task of tasks){
        if(task.firstChild.isSameNode(taskContent)){
            task.firstChild.classList.toggle("completed");
            taskItem.classList.toggle("completed")
        }
    }
    updateLocalStorage()
}
const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;
    for (const task of tasks){
        if(task.firstChild.isSameNode(taskContent))
        taskItemContainer.remove();
    }
    updateLocalStorage()
}


const handleInputChange = () => {
    const inputIsValid = validateInput();
    if(inputIsValid){
        return inputElement.classList.remove("error");
    }
}



const updateLocalStorage = ()  =>{

    const tasks = tasksContainer.childNodes;


    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed')

        return {description: content.innerText, isCompleted}

    });
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
}

const refrashTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))
    
    if(!tasksFromLocalStorage) return;

    for (const task of tasksFromLocalStorage){
        const taskItemContainer = document.createElement('div')
        taskItemContainer.classList.add('taskItem')

        const taskContent = document.createElement('p')
        taskContent.innerText = task.description;

        if(task.isCompleted){
            taskContent.classList.add('completed')
        }

        taskContent.addEventListener('click',() => handleClick(taskContent))

        const deleteItem = document.createElement('i')
        deleteItem.classList.add('far')
        deleteItem.classList.add('fa-trash-can')

        deleteItem.addEventListener("click",() => handleDeleteClick(taskItemContainer, taskContent))

        taskItemContainer.appendChild(taskContent)
        taskItemContainer.appendChild(deleteItem)

        tasksContainer.appendChild(taskItemContainer)
    }
}
refrashTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange())

// darkmode

let darkmod = document.querySelector("body")
let ball = document.querySelector(".ball")
let container = document.querySelector(".container")
let newTaskCotainer = document.querySelector(".newTaskContainer")


function dark(){
    darkmod.classList.toggle("active")
    ball.classList.toggle("active")
    container.classList.toggle("active")
    tasksContainer.classList.toggle("active")
    newTaskCotainer.classList.toggle("active")
    inputElement.classList.toggle("active")
    addTaskButton.classList.toggle("active")
    
   
}


// menu
let on = 0;

$(".ajuda").click(() => {
    console.log("click")
    $("#ajudacontainer").slideDown()
    on == 1
})
$("#close").click(() => {
    console.log("close")
    $("#ajudacontainer").hide()
    on == 0
})


// opcoes
$(".opcoes").click(() => {
    console.log("opcoes")
    $("#opcoescontainer").slideDown()
})
$("#closeOpitions").click(() => {
    console.log("close")
    $("#opcoescontainer").hide()
})

// sobre
$(".sobre").click(() => {
    console.log("sobre")
    $("#sobrecontainer").slideDown()
})
$("#closesobre").click(() => {
    console.log("close")
    $("#sobrecontainer").hide()
})

// libras
$("#libraslogo").mouseenter(() => {
    $("#libras").animate({ width: 120})
})
$("#libraslogo").mouseleave(() => {
    $("#libras").animate({ width: 0})
})
