<?php

class Sale {

  public $id;
  public $date;
  public $client_id;
  public $total;

  public function __construct($conn) {
    $this->conn = $conn;
  }

  public function insert($data) {


    $sql = "INSERT INTO sale(date) VALUES(:date)";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":date", $data['date']);
    $stmt->execute();

    $lastId = $this->conn->lastInsertId();

    $sql = "SELECT * FROM sale WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $lastId);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);

  }

  public function insertSaleProduct($data) {

    $sql = "INSERT INTO `sale_product`(`sale_id`, `product_id`, `quantity`, `unitary`, `total`)
            VALUES (:sale_id, :product_id, :quantity, :unitary, :total)";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindParam(":sale_id", $data['sale_product-sale_id']);
    $stmt->bindParam(":product_id", $data['sale_product-product_id']);
    $stmt->bindParam(":quantity", $data['sale_product-quantity']);
    $stmt->bindParam(":unitary", $data['sale_product-unitary']);
    $stmt->bindParam(":total", $data['sale_product-total']);

    $stmt->execute();

    $sql = "SELECT s.id venda, p.id produto, sp.id produto_venda, p.name, sp.quantity, sp.unitary, sp.total
      FROM sale_product sp, product p, sale s
      WHERE p.id = sp.product_id
      AND s.id = sp.sale_id
      AND s.id = :sale_id";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindParam(":sale_id", $data['sale_product-sale_id']);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);

  }

  public function insertSalePayment($data) {

    $sql = "INSERT INTO `sale_payment`(`sale_id`, `payment_id`, `total`)
            VALUES (:sale_id, :payment_id, :total)";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindParam(":sale_id", $data['sale_payment-sale_id']);
    $stmt->bindParam(":payment_id", $data['sale_payment-payment_id']);
    $stmt->bindParam(":total", $data['sale_payment-total']);

    $stmt->execute();

    $sql = "SELECT s.id venda, p.id pagamento, sp.id pagamento_venda, p.name, sp.total
      FROM sale_payment sp, payment p, sale s
      WHERE p.id = sp.payment_id
      AND s.id = sp.sale_id
      AND s.id = :sale_id";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindParam(":sale_id", $data['sale_payment-sale_id']);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);

  }

  public function update($data) {
    $sql = "UPDATE sale SET client_id = :client_id, total = :total WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":client_id", $data['client_id']);
    $stmt->bindParam(":total", $data['total']);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();

    return ['ok' => true];
  }

  public function getAll() {
    
    $sql = "SELECT s.id, c.name, s.date, s.total FROM sale s, client c WHERE c.id = s.client_id";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    $salesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $salesData;
    
  }

  // herdado
  public function search($data) {

    $sql = "SELECT s.id, c.name, s.date, s.total 
            FROM sale s, client c 
            WHERE c.id = s.client_id";

    
    if(!empty($data['id'])) {

      $sql = $sql . "  AND s.id = :id";
      
    }
    
    if(!empty($data['client'])) {

      $name = $data['client'];
      $sql = $sql . " AND c.name LIKE '%$name%'";

    }

    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();

    $salesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return $salesData;

  }

  public function deleteProduct($data) {

    $sql = "DELETE FROM sale_product WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();


    $sql = "SELECT s.id venda, p.id produto, sp.id produto_venda, p.name, sp.quantity, sp.unitary, sp.total
            FROM sale_product sp, product p, sale s
            WHERE p.id = sp.product_id
            AND s.id = sp.sale_id
            AND s.id = :sale_id";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindParam(":sale_id", $data['sale']);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);

  }

  public function deletePayment($data) {

    $sql = "DELETE FROM sale_payment WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();


    $sql = "SELECT s.id venda, p.id pagamento, sp.id pagamento_venda, p.name, sp.total
            FROM sale_payment sp, payment p, sale s
            WHERE p.id = sp.payment_id
            AND s.id = sp.sale_id
            AND s.id = :sale_id";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindParam(":sale_id", $data['sale']);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);

  }

  public function deleteSale($data) {

    $sql = "DELETE FROM sale_product WHERE sale_id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();

    $sql = "DELETE FROM sale_payment WHERE sale_id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();

    $sql = "DELETE FROM sale WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":id", $data['id']);
    $stmt->execute();


    return $this->getAll();

  }

}