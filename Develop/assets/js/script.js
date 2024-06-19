// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const toDo = document.getElementById("todo-cards");
  const inProgress = document.getElementById("in-progress-cards");
  const done = document.getElementById("done-cards");



}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  const title = document.getElementById("taskTitle").value;
  const dueDate = document.getElementById("taskDueDate").value;
  const description = document.getElementById("taskDescription").value;
  console.log(title);
  console.log(dueDate);
  console.log(description);
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
  const task = JSON.stringify(taskObject);
  localStorage.setItem("taskList", task);

  $("#staticBackdrop").modal("hide");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});

$("#submit-Btn").on("click", function (event) {
  event.preventDefault();
  // let taskID = '';
  // generateTaskId(taskID);
  handleAddTask();
});

// document.getElementById('submit-Btn').addEventListener("click", function {

// })
