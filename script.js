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
  let buttonText = "Ukryj ukończone";

  const taskRemove = (index) => {
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];

    render();
  };

  const addingNewTask = (TaskInput) => {
    tasks = [
      ...tasks,
      {
        content: TaskInput,
      },
    ];
    render();
    document.querySelector(".js-TaskInput").value = "";
  };

  const toggleTaskStatus = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      { ...tasks[index], done: !tasks[index].done },
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const hideDoneTasks = () => {
    hideDoneTask = !hideDoneTask;
  };

  const finishTasks = () => {
    tasks.forEach((task, index) => {
      if (!task.done) {
        toggleTaskStatus(index);
      }
    });
  };

  const checkIfFinish = () => {
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
      buttonContener.innerHTML = `<button class="taskList__taskButton js-toggleRender">${buttonText}</button>
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
        if (toggleRenderButton.innerText === "Ukryj ukończone") {
          buttonText = "Pokaż ukończone";
        } else {
          buttonText = "Ukryj ukończone";
        }
        hideDoneTasks();
      };

      if (checkIfFinish()) {
        doneAllButton.disabled = true;
      } else {
        doneAllButton.disabled = false;
      }
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
        taskRemove(index);
      });
    });

    const toggleStatus = document.querySelectorAll(".js-toggleStatus");

    toggleStatus.forEach((toggleStatus, index) => {
      toggleStatus.addEventListener("click", () => {
        toggleTaskStatus(index);
      });
    });
  };

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
