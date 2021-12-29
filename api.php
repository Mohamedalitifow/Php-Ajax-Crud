<?php

header("Content-type: application/json");
require_once('./conn.php');
$conn = connect();

//readAll Function
//Insert Function
//Update Function
//Delete Function

//POST
$action = $_POST['action']; // that action could be CREATE,READ, UPDATE OR DELETE actions
$tbl = isset($_POST['tbl']) ? $_POST['tbl'] : 'student';
function readAll($conn, $tbl)
{
    $data = array();
    $message = array();

    $sql = "SELECT * FROM $tbl";
    $result = mysqli_query($conn, $sql);

    if (!$result);
    if ($result) :
        while ($row = mysqli_fetch_object($result)) {
            $data[] = $row;
        }
        $message = array("status" => true, "data" => $data);
    else :
        $message = array("status" => false, "data" => mysqli_error($conn));
    endif;

    echo json_encode($message);
}

function readStudentInfo($conn){
    $data = array();
    $message = array();
    $id = $_POST['id'];

    $sql = "SELECT * FROM student WHERE id= '$id' ";
    $result = mysqli_query($conn, $sql);

    if (!$result);
    if ($result) :
        while ($row = mysqli_fetch_object($result)) {
            $data[] = $row;
        }
        $message = array("status" => true, "data" => $data);
    else :
        $message = array("status" => false, "data" => mysqli_error($conn));
    endif;

    echo json_encode($message);
}
function deleteStudent($conn)
{
    $data = array();
    $message = array();
    $id = $_POST['id'];

    $sql = "DELETE FROM student WHERE id= '$id' ";
    $result = mysqli_query($conn, $sql);

    if (!$result);
    if ($result) :
        
        $message = array("status" => true, "data" => $data);
    else :
        $message = array("status" => false, "data" => mysqli_error($conn));
    endif;

    echo json_encode($message);
}


function registerStudent($conn)
{

    $data = array();

    $name = $_POST['studentName'];
    $class = $_POST['studentClass'];

    $query = "INSERT INTO student(name, class)
        VALUES  ('$name', '$class')";
    $result = mysqli_query($conn, $query);

    if (!$result) :
        $data = array("status" => false, "data" => mysqli_error($conn));
    else :
        $data = array("status" => true, "data" => "registered successfully");
    endif;

    echo json_encode($data);
}

function updateStudent($conn)
{
    $id = $_POST['id'];
    $name = $_POST['studentName'];
    $class = $_POST['studentClass'];

    $data = array();

    $query = "UPDATE student SET name = '$name', class = '$class' WHERE id = $id";

    $result = mysqli_query($conn, $query);

    if (!$result) :
        $data = array("status" => false, "data" => mysqli_error($conn));
    else :
        $data = array("status" => true, "data" => "Updated successfully");
    endif;

    echo json_encode($data);
}


if (isset($action)) :
    if ($action == "readAll") :
        $action($conn, $tbl);
    else :
        $action($conn);
    endif;
else :
    echo "Action Required....";
endif;
