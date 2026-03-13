<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Búsqueda</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <h2>Búsqueda de Máquinas</h2>
    <p>⚠️ Esta página es vulnerable a SQL injection deliberadamente para el CTF</p>
    <form method="get">
      <input type="text" name="q" placeholder="Buscar máquina..." required>
    </form>

    <?php
    if (isset($_GET['q'])) {
        $search = $_GET['q'];
        $query = "SELECT * FROM maquinas WHERE nombre ILIKE '%$search%'";
        $result = pg_query($conn, $query);

        echo "<h3>Resultados:</h3>";
        if ($result && pg_num_rows($result) > 0) {
            echo "<table><tr><th>Nombre</th><th>Flag</th></tr>";
            while ($row = pg_fetch_assoc($result)) {
                echo "<tr><td>" . htmlspecialchars($row['nombre']) . "</td><td>" . htmlspecialchars($row['respuesta']) . "</td></tr>";
            }
            echo "</table>";
        } else {
            echo "<p class='error'>⚠️ No se encontraron resultados o error en la consulta.</p>";
        }
    }
    ?>

    <div class="hint">
      <p>💡 <strong>Pista:</strong> ¿Te gustaría ver todos los datos de una sola vez?</p>
    </div>
  </div>
</body>
</html>
