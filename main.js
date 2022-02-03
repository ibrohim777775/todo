const nameInput = document.querySelector("#name");
const commentInput = document.querySelector("#comment");
const dateInput = document.querySelector("#date");
const submitBtn = document.querySelector("#submitItems");
const formModal = document.querySelector("#todoForm");
const showModalBtn = document.querySelector("#addItem");
const closeFormBtn = document.querySelector("#closeForm");
const tableBody = document.querySelector("#table__body");
const doneBtn = document.querySelector("#done__btn");
const errorBox = document.querySelector(".error__text");

let todoList = [];
if (localStorage.getItem("todo")) {
  const todo = localStorage.getItem("todo");
  todoList = [...JSON.parse(todo)];
  getTemplate();
}
if (!todoList[0]) {
  tableBody.innerHTML = `<tr><td class="table__items">Nothing to show</td></tr>`;
}
function getTemplate() {
  const template = todoList.map(
    (item, index) =>
      `<tr>
        <td class="table__items">${item.name}</td>
        <td class="table__items">${item.comment}</td>
        <td class="table__items">${item.date}</td>
        <td class="table__items">${item.status}</td>
        <td class="table__items">
          <button id="done__btn" onclick="doneBtnHandler(this)" type="button" data-id=${index}>Done</button>
          <button id="delete__btn" onclick="deleteBtnHandler(this)" type="button" data-id=${index}>Delete</button>
        </td>
      </tr>`
  );
  tableBody.innerHTML = template.toString().replaceAll(",", "");
}
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const obj = {
    name: nameInput.value,
    comment: commentInput.value,
    date: dateInput.value,
    status: "active",
  };
  if (
    obj.name.length === 0 ||
    obj.comment.length === 0 ||
    obj.date.length === 0
  ) {
    // nameInput.placeholder = "Please type something";
    errorBox.innerHTML = "Please, fill in all cells";
  } else {
    todoList.push(obj);
    localStorage.setItem("todo", JSON.stringify(todoList));
    getTemplate();
    formModal.style.display = "none";
    nameInput.value = " ";
    commentInput.value = " ";
    dateInput.value = null;
  }
});

showModalBtn.addEventListener("click", (e) => {
  formModal.style.display = "flex";
});

closeFormBtn.addEventListener("click", (e) => {
  formModal.style.display = "none";
});
function doneBtnHandler(e) {
  const index = +e.dataset.id;
  todoList[index].status = "Done";
  getTemplate();
  localStorage.setItem("todo", JSON.stringify(todoList));
}
function deleteBtnHandler(e) {
  const index = +e.dataset.id;
  console.dir(e);
  console.log(index, "-index");
  todoList.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todoList));
  getTemplate();
  if (!todoList[0]) {
    tableBody.innerHTML = `<tr><td class="table__items">Nothing to show</td>`;
  }
}
