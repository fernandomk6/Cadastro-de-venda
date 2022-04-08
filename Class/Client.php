<?php 

class Client {

  public $id;
  public $name;
  public $conn;

  public function __construct($conn) {
    $this->conn = $conn;
  }

  public function insert($data) {

    $sql = "INSERT INTO client (name) VALUES(:name)";

    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":name", $data['name']);
    $stmt->execute();
  }

  public function getAll() {

    $sql = "SELECT * FROM client";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $clientData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $clientData;
  }

  public function search($data) {

    $sql = "SELECT * FROM client WHERE 1 = 1";

    if(!empty($data['id'])) {
      $sql = $sql . " AND id = :id";
    }
    
    if(!empty($data['name'])) {
      
      $name = $data['name'];
      $sql = $sql . " AND name LIKE '%$name%'";

    }

    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();

    $clientData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $clientData;

  }

  public function delete($data) {

    $sql = "DELETE FROM client WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();

  }
}