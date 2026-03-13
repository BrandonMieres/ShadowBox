<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <title>Crypto Sentinel - Login</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <h1>Login Segur <small>(o no?)</small></h1>

    <form method="POST" action="login.php">
      <label for="username">Usuari:</label>
      <input type="text" name="username" id="username" required>

      <label for="password">Contrasenya:</label>
      <input type="password" name="password" id="password" required>

      <input type="submit" value="Entrar">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $conn = new mysqli("db", "crypto", "crypto123", "crypto_db");

        if ($conn->connect_error) {
            echo "<p class='error'>Error de connexió: " . $conn->connect_error . "</p>";
        } else {
            $user = $_POST['username'];
            $pass = md5($_POST['password']);

            $stmt = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
            $stmt->bind_param("ss", $user, $pass);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 1) {
                echo "<p class='success'>✅ Benvingut, <strong>$user</strong>!</p>";
                echo "<pre class='flag'>";
                @readfile("flag.txt");
                echo "</pre>";
            } else {
                echo "<p class='error'>❌ Credencials incorrectes</p>";
            }

            $stmt->close();
            $conn->close();
        }
    }
    ?>
  </div>
</body>
</html>
