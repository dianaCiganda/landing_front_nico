<?php
// config/database.php
// CAMBIA ESTOS DATOS POR LOS TUYOS

$host = 'sql211.infinityfree.com';
$dbname = 'if0_42247678_nicoagus_db';
$username = 'if0_42247678';     
$password = 'vvoLbnnCfiGGGc';          

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    // Log del error para depuración
    error_log("Error de conexión: " . $e->getMessage());
    
    // Si es una petición AJAX, devolver JSON
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') {
        header('Content-Type: application/json');
        echo json_encode([
            "success" => false,
            "message" => "Error de conexión a la base de datos"
        ]);
        exit;
    }
    
    // Si es navegador directo, mostrar mensaje
    die("<h2>Error de conexión a la base de datos</h2><p>Por favor, intenta más tarde.</p>");
}
?>