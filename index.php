<?php

require_once "vendor/autoload.php";

use app\Db;

$db = Db::getInstance();

if (isset($_POST['ajax']) && $_POST['input']) {
    $query = 'SELECT name FROM languages WHERE name LIKE "%' .
        $_POST['input'] . '%"';
    $stmt = $db->query($query);
    $data = $stmt->fetchAll();
    $arr = [];

    foreach ($data as $elem) {
        $arr[] = $elem['name'];
    }

    echo json_encode($arr);
    die;
}

include "templates/autocomplete.html";