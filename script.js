{
  const tasks = [
    {
      content: `Oto prosta lista zadań`,
      done: false,
    },
    {
      content: `Mozesz przełączać status zadania zielonym przyciskiem bądź usuwać juz zrobione zadania czerwonym`,
      done: true,
    },
  ];

  tasksWithNewItems=[
    ...tasks
  ]

  let tasksToRender=tasksWithNewItems;

  const taskRemove = (index) => {
    tasksWithNewItems.splice(index, 1);
    render();
  };

  const addingNewTask = (TaskInput) => {
    tasksWithNewItems.push({
      content: TaskInput,
    });
    render();
    document.querySelector(".js-TaskInput").value = "";
  };

  const HideDoneTasks = () =>{
    const doneTask=tasksWithNewItems.filter(({done})=>!done)
    tasksToRender=doneTask
  }

  const toggleRenderButton=document.querySelector(".js-toggleRender");
  
 
  const toggleRender =()=>{
    if(toggleRenderButton.innerText==="Ukryj ukończone"){
      HideDoneTasks()
      toggleRenderButton.innerText="Pokaż ukończone"
    }else{
      tasksToRender=tasksWithNewItems;
      toggleRenderButton.innerText="Ukryj ukończone"
    }
    
  }

  const finishTasks=()=>{
    tasksWithNewItems.forEach(
      (task)=>{
        task.done=true;
      }  
    )
  }

  const doneAllButton=document.querySelector(".js-doneAll")
  
  doneAllButton.addEventListener("click",()=>{
    finishTasks();
    render();
  })

  const checkIfFinish =()=>{
   return tasksWithNewItems.every(({done})=>done==true)
  }

  const checkIfEmpty=()=>{
    return tasksWithNewItems.length;
  }

  const buttonsManagement=()=>{
    if(checkIfFinish()){
      doneAllButton.disabled=true;
    }else{
      doneAllButton.disabled=false;
    }

    if(!checkIfEmpty()){
      doneAllButton.classList.add("taskList__taskButton--hidden");
      toggleRenderButton.classList.add("taskList__taskButton--hidden")
    }else{
      doneAllButton.classList.remove("taskList__taskButton--hidden");
      toggleRenderButton.classList.remove("taskList__taskButton--hidden")
    }

  }


  const render = () => {
    document.querySelector(".js-list").innerHTML = ``;
    buttonsManagement();
    
    for (const task of tasksToRender) {
      document.querySelector(".js-list").innerHTML += `
    <li class=" taskList__listIteam "> 
        <button class="js-toggleStatus taskList__button taskList__button--done">
            ${task.done ? "✓" : ""}
        </button>
        <div class="taskList__taskContent ${task.done ? " done" : ""}">
            ${task.content}
        </div>
        <button class="js-deleteButton taskList__button taskList__button--remove">🗑</button>
    </li> `;
    }
    const removeButtons = document.querySelectorAll(".js-deleteButton");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        taskRemove(index);
      });
    });

    const toggleStatus = document.querySelectorAll(".js-toggleStatus");

    toggleStatus.forEach((toggleStatus, index) => {
      toggleStatus.addEventListener("click", () => {
        tasksWithNewItems[index].done = !tasksWithNewItems[index].done;
        render();
      });
    });
  };

  toggleRenderButton.addEventListener("click",()=>{
    toggleRender()
    render()
  })


  const init = () => {
    render();

    const taskForm = document.querySelector(".js-TaskForm");

    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      document.querySelector(".js-TaskInput").focus();

      const TaskInput = document.querySelector(".js-TaskInput").value.trim();
      if (TaskInput === "") {
        return;
      }
      addingNewTask(TaskInput);
    });
  };

  init();


}
