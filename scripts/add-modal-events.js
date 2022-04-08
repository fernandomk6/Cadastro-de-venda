function toggleAdd() {

  let dataTable = document.querySelector("#data-table");
  let addModal = document.querySelector("#add-modal");
  let addModalShowBtn = document.querySelector("#add-modal-show-btn");
  let addModalCloseBtn = document.querySelector("#add-modal-close-btn");

  addModalShowBtn.addEventListener("click", function() {

    dataTable.classList.add("--display-none");
    addModal.classList.remove("--display-none");

  });

  addModalCloseBtn.addEventListener("click", function() {

    dataTable.classList.remove("--display-none");
    addModal.classList.add("--display-none");

  });
}

window.addEventListener("load", function() {
  toggleAdd();
});