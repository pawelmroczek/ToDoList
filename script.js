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
    for (const task of tasks) {
      console.log(task.content);
      document.querySelector(
        ".js-list"
      ).innerHTML += `<li ${task.done ? "class=\"done\"": ""}>${task.content} <button class="js-deleteButton">🗑</button></li> `;
      
    }
   
  const taskForm = document.querySelector(".js-TaskForm")  

  taskForm.addEventListener("click", () =>{
    event.preventDefault();
  })

  };
  render();
}
