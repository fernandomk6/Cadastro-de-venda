<?php

require_once("../class/Payment.php");
require_once("../class/Connection.php");

$payment = new Payment(Connection::conn());

if(isset($_POST['type']) && !empty($_POST['type'])) {

  if($_POST['type'] == "insert"){

    $payment->insert($_POST);
    
    echo json_encode($payment->getAll());

  }

  if($_POST['type'] == "search"){

    echo json_encode($payment->search($_POST));

  }

  if($_POST['type'] == "delete"){

    $payment->delete($_POST);

    echo json_encode($payment->getAll());

  }

  if($_POST['type'] == "searchAll"){

    echo json_encode($payment->getAll());

  }
  
}