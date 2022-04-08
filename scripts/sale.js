function insert() {

  let addModalShowBtn = document.querySelector("#add-modal-show-btn");

  addModalShowBtn.addEventListener("click", function() {
    // inserir registro na tabela sale e pegar o id

    formData = new FormData();

    formData.append('type', 'insert-sale');
    formData.append('date', currentDate());

    sendResquest("./actions/sale.php", "post", formData)
      .then(function(data) {

        document.querySelector("#sale-id").value = data.id;
        document.querySelector("#sale-date").value = data.date;
        document.querySelector("#sale_product-sale-id").value = data.id;
        document.querySelector("#sale_payment-sale-id").value = data.id;
  

      });


    // selecionando todos os clientes
    formData = new FormData();
    formData.append('type', 'searchAll');
  
    sendResquest("./actions/client.php", "post", formData)
      .then(function(data) {

        let saleClientId = document.querySelector("#sale-client_id");
        saleClientId.innerHTML = "";

        for(let i = 0; i < data.length; i++) {

          let clientData = document.createElement('option');
          clientData.value = data[i].id;
          clientData.innerHTML = data[i].name;
          saleClientId.appendChild(clientData);

        }


      });

    // selecionando todos os produtos
    formData = new FormData();
    formData.append('type', 'searchAll');
  
    sendResquest("./actions/product.php", "post", formData)
      .then(function(data) {

        let saleProductProductId = document.querySelector("#sale_product-product_id");
        saleProductProductId.innerHTML = "";

        for(let i = 0; i < data.length; i++) {

          let productData = document.createElement('option');
          productData.value = data[i].id;
          productData.innerHTML = data[i].name;
          saleProductProductId.appendChild(productData);

        }


      });

    // selecionando todos os pagamentos
    formData = new FormData();
    formData.append('type', 'searchAll');
  
    sendResquest("./actions/payment.php", "post", formData)
      .then(function(data) {

        let salePaymentPaymentId = document.querySelector("#sale_payment-payment_id");
        salePaymentPaymentId.innerHTML = "";

        for(let i = 0; i < data.length; i++) {

          let paymentData = document.createElement('option');
          paymentData.value = data[i].id;
          paymentData.innerHTML = data[i].name;
          salePaymentPaymentId.appendChild(paymentData);

        }


      });

  })
}

function validations() {

  let saleProductQuantity = document.querySelector("#sale_product-quantity");
  let saleProductUnitary = document.querySelector("#sale_product-unitary");
  let saleProductTotal = document.querySelector("#sale_product-total");

  function atualizaTotal() {
    saleProductTotal.value = saleProductQuantity.value * saleProductUnitary.value;
  }

  saleProductQuantity.addEventListener("blur", atualizaTotal);
  saleProductUnitary.addEventListener("blur", atualizaTotal);

}

function insertProduct() {

  let saleProductSubmit = document.querySelector("#sale_product-submit");

  saleProductSubmit.addEventListener("click", function() {

    let addModalFormSaleProduct = document.querySelector("#add-modal-form-sale_product");
    let formData = new FormData(addModalFormSaleProduct);

    formData.append("type", "insert-sale_product");
    
    sendResquest("./actions/sale.php", "post", formData)
    .then(function(data) {

      let saleProductTable = document.querySelector("#sale_product-table tbody");
      let saleTotal = document.querySelector("#sale-total");

        saleProductTable.innerHTML = "";
        saleTotal.value = 0;
        
        for(const p of data) {
  
          let tr = saleProductTable.insertRow(0);
          let td1 = tr.insertCell(0);
          let td2 = tr.insertCell(1);
          let td3 = tr.insertCell(2);
          let td4 = tr.insertCell(3);
          let td5 = tr.insertCell(4);

  
          td1.innerHTML = p.name;
          td2.innerHTML = p.quantity;
          td3.innerHTML = p.unitary;
          td4.innerHTML = p.total;
          td5.innerHTML = `
          <div class="submit-container">
            <div class="btn-icon">
              <button type="button" onclick="deleteSaleProductId(${p.produto_venda}, ${p.venda})">
                <span class="material-icons-outlined --hover-to-white">
                  delete
                </span>
              </button>
            </div>
          </div>
          `;

          updateTotalProduct(p.total); 
        }

    });
    
  });

}

