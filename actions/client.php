<?php

require_once("../class/Client.php");
require_once("../class/Connection.php");

$client = new Client(Connection::conn());

if(isset($_POST['type']) && !empty($_POST['type'])) {

  if($_POST['type'] == "insert"){

    $client->insert($_POST);
    
    echo json_encode($client->getAll());

  }

  if($_POST['type'] == "search"){

    echo json_encode($client->search($_POST));

  }

  if($_POST['type'] == "delete"){

    $client->delete($_POST);

    echo json_encode($client->getAll());

  }

  if($_POST['type'] == "searchAll"){

    echo json_encode($client->getAll());

  }
  
}