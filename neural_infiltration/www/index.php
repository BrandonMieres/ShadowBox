<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <title>Neural Infiltration</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <h1>🧠 Neural Infiltration</h1>
    <p class="subtitle">Visor de fitxers interns</p>

    <form method="get">
      <label for="page">🗂️ Arxiu:</label>
      <input type="text" name="page" id="page" placeholder="home">
      <input type="submit" value="Carregar">
    </form>

    <hr>
    <div class="status-panel">
      <?php
        $page = $_GET['page'] ?? 'home';
        @include("pages/" . $page . ".php");
      ?>
    </div>

    <div class="hint">
      <p>💡 Pista: I si intentessis carregar un fitxer ocult?</p>
    </div>
  </div>
</body>
</html>