function insertPayment() {

  let salePaymentSubmit = document.querySelector("#sale_payment-submit");

  salePaymentSubmit.addEventListener("click", function() {

    let addModalFormSalePayment = document.querySelector("#add-modal-form-sale_payment");
    let formData = new FormData(addModalFormSalePayment);

    formData.append("type", "insert-sale_payment");
    
    sendResquest("./actions/sale.php", "post", formData)
    .then(function(data) {

      let salePaymentTable = document.querySelector("#sale_payment-table tbody");

        salePaymentTable.innerHTML = "";
        
        for(const p of data) {
  
          let tr = salePaymentTable.insertRow(0);
          let td1 = tr.insertCell(0);
          let td2 = tr.insertCell(1);
          let td3 = tr.insertCell(2);

  
          td1.innerHTML = p.name;
          td2.innerHTML = p.total;
          td3.innerHTML = `
          <div class="submit-container">
            <div class="btn-icon">
              <button type="button" onclick="deleteSalePaymentId(${p.pagamento_venda}, ${p.venda})">
                <span class="material-icons-outlined --hover-to-white">
                  delete
                </span>
              </button>
            </div>
          </div>
          `;

        }

    });
    
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

function currentDate() {

  let currentDate = new Date()
  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()

  currentDate = year + "." + month + "." + day;

  return currentDate;
}

function deleteSaleProductId(id, sale) {

  formData = new FormData();
  formData.append("type", "delete-sale_product");
  formData.append("id", id);
  formData.append("sale", sale);

  sendResquest("./actions/sale.php", "post", formData)
    .then(function(data) {

      let saleProductTable = document.querySelector("#sale_product-table tbody");
      let saleTotal = document.querySelector("#sale-total");

      saleProductTable.innerHTML = "";
      saleTotal.value = 0;

      console.log(data);
      
      for(const p of data) {

        console.log(p);

        let tr = saleProductTable.insertRow(0);
        let td1 = tr.insertCell(0);
        let td2 = tr.insertCell(1);
        let td3 = tr.insertCell(2);
        let td4 = tr.insertCell(3);
        let td5 = tr.insertCell(4);


        td1.innerHTML = p.name;
        td2.innerHTML = p.quantity;
        td3.innerHTML = p.unitary;
        td4.innerHTML = p.total;
        td5.innerHTML = `
        <div class="submit-container">
          <div class="btn-icon">
            <button type="button" onclick="deleteSaleProductId(${p.produto_venda}, ${p.venda})">
              <span class="material-icons-outlined --hover-to-white">
                delete
              </span>
            </button>
          </div>
        </div>
        `;

        updateTotalProduct(p.total); 
      } 

    });  
}

function deleteSalePaymentId(id, sale) {

  formData = new FormData();
  formData.append("type", "delete-sale_payment");
  formData.append("id", id);
  formData.append("sale", sale);

  sendResquest("./actions/sale.php", "post", formData)
    .then(function(data) {

      let salePaymentTable = document.querySelector("#sale_payment-table tbody");
      salePaymentTable.innerHTML = "";

      console.log(data);
      
      for(const p of data) {

        console.log(p);

        let tr = salePaymentTable.insertRow(0);
        let td1 = tr.insertCell(0);
        let td2 = tr.insertCell(1);
        let td3 = tr.insertCell(2);



        td1.innerHTML = p.name;
        td2.innerHTML = p.total;
        td3.innerHTML = `
        <div class="submit-container">
          <div class="btn-icon">
            <button type="button" onclick="deleteSalePaymentId(${p.pagamento_venda}, ${p.venda})">
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

function deleteSaleId(id) {

  formData = new FormData();
  formData.append("type", "delete-sale");
  formData.append("id", id);

  sendResquest("./actions/sale.php", "post", formData)
    .then(function(data) {

      let dataTable = document.querySelector("#data-table tbody");
      dataTable.innerHTML = "";

      for(const p of data) {

        let tr = dataTable.insertRow(0);
        let td1 = tr.insertCell(0);
        let td2 = tr.insertCell(1);
        let td3 = tr.insertCell(2);
        let td4 = tr.insertCell(3);
        let td5 = tr.insertCell(4);

        td1.innerHTML = p.id;
        td2.innerHTML = p.name;
        td3.innerHTML = p.date;
        td4.innerHTML = p.total;
        td5.innerHTML = `
        <div class="submit-container">
          <div class="btn-icon">
            <button onclick="deleteSaleId(${p.id})">
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

function updateTotalProduct(newTotal) {
  
  let saleTotal = document.querySelector("#sale-total");
  saleTotal.value = parseFloat(newTotal) + parseFloat(saleTotal.value);
  
}

function getAll() {

  const formData = new FormData();
  formData.append("type", "searchAll");

  sendResquest("./actions/sale.php", "post", formData)
    .then(function(data) {
      
      let dataTable = document.querySelector("#data-table tbody");
      dataTable.innerHTML = "";

      for(const p of data) {

        console.log(p);

        let tr = dataTable.insertRow(0);
        let td1 = tr.insertCell(0);
        let td2 = tr.insertCell(1);
        let td3 = tr.insertCell(2);
        let td4 = tr.insertCell(3);
        let td5 = tr.insertCell(4);

        td1.innerHTML = p.id;
        td2.innerHTML = p.name;
        td3.innerHTML = p.date;
        td4.innerHTML = p.total;
        td5.innerHTML = `
        <div class="submit-container">
          <div class="btn-icon">
            <button onclick="deleteSaleId(${p.id})">
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

    sendResquest("./actions/sale.php", "post", formData)
      .then(function(data) {

        console.log(data);

        let dataTable = document.querySelector("#data-table tbody");
        dataTable.innerHTML = "";

        for(const p of data) {

          let tr = dataTable.insertRow(0);
          let td1 = tr.insertCell(0);
          let td2 = tr.insertCell(1);
          let td3 = tr.insertCell(2);
          let td4 = tr.insertCell(3);
          let td5 = tr.insertCell(4);

          td1.innerHTML = p.id;
          td2.innerHTML = p.name;
          td3.innerHTML = p.date;
          td4.innerHTML = p.total;
          td5.innerHTML = `
          <div class="submit-container">
            <div class="btn-icon">
              <button onclick="deleteSaleId(${p.id})">
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

function save() {
  let addModalConfirmBtn = document.querySelector("#add-modal-confirm-btn");
  
  addModalConfirmBtn.addEventListener("click", function() {
    let saleTotal = document.querySelector("#sale-total").value;
    let saleClientId = document.querySelector("#sale-client_id").value;
    let saleId = document.querySelector("#sale-id").value;

    console.log(saleTotal, saleClientId);

    formData = new FormData();
    formData.append("type", "update-sale");
    formData.append("client_id", saleClientId);
    formData.append("total", saleTotal);
    formData.append("id", saleId);

    sendResquest("./actions/sale.php", "post", formData)
      .then(function(data) {
        console.log(data);
      });

    let table = document.querySelector("#data-table");
    let addModal = document.querySelector("#add-modal");

    getAll();

    addModal.classList.add("--display-none");
    table.classList.remove("--display-none");  

  });
}

window.addEventListener("load", function() {
  insert();
  validations();
  insertProduct();
  insertPayment();
  save();
  getAll();
  search();
});