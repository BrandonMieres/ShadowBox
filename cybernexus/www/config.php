<?php
if (!extension_loaded('pgsql')) {
    die('ERROR: Extensión PostgreSQL no instalada');
}

// Configuración de PostgreSQL usando variables de Ansible
$db_host = 'vulnerable_db';
$db_user = 'postgres';
$db_pass = 'ShadowBox123!';
$db_name = 'shadow_db';

try {
    $conn = pg_connect(
        "host=$db_host " .
        "dbname=$db_name " .
        "user=$db_user " .
        "password=$db_pass"
    );
    
    if (!$conn) {
        throw new Exception(pg_last_error());
    }
} catch (Exception $e) {
    echo "Error de conexión: " . $e->getMessage();
    exit;
}
?>
