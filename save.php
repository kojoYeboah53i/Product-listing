<?php 

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
header("Access-Control-Allow-Methods: GET, POST, DELETE, UPDATE");

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
    /*
    //get all producta details
    $trp = mysqli_query($conn, "SELECT * from products");
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
    */
//Get single product details
if(isset($_POST['productid']))
{
    $trp = mysqli_query($conn, "SELECT * from products where id =".$_POST['productid']);
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}
else
{
    //get all products details
    $trp = mysqli_query($conn, "SELECT * from products");
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}
   /* $get = [];
    $sql = "SELECT * from products";
    $result = mysqli_query($conn, $sql);
    if($result)
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $get[$cr]['ptitle'] = $row['ptitle'];
            $get[$cr]['pprice'] = $row['pprice'];
            $get[$cr]['pimage'] = $row['pimage'];
            $get[$cr]['pdescription'] = $row['pdescription'];
            $cr++;
        }
        echo json_encode($get);
    }
    else
    {
        http_response_code(404);
    }
*/
?>




