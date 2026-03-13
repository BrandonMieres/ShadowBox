<?php
$db_status = "Desconocido";
try {
    if (isset($conn) && $conn) {
        $test_query = pg_query($conn, "SELECT 1");
        $db_status = $test_query ? "✅ Conectado" : "❌ Error: " . pg_last_error($conn);
    } else {
        $db_status = "❌ No conectado";
    }
} catch (Exception $e) {
    $db_status = "❌ Error: " . $e->getMessage();
}
?>
<div class="status-panel">
  <h3>📊 Estado del Sistema</h3>
  <p><strong>Base de datos:</strong> <?= $db_status; ?></p>
  <p><strong>PHP:</strong> <?= phpversion(); ?></p>
  <p><strong>Servidor:</strong> <?= $_SERVER['SERVER_SOFTWARE']; ?></p>
</div>

<div class="hint">
  💡 <strong>Pista:</strong> A veces, las versiones revelan más de lo que deberían...
</div>
