<?php
    function connect(){
        $conn = mysqli_connect($servername="localhost", $username="root", $password="", $dbname="dugsiiye");
        if(!$conn) die("Connection failed");
        return $conn;
    }
?>