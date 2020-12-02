<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
header("Access-Control-Allow-Methods: GET, POST, DELETE, UPDATE");


    $target_dir = "uploads/"; //image upload folder name
    $target_file = $target_dir . basename($_FILES["productimage"]["name"]);
    //moving multiple images inside folder
    if (move_uploaded_file($_FILES["productimage"]["tmp_name"], $target_file)) {
    
        $servername = "localhost";
        $username   = "root";
        $password   = "";
        $dbname     = "ecommerce";
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        $sql = "INSERT INTO products (ptitle, pprice, pimage, pdescription)
        VALUES ('".$_POST['productname']."', '".$_POST['productprice']."', '".$_FILES['productimage']['name']."', '".$_POST['productdesc']."')";
        if (mysqli_query($conn,$sql)) {
        $data = array("data" => "You Data added successfully");
        echo json_encode($data);
        } else {
        $data = array("data" => "Error: " . $sql . "<br>" . $conn->error);
        echo json_encode($data);
        }
    } else {
        $data = array("data" => "Sorry, there was an error uploading your file.");
   
    }
?>
