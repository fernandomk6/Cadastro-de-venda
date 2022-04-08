<?php

class Product {

  public $id;
  public $name;
  public $conn;

  public function __construct($conn) {
    $this->conn = $conn;

  }

  public function insert($data) {

    $sql = "INSERT INTO product(name) VALUES(:name)";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":name", $data['name']);

    $stmt->execute();

  }

  public function getAll() {
    
    $sql = "SELECT * FROM product";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $productsData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $productsData;
    
  }

  public function search($data) {

    $sql = "SELECT * FROM product WHERE 1 = 1";

    
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

    $productsData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $productsData;

  }

  public function delete($data) {

    $sql = "DELETE FROM product WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();

  }

}