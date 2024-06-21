// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

const submitTaskModalEl = $("#staticBackdrop");
const readLabelEl = $("#readLabel");

const taskTitleEl = $("#taskTitle");
const taskDueDateEl = $("#taskDueDate");
const taskDescriptionEl = $("#taskDescription");

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  //creates task card with specific information
  const taskCard = $("<div>")
    .addClass("card project-card draggable my-3")
    .attr("data-project-id", task.ID);
  const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
  const cardBody = $("<div>").addClass("card-body");
  const cardDescription = $("<p>").addClass("card-text").text(task.description);
  const cardDueDate = $("<p>").addClass("card-text").text(task.dueDate);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-project-id", task.ID);
  cardDeleteBtn.on("click", handleDeleteTask);
  if (task.dueDate && task.status !== "done") {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY");

    if (now.isSame(taskDueDate, "day")) {
      taskCard.addClass("bg-warning text-white");
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass("bg-danger text-white");
      cardDeleteBtn.addClass("border-light");
    }
  }

  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(tasks);
  if (!tasks) {
    tasks = [];
  }
  // const projects = readProjectsFromStorage();

  // ? Empty existing project cards out of the lanes
  const todoList = $("#todo-cards");
  todoList.empty();
  const inProgressList = $("#in-progress-cards");
  inProgressList.empty();
  const doneList = $("#done-cards");
  doneList.empty();
  // ? Loop through projects and create project cards for each status
  for (let task of tasks) {
    if (task.status === "to-do") {
      todoList.append(createTaskCard(task));
    } else if (task.status === "in-progress") {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === "done") {
      doneList.append(createTaskCard(task));
    }
  }

  // ? Use JQuery UI to make task cards draggable
  $(".draggable").draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const title = document.getElementById("taskTitle").value;
  const dueDate = document.getElementById("taskDueDate").value;
  const description = document.getElementById("taskDescription").value;

  //declared an object for each task card
  const taskObject = {
    ID: generateTaskId(),
    title: title,
    dueDate: dueDate,
    description: description,
    status: "to-do",
  };

  //declared variable for adding into an JSON array of objects
  taskList.push(taskObject);
  const task = JSON.stringify(taskList);
  localStorage.setItem("tasks", task);
  createTaskCard();
  // clears inputs and hides modal
  submitTaskModalEl.modal("hide");
  taskTitleEl.val("");
  taskDueDateEl.val("");
  taskDescriptionEl.val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask() {
  const taskID = $(this).attr("data-project-id");
  const tasks = localStorage.getItem("tasks");
  console.log(tasks);
  // ? Remove project from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity. For now, we will use a `forEach()` loop to remove the project.
  tasks.forEach((task) => {
    if (task.id === taskID) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });

  // projects.forEach((project) => {
  //   if (project.id === projectId) {
  //     projects.splice(projects.indexOf(project), 1);
  //   }
  // });

  // ? We will use our helper function to save the projects to localStorage
  // saveProjectsToStorage(tasks);
  localStorage.setItem("tasks", tasks);

  // ? Here we use our other function to print projects back to the screen
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // ? Read projects from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  // ? Get the project id from the event
  const taskId = ui.draggable[0].dataset.projectId;
  console.log(taskId);

  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;
  console.log(newStatus);
console.log(task.ID)
  for (let task of tasks) {
    // ? Find the project card by the `id` and update the project status.
    if (task.id === taskId) {
      project.status = newStatus;
    }
  }
  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $("#taskDueDate").datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
});

$("#submit-Btn").on("click", handleAddTask);
// $(".btn-delete")