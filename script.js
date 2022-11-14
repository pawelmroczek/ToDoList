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

  const taskRemove = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const addingNewTask = (TaskInput) => {
    tasks.push({
      content: TaskInput,
    });
    render();
    document.querySelector(".js-TaskInput").value = "";
  };

  const render = () => {
    document.querySelector(".js-list").innerHTML = ``;

    for (const task of tasks) {
      console.log(task.content);
      document.querySelector(
        ".js-list"
      ).innerHTML += `<li class=" taskList__listIteam ${task.done ? " done" : ""}"> 
      <button class="js-toggleStatus taskList__toggleButton">${task.done ? " ✔️" : ""}</button>
      <div class="taskList__taskContent">
      ${
        task.content
      }
      </div>
      <span>
       <button class="js-deleteButton taskList__removeButton">🗑</button>
       </span>
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
        tasks[index].done = !tasks[index].done;
        render();
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
