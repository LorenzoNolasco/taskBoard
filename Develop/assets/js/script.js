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
    .attr("data-project-id", taskList.taskID);
  const cardHeader = $("<div>")
    .addClass("card-header h4")
    .text(taskList.taskTitle);
  const cardBody = $("<div>").addClass("card-body");
  const cardDescription = $("<p>")
    .addClass("card-text")
    .text(taskList.taskDescription);
  const cardDueDate = $("<p>").addClass("card-text").text(taskList.dueDate);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-project-id", taskList.taskID);
  cardDeleteBtn.on("click", handleDeleteProject);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const title = document.getElementById("taskTitle").value;
  const dueDate = document.getElementById("taskDueDate").value;
  const description = document.getElementById("taskDescription").value;

  //declared an object for each task card
  const taskObject = {
    taskID: generateTaskId(),
    taskTitle: title,
    taskDueDate: dueDate,
    taskDescription: description,
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
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $("#taskDueDate").datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $("#submit-Btn").on("click", handleAddTask);
});
