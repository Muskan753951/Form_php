<?php
require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method"
    ]);
    exit;
}

$gmail = trim($_POST["gmail"] ?? "");
$name  = trim($_POST["name"]  ?? "");
$age   = (int) ($_POST["age"]  ?? 0);

if (empty($gmail) || empty($name) || $age < 1) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO users (gmail, name, age) VALUES (?, ?, ?)");
if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("ssi", $gmail, $name, $age);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Data saved successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Execute error: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>