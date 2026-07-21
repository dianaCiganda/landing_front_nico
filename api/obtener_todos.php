<?php
// api/obtener_todos.php (PARA EL PANEL DE ADMIN)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../config/database.php';

try {
    $sql = "SELECT id, nombre, apellido, comentario, 
            DATE_FORMAT(fecha, '%d/%m/%Y %H:%i') as fecha,
            aprobado
            FROM comentarios 
            ORDER BY fecha DESC";
    
    $stmt = $pdo->query($sql);
    $comentarios = $stmt->fetchAll();
    
    echo json_encode($comentarios);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>