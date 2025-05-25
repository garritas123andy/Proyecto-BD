import sqlite3

DATABASE = 'bd_biblioteca.db'  # ¡Nuevo nombre de la base de datos!


def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Crear la tabla 'libros' con id_libro como clave primaria
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS libros (
            id_libro INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            anio INTEGER
        )
    ''')

    # Insertar algunos datos de ejemplo si la tabla está vacía
    cursor.execute("SELECT COUNT(*) FROM libros")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO libros (titulo, autor, anio) VALUES (?, ?, ?)",
                       ('Cien Años de Soledad', 'Gabriel García Márquez', 1967))
        cursor.execute("INSERT INTO libros (titulo, autor, anio) VALUES (?, ?, ?)",
                       ('El Principito', 'Antoine de Saint-Exupéry', 1943))
        cursor.execute("INSERT INTO libros (titulo, autor, anio) VALUES (?, ?, ?)",
                       ('1984', 'George Orwell', 1949))

    conn.commit()
    conn.close()
    print("Base de datos 'bd_biblioteca.db' inicializada y datos de ejemplo insertados.")


if __name__ == '__main__':
    init_db()