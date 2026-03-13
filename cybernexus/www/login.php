<?php
require_once 'config.php';
session_start();
$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Vulnerabilidad intencionada: sin saneamiento
    $query = "SELECT * FROM maquinas WHERE nombre = '$username' AND respuesta = '$password'";
    $result = pg_query($conn, $query);

    if ($result && pg_num_rows($result) > 0) {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header("Location: admin.php");
        exit;
    } else {
        $error = "❌ Usuario o contraseña incorrectos.";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <h2>Iniciar Sesión</h2>
    <?php if ($error): ?>
      <div class="error"><?= htmlspecialchars($error); ?></div>
    <?php endif; ?>
    <form method="post">
      <label>Usuario:</label>
      <input type="text" name="username" required>
      <label>Contraseña:</label>
      <input type="password" name="password" required>
      <input type="submit" value="Iniciar Sesión">
    </form>
    <div class="hint">
      <p>💡 <strong>Pista:</strong> ¿Qué sucede si el usuario introduce caracteres especiales?</p>
    </div>
  </div>
</body>
</html>
