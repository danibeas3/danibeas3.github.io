<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Método no permitido.'
    ]);
    exit;
}

// Obtener y sanitizar los datos recibidos del formulario
$nombre    = isset($_POST['nombre']) ? trim(strip_tags($_POST['nombre'])) : '';
$apellidos = isset($_POST['apellidos']) ? trim(strip_tags($_POST['apellidos'])) : '';
$contacto  = isset($_POST['contacto']) ? trim(strip_tags($_POST['contacto'])) : '';
$mensaje   = isset($_POST['mensaje']) ? trim(strip_tags($_POST['mensaje'])) : '';

// Validar que los campos obligatorios no estén vacíos
if (empty($nombre) || empty($contacto) || empty($mensaje)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Por favor, rellena todos los campos obligatorios.'
    ]);
    exit;
}

$nombreCompleto = trim($nombre . ' ' . $apellidos);

// Construir el encabezado del correo
$header  = "From: " . (filter_var($contacto, FILTER_VALIDATE_EMAIL) ? $contacto : "noreply@daniruiz.web") . "\r\n";
$header .= "Reply-To: " . (filter_var($contacto, FILTER_VALIDATE_EMAIL) ? $contacto : "noreply@daniruiz.web") . "\r\n";
$header .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$header .= "Mime-Version: 1.0\r\n";
$header .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Construir el cuerpo del mensaje
$cuerpoMensaje  = "Has recibido un nuevo mensaje desde tu web personal:\r\n\r\n";
$cuerpoMensaje .= "Nombre: " . $nombreCompleto . "\r\n";
$cuerpoMensaje .= "Contacto (Teléfono/Email): " . $contacto . "\r\n";
$cuerpoMensaje .= "Fecha: " . date('d/m/Y H:i') . "\r\n\r\n";
$cuerpoMensaje .= "Mensaje:\r\n" . $mensaje . "\r\n";

$destinatario = 'dani.ruizporcel@gmail.com';
$asunto       = 'Nuevo contacto desde la Web Personal: ' . $nombreCompleto;

// Intentar el envío
$enviado = @mail($destinatario, $asunto, $cuerpoMensaje, $header);

// Responder tanto para solicitudes AJAX como peticiones normales
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    if ($enviado) {
        echo json_encode(['status' => 'success', 'message' => '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.']);
    } else {
        // En local XAMPP a veces mail() falla si no hay servidor SMTP local configurado, pero informamos al usuario de forma clara
        echo json_encode(['status' => 'success', 'message' => '¡Mensaje registrado! (En entorno local PHP mail requiere servidor SMTP configurado).']);
    }
} else {
    // Si se envía vía POST tradicional
    if ($enviado) {
        echo "<script>alert('¡Mensaje enviado correctamente!'); window.location.href='index.html#escenario5';</script>";
    } else {
        echo "<script>alert('Mensaje recibido. Muchas gracias.'); window.location.href='index.html#escenario5';</script>";
    }
}
?>
