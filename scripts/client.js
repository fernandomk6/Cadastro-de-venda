function insert() {

  let table = document.querySelector("#data-table");
  let addForm = document.querySelector("#add-modal-form");
  let addModal = document.querySelector("#add-modal");

  addForm.addEventListener("submit", function(e) {

    e.preventDefault();

    formData = new FormData(this);

    sendResquest("./actions/client.php", "post", formData)
      .then(function(data) {

        let dataTable = document.querySelector("#data-table tbody");
        dataTable.innerHTML = "";
  
        for(const p of data) {
  
          let tr = dataTable.insertRow(0);
          let td1 = tr.insertCell(0);
          let td2 = tr.insertCell(1);
          let td3 = tr.insertCell(2);
  
          td1.innerHTML = p.id;
          td2.innerHTML = p.name;
          td3.innerHTML = `
          <div class="submit-container">
            <div class="btn-icon">
              <button onclick="deleteId(${p.id})">
                <span class="material-icons-outlined --hover-to-white">
                  delete
                </span>
              </button>
            </div>
          </div>
          `;
        }
        
      });

      addModal.classList.add("--display-none");
      table.classList.remove("--display-none");

  });

}

function getAll() {

  formData = new FormData();
  formData.append('type', 'searchAll');

  sendResquest("./actions/client.php", "post", formData)
    .then(function(data) {

      let dataTable = document.querySelector("#data-table tbody");
      dataTable.innerHTML = "";

      for(const p of data) {

        let tr = dataTable.insertRow(0);
        let td1 = tr.insertCell(0);
        let td2 = tr.insertCell(1);
        let td3 = tr.insertCell(2);

        td1.innerHTML = p.id;
        td2.innerHTML = p.name;
        td3.innerHTML = `
        <div class="submit-container">
          <div class="btn-icon">
            <button onclick="deleteId(${p.id})">
              <span class="material-icons-outlined --hover-to-white">
                delete
              </span>
            </button>
          </div>
        </div>
        `;
      }

    });
  
}

function search() {

  let filterForm = document.querySelector("#filter-form");

  filterForm.addEventListener("submit", function(e) {

    e.preventDefault();

    let formData = new FormData(this);

    sendResquest("./actions/client.php", "post", formData)
      .then(function(data) {

        let dataTable = document.querySelector("#data-table tbody");
        dataTable.innerHTML = "";

        for(const p of data) {

          let tr = dataTable.insertRow(0);
          let td1 = tr.insertCell(0);
          let td2 = tr.insertCell(1);
          let td3 = tr.insertCell(2);
  
          td1.innerHTML = p.id;
          td2.innerHTML = p.name;
          td3.innerHTML = `
          <div class="submit-container">
            <div class="btn-icon">
              <button onclick="deleteId(${p.id})">
                <span class="material-icons-outlined --hover-to-white">
                  delete
                </span>
              </button>
            </div>
          </div>
          `;
        }

      })
  
  });

}

function deleteId(id) {

  formData = new FormData();
  formData.append("type", "delete");
  formData.append("id", id);

  fetch("./actions/client.php", {
    method: "post",
    body: formData
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {

      document.querySelector("#data-table tbody").innerHTML = "";
      for(p of response) {

        let dataTable = document.querySelector("#data-table tbody");

        let tr = dataTable.insertRow(0);
        let td1 = tr.insertCell(0);
        let td2 = tr.insertCell(1);
        let td3 = tr.insertCell(2);

        td1.innerHTML = p.id;
        td2.innerHTML = p.name;
        td3.innerHTML = `
        <div class="submit-container">
          <div class="btn-icon">
            <button onclick="deleteId(${p.id})">
              <span class="material-icons-outlined --hover-to-white">
                delete
              </span>
            </button>
          </div>
        </div>
        `;
      }

    })
    .catch(function(error) {
      console.log(error)
    });
}

async function sendResquest(url, method, body) {

  let response = await fetch(url, {
    method: method,
    body: body
  });

  response = await response.json();
  return response;
}

window.addEventListener("load", function() {
  insert();
  getAll();
  search();
});