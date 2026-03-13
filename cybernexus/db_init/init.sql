CREATE TABLE maquinas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL,
    respuesta VARCHAR(255) NOT NULL
);

INSERT INTO maquinas (nombre, respuesta) VALUES
    ('Admin',      '__ADMIN_PASSWORD__'),
    ('Linux',      'sistema_operativo'),
    ('Windows',    'microsoft'),
    ('MacOS',      'apple'),
    ('Kali',       'herramientas_pentest'),
    ('Metasploit', 'framework_vulnerabilidades'),
    ('CyberNexus', '__SECRET_FLAG__');

CREATE INDEX idx_nombre ON maquinas(nombre);
