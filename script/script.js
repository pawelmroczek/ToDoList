{
  let tasks = [
    {
      content: `Oto prosta lista zadań`,
      done: false,
    },
    {
      content: `Mozesz przełączać status zadania zielonym przyciskiem bądź usuwać juz zrobione zadania czerwonym`,
      done: true,
    },
  ];
  let hideDoneTask = false;
  

  const removeTask = (index) => {
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];

    render();
  };

  const addNewTask = (TaskInput) => {
    tasks = [
      ...tasks,
      {
        content: TaskInput,
      },
    ];
    render();
    
  };

  const toggleTaskStatus = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      { ...tasks[index], done: !tasks[index].done },
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const toggleDoneTaskView = () => {
    hideDoneTask = !hideDoneTask;
  };

  const finishTasks = () => {
    tasks.forEach((task, index) => {
      if (!task.done) {
        toggleTaskStatus(index);
      }
    });
  };

  const checkAllTaskAreDone = () => {
    return tasks.every(({ done }) => done == true);
  };

  const checkIfNotEmpty = () => {
    return tasks.length;
  };

  const buttonsManagement = () => {
    const buttonContener = document.querySelector(".js-buttonContener");

    if (!checkIfNotEmpty()) {
      buttonContener.innerHTML = "";
    } else {
      buttonContener.innerHTML = `<button class="taskList__taskButton js-toggleRender">${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone</button>
      <button class="taskList__taskButton js-doneAll">Ukończ wszystkie</button>`;

      const doneAllButton = document.querySelector(".js-doneAll");
      const toggleRenderButton = document.querySelector(".js-toggleRender");

      doneAllButton.addEventListener("click", () => {
        finishTasks();
        render();
      });

      toggleRenderButton.addEventListener("click", () => {
        toggleRender();
        render();
      });

      const toggleRender = () => {
        toggleDoneTaskView();
      };

      doneAllButton.disabled=checkAllTaskAreDone();
    }
  };

  const render = () => {
    document.querySelector(".js-list").innerHTML = ``;
    buttonsManagement();

    for (const task of tasks) {
      document.querySelector(".js-list").innerHTML += `
    <li class="  ${
      task.done && hideDoneTask ? "taskList__hidden" : "taskList__listIteam"
    }  "> 
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
        removeTask(index);
      });
    });

    const toggleStatus = document.querySelectorAll(".js-toggleStatus");

    toggleStatus.forEach((toggleStatus, index) => {
      toggleStatus.addEventListener("click", () => {
        toggleTaskStatus(index);
      });
    });
  };

  const onFormSubmit = ()=>{
    event.preventDefault();

    const taskInputElement = document.querySelector(".js-TaskInput");
    const taskContent = taskInputElement.value.trim();

    taskInputElement.focus();

     if (taskContent === "") {
        return;
    }

    addNewTask(taskContent);
    taskInputElement.value = "";
  }



  const init = () => {
    render();

    const taskForm = document.querySelector(".js-TaskForm");

    taskForm.addEventListener("submit", (event) => {
      onFormSubmit();
    });
  };

  init();
}
