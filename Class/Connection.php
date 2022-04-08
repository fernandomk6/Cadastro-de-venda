<?php

class Connection {

  static function conn() {

    $server = 'localhost';
    $user = 'root';
    $password = '';
    $database = 'datafile';

    $conn = new PDO("mysql:host=$server;dbname=$database", $user, $password);

    return $conn;

  }

}