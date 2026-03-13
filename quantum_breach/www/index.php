<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <title>Quantum Breach</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <h2>🔍 Eina de Diagnòstic de Xarxa</h2>

    <form method="get">
      <label for="ip">IP a fer ping:</label>
      <input type="text" name="ip" id="ip" placeholder="127.0.0.1" required>
      <input type="submit" value="Enviar">
    </form>

    <?php
    if (isset($_GET['ip'])) {
        $ip = $_GET['ip'];
        echo "<pre>";
        system("ping -c 1 " . $ip);
        echo "</pre>";
    }
    ?>
  </div>
</body>
</html>
