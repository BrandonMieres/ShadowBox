<?php
require_once 'config.php';
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Panel de Administración</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
  <h1>🔧 Panel de Administración</h1>
  <p>👤 Usuario: <strong><?= htmlspecialchars($_SESSION['username']); ?></strong></p>
  <p><a href="logout.php">Cerrar sesión</a></p>

  <h3>Buscar Máquinas</h3>
  <form method="GET">
    <input type="text" name="query" placeholder="Buscar por nombre..." value="<?= isset($_GET['query']) ? htmlspecialchars($_GET['query']) : '' ?>">
  </form>

<?php
if (isset($_GET['query'])) {
    $search = $_GET['query'];
    $sql = "SELECT * FROM maquinas WHERE nombre ILIKE '%$search%'";
    $result = pg_query($conn, $sql);

    echo "<h3>Resultados:</h3>";
    if (!$result) {
        echo "<div class='error'>Error: " . htmlspecialchars(pg_last_error($conn)) . "</div>";
    } else {
        echo "<table><tr><th>Nombre</th><th>Flag</th></tr>";
        while ($row = pg_fetch_assoc($result)) {
            echo "<tr><td>" . htmlspecialchars($row['nombre']) . "</td><td><code>" . htmlspecialchars($row['respuesta']) . "</code></td></tr>";
        }
        echo "</table>";
    }
}
?>

  <div class="hint">
    💡 <strong>Pista:</strong> ¿Y si buscas algo como <code>' OR '1'='1</code>?
  </div>
</div>
</body>
</html>
