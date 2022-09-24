{
  const tasks = [
    {
      content: `Zrobić pranie`,
      done: false,
    },
    {
      content: `Kupić mleko`,
      done: true,
    },
  ];

  const render = () => {
    document.querySelector(".js-list").innerHTML = ``;

    for (const task of tasks) {
      console.log(task.content);
      document.querySelector(".js-list").innerHTML += `<li ${
        task.done ? 'class="done"' : ""
      }> 
      <button>✅</button>${task.content} <button class="js-deleteButton">🗑</button></li> `;
    }
  };

  const addingNewTask = (TaskInput) => {
    tasks.push({
        content: TaskInput,
      });
      render();
    document.querySelector(".js-TaskInput").value = "";
  }

  const taskForm = document.querySelector(".js-TaskForm");

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const TaskInput = document.querySelector(".js-TaskInput").value.trim();
    if (TaskInput === "") {
      return;
    }
   addingNewTask(TaskInput)
  });

  const init = () => {
    render()
  }

  init()
}
