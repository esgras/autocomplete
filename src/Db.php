<?php

namespace app;

class Db
{
    private static $instance;

    public static function getInstance() {
        if (empty(self::$instance)) {
            $dsn = 'mysql:host=localhost;dbname=autocomplete;charset=utf8';
            $options = [
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
            ];

            self::$instance = new \PDO($dsn, 'root', 'asdf', $options);
        }

        return self::$instance;
    }
}