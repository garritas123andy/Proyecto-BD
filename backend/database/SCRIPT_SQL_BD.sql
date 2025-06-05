-- Eliminar tablas si existen
DROP TABLE IF EXISTS gatos;
DROP TABLE IF EXISTS perros;
DROP TABLE IF EXISTS adoptante;
DROP TABLE IF EXISTS peticiones_adopcion;

-- Crear tabla adoptante
CREATE TABLE adoptante (
    id_adoptante INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT,
    telefono TEXT NOT NULL,
    direccion TEXT NOT NULL
);

-- Crear tabla perros
CREATE TABLE perros (
    id_perro INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    raza TEXT,
    edad INTEGER,
    tamaño TEXT NOT NULL,
    estado_salud TEXT,
    fecha_registro TEXT NOT NULL,
    estado_adopcion TEXT NOT NULL,
    descripcion TEXT,
    imagen TEXT,
    id_adoptante INTEGER,
    FOREIGN KEY (id_adoptante) REFERENCES adoptante(id_adoptante)
);

-- Crear tabla gatos
CREATE TABLE gatos (
    id_gato INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    raza TEXT,
    edad INTEGER,
    tamaño TEXT NOT NULL,
    estado_salud TEXT,
    fecha_registro TEXT NOT NULL,
    estado_adopcion TEXT NOT NULL,
    descripcion TEXT,
    imagen TEXT,
    id_adoptante INTEGER,
    FOREIGN KEY (id_adoptante) REFERENCES adoptante(id_adoptante)
);

-- Crear Tabla Peticioes de adopcion
CREATE TABLE peticiones_adopcion (
    id_peticion INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_solicitante TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT NOT NULL,
    direccion TEXT NOT NULL,
    tipo_mascota TEXT CHECK(tipo_mascota IN ('perro', 'gato')) NOT NULL,
    id_mascota INTEGER NOT NULL,
    estado TEXT DEFAULT 'pendiente' CHECK(estado IN ('pendiente', 'aceptada', 'rechazada')),
    fecha_peticion TEXT NOT NULL,
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);


-- Insertar adoptantes
INSERT INTO adoptante (nombre, email, telefono, direccion) VALUES
('Cristopher Camacho', 'cris1059@email.com', '5551234567', 'Calle Sol #123, CDMX'),
('Andrea Bautista', 'andygarritas@email.com', '5559876543', 'Av. Luna #456, Guadalajara'),
('Electro perez', 'electro1059@example.com', '5555555555', 'Calle Estrella #789, Monterrey');

-- Insertar perros
INSERT INTO perros (nombre, raza, edad, tamaño, estado_salud, fecha_registro, estado_adopcion, descripcion, imagen, id_adoptante) VALUES
('Rocky', 'Labrador', 3, 'Grande', 'Saludable', '2025-05-10', 'Adoptado', 'Perro juguetón y amigable.', 'rocky.jpg', 1),
('Bella', 'Chihuahua', 2, 'Pequeño', 'Vacunado', '2025-04-20', 'Disponible', 'Muy cariñosa, ideal para departamento.', 'bella.jpg', NULL),
('Max', 'Pastor Alemán', 4, 'Grande', 'Recuperándose de cirugía', '2025-05-25', 'Adoptado', 'Protector y leal.', 'max.jpg', 2),
('Toby', 'Beagle', 1, 'Mediano', 'Saludable', '2025-06-01', 'Disponible', 'Curioso y muy activo.', 'toby.jpg', NULL),
('Lola', 'French Poodle', 6, 'Pequeño', 'Con alergias', '2025-05-15', 'Adoptado', 'Tranquila y cariñosa.', 'lola.jpg', 3),
('Simba', 'Golden Retriever', 5, 'Grande', 'Saludable', '2025-05-22', 'Disponible', 'Muy sociable y obediente.', 'simba.jpg', NULL),
('Duke', 'Boxer', 3, 'Grande', 'Vacunado', '2025-05-28', 'Disponible', 'Buen guardián, pero dócil.', 'duke.jpg', NULL),
('Nina', 'Dálmata', 2, 'Mediano', 'Recuperada de parvovirus', '2025-04-10', 'Adoptado', 'Tierna y protectora.', 'nina.jpg', 1),
('Thor', 'Pitbull', 4, 'Grande', 'Saludable', '2025-05-30', 'Disponible', 'Ideal para casa con jardín.', 'thor.jpg', NULL);

-- Insertar gatos
INSERT INTO gatos (nombre, raza, edad, tamaño, estado_salud, fecha_registro, estado_adopcion, descripcion, imagen, id_adoptante) VALUES
('Mishi', 'Siames', 2, 'Mediano', 'Saludable', '2025-05-05', 'Disponible', 'Gato curioso y muy limpio.', 'mishi.jpg', NULL),
('Luna', 'Persa', 1, 'Pequeño', 'Desparasitada', '2025-05-12', 'Adoptado', 'Gata tranquila, ideal para niños.', 'luna.jpg', 3),
('Tom', 'Criollo', 5, 'Grande', 'Saludable', '2025-05-18', 'Disponible', 'Muy independiente pero cariñoso.', 'tom.jpg', NULL),
('Nube', 'Maine Coon', 3, 'Grande', 'Saludable', '2025-06-01', 'Disponible', 'Juguetón y cariñoso.', 'nube.jpg', NULL),
('Kira', 'Bengala', 2, 'Mediano', 'Vacunada', '2025-05-15', 'Adoptado', 'Muy activa y juguetona.', 'kira.jpg', 1),
('Salem', 'Bombay', 4, 'Mediano', 'Saludable', '2025-04-25', 'Disponible', 'Le encanta dormir en el sol.', 'salem.jpg', NULL),
('Cleo', 'Ragdoll', 1, 'Mediano', 'Desparasitada', '2025-05-29', 'Adoptado', 'Dócil y buena con niños.', 'cleo.jpg', 2),
('Tigre', 'Criollo', 6, 'Grande', 'Recuperado de infección ocular', '2025-05-02', 'Disponible', 'Muy inteligente y fuerte.', 'tigre.jpg', NULL),
('Milo', 'Esfinge', 3, 'Pequeño', 'Saludable', '2025-06-02', 'Disponible', 'Cariñoso y tranquilo.', 'milo.jpg', NULL);
