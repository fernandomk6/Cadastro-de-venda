<?php

require_once("../class/Product.php");
require_once("../class/Connection.php");

$product = new Product(Connection::conn());

if(isset($_POST['type']) && !empty($_POST['type'])) {

  if($_POST['type'] == "insert"){

    $product->insert($_POST);
    
    echo json_encode($product->getAll());

  }

  if($_POST['type'] == "search"){

    echo json_encode($product->search($_POST));

  }

  if($_POST['type'] == "delete"){

    $product->delete($_POST);

    echo json_encode($product->getAll());

  }

  if($_POST['type'] == "searchAll"){

    echo json_encode($product->getAll());

  }
  
}