CREATE DATABASE IF NOT EXISTS crypto_db;
USE crypto_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(64) NOT NULL
);

-- Usuari admin amb hash md5 (serà substituït pel playbook)
INSERT INTO users (username, password)
VALUES ('__ADMIN_USER__', '__ADMIN_PASSWORD__');

-- Flag vulnerable com a "usuari" addicional (reutilitzant el camp password)
INSERT INTO users (username, password)
VALUES ('flag', '__SECRET_FLAG__');

-- Crear usuari per connexió des del PHP
CREATE USER IF NOT EXISTS 'crypto'@'%' IDENTIFIED BY 'crypto123';
GRANT ALL PRIVILEGES ON crypto_db.* TO 'crypto'@'%';
FLUSH PRIVILEGES;
