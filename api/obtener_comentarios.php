<?php
// api/obtener_comentarios.php (SOLO COMENTARIOS APROBADOS)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../config/database.php';

try {
    $sql = "SELECT nombre, apellido, comentario, 
            DATE_FORMAT(fecha, '%d/%m/%Y %H:%i') as fecha 
            FROM comentarios 
            WHERE aprobado = 1
            ORDER BY fecha DESC 
            LIMIT 20";
    
    $stmt = $pdo->query($sql);
    $comentarios = $stmt->fetchAll();
    
    echo json_encode($comentarios);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>