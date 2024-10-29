<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "yourUSERNAME";
$password = "yourPASSWORD";
$dbname = "MusicDB"; //数据库名称，自己依据实际来

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 获取查询参数
$listName = $_GET['listName'] ?? '默认';

// 根据listName查询音乐信息
if ($listName === '默认') {
    $sql = "SELECT * FROM music";
} else {
    $sql = "SELECT * FROM music WHERE list_name = '{$listName}'";
}

$result = $conn->query($sql);

$response = array();
if ($result->num_rows > 0) {
    // 输出每行数据
    while($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
} else {
    $response = array();
}
$conn->close();

echo json_encode($response);
?>