const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector('.tasks-container');

const validateInput = () => inputElement.value.trim().length>0
    // msm coisa q fazer if return true
    // e else return false, ele ja da o
    //valor booleano

const handleAddTask = () =>
{
    const inputIsValid = validateInput();

    if(!inputIsValid)
    {
       return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value; //titulo item

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage();
};

const handleClick = (taskContent) =>
{
    const tasks = tasksContainer.childNodes;

    for(const task of tasks)
    {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        if(currentTaskIsBeingClicked)
        {
            task.firstChild.classList.toggle("completed"); //toggle = se tiver tira, se n tiver coloca
        }
    }

    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) =>
{
    const tasks = tasksContainer.childNodes;

    for(const task of tasks)
    {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        if(currentTaskIsBeingClicked)
        {
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
};

const handleInputChange = () =>
{
    const inputIsValid = validateInput();

    if(inputIsValid)
    {
        return inputElement.classList.remove("error");
    }
};

addTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());

inputElement.addEventListener("keypress", function(event) //funcao para habilitar o enter para com
//o botao de add task
{
    if(event.key === "Enter")
    {
        
        addTaskButton.click();
    }
});

const updateLocalStorage = () =>
{
    const tasks = tasksContainer.childNodes;

        const localStorageTasks = [... tasks].map(task => 
        {
            const content = task.firstChild;
            const isCompleted = content.classList.contains('completed');

            return {description: content.innerText, isCompleted}
        });
    
    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
}

const refreshTasksUsingLocalStorage = () =>
{
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if(!tasksFromLocalStorage)
    {
        return;
    }

    for(const task of tasksFromLocalStorage)
    {
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item');
    
        const taskContent = document.createElement('p');
        taskContent.innerText = task.description; //titulo item com localStorage

        if(task.isCompleted)
        {
            taskContent.classList.add("completed");
        }
    
        taskContent.addEventListener('click', () => handleClick(taskContent));
    
        const deleteItem = document.createElement('i');
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt");
    
        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));
    
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
    
        tasksContainer.appendChild(taskItemContainer);
    }
}

refreshTasksUsingLocalStorage();