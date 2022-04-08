<?php

require_once("../class/Sale.php");
require_once("../class/Connection.php");

$sale = new Sale(Connection::conn());

if(isset($_POST['type']) && !empty($_POST['type'])) {

  if($_POST['type'] == "insert-sale"){
    
    echo json_encode($sale->insert($_POST));
    
  }

  if($_POST['type'] == "insert-sale_product"){
    
    echo json_encode($sale->insertSaleProduct($_POST));
    
  }

  if($_POST['type'] == "insert-sale_payment"){
    
    echo json_encode($sale->insertSalePayment($_POST));
    
  }

  if($_POST['type'] == "delete-sale_product"){

    echo json_encode($sale->deleteProduct($_POST));

  }

  if($_POST['type'] == "delete-sale_payment"){

    echo json_encode($sale->deletePayment($_POST));

  }

  if($_POST['type'] == "update-sale"){

    echo json_encode($sale->update($_POST));

  }

  if($_POST['type'] == "searchAll"){

    echo json_encode($sale->getAll($_POST));

  }

  if($_POST['type'] == "delete-sale"){

    echo json_encode($sale->deleteSale($_POST));

  }

  if($_POST['type'] == "search"){

    echo json_encode($sale->search($_POST));

  }

  
};