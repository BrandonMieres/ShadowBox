<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>ShadowBox</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <h1>Bienvenido a <strong>ShadowBox</strong></h1>
    <p>🔐 Plataforma de entrenamiento en seguridad ofensiva.</p>
    <nav>
      <a href="login.php">Iniciar Sesión</a>
    </nav>

    <?php include 'status.php'; ?>

    <div class="hint">
      <p>💡 <strong>Pista:</strong> ¿Te has fijado en las cabeceras o la versión de PHP? Tal vez puedas usarlas...</p>
      <p>💡 <strong>Pista inicial:</strong> Algunas páginas están "mal configuradas"... ¿estás preparado para aprovecharlo?</p>
    </div>
  </div>
</body>
</html>
