<?php
// api/guardar_comentario.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['nombre']) || empty($data['apellido']) || empty($data['comentario'])) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
    exit;
}

$nombre = htmlspecialchars(strip_tags(trim($data['nombre'])));
$apellido = htmlspecialchars(strip_tags(trim($data['apellido'])));
$comentario = htmlspecialchars(strip_tags(trim($data['comentario'])));

// Palabras ofensivas
$ofensivas = ['puta', 'puto', 'mierda', 'coño', 'cabrón', 'idiota', 'estúpido', 'imbécil', 'pendejo', 'pendeja', 'boludo', 'pelotudo', 'gilipollas', 'joder', 'hostia', 'maricon', 'zorra', 'carajo', 'cojones', 'fuck', 'shit', 'bitch', 'asshole', 'bastard'];
foreach ($ofensivas as $palabra) {
    $comentario = str_ireplace($palabra, '****', $comentario);
}

try {
    $sql = "INSERT INTO comentarios (nombre, apellido, comentario) VALUES (:nombre, :apellido, :comentario)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nombre' => $nombre,
        ':apellido' => $apellido,
        ':comentario' => $comentario
    ]);
    
    echo json_encode(['success' => true, 'message' => 'Comentario guardado con éxito']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>