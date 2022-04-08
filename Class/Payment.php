<?php 

class Payment {

  public $id;
  public $name;
  public $conn;

  public function __construct($conn) {
    $this->conn = $conn;
  }

  public function insert($data) {

    $sql = "INSERT INTO payment (name) VALUES(:name)";

    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":name", $data['name']);
    $stmt->execute();
  }

  public function getAll() {

    $sql = "SELECT * FROM payment";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $paymentData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $paymentData;
  }

  public function search($data) {

    $sql = "SELECT * FROM payment WHERE 1 = 1";

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

    $paymentData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $paymentData;

  }

  public function delete($data) {

    $sql = "DELETE FROM payment WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();

  }
}