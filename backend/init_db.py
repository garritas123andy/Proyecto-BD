import sqlite3
import os

DB_PATH = 'database/adopciones.db'

os.makedirs('database', exist_ok=True)

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()


#CREAR TABLA DE PERROS
cursor.execute('''
    CREATE TABLE IF NOT EXISTS perros (
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
        id_adoptante  INTEGER,
        FOREIGN KEY (id_adoptante) REFERENCES adoptantes(id_adoptantes))
''')

#CREAR TABLA DE ADOPTANTES
cursor.execute('''
    CREATE TABLE IF NOT EXISTS adoptante (
        id_adoptante INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT,
        telefono TEXT NOT NULL,
        direccion TEXT NOT NULL
        )
''')

#CREAR TABLA USUARIOS
cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios(
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
        )
''')

cursor.execute("SELECT * FROM usuarios WHERE username = ? ", ('andy123garritas', ))
if not cursor.fetchone():
    cursor.execute("INSERT INTO usuarios (username, password) VALUES ( ?, ?)", ('andy123garritas', 'admin123'))

conn.commit()
conn.close()

print("BASE DE DATOS CARGADA")