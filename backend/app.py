from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3

app = Flask(__name__)
app.secret_key = 'admin123'  # Necesario para flash messages

DATABASE = 'bd_biblioteca.db'


def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Esto permite acceder a las columnas por nombre
    return conn


# --- Rutas CRUD ---

# R - READ (Leer/Mostrar todos los elementos)
@app.route('/')
def index():
    conn = get_db_connection()
    libros = conn.execute('SELECT * FROM libros').fetchall()
    conn.close()
    return render_template('index.html', libros=libros)


# C - CREATE (Añadir un nuevo elemento)
@app.route('/add', methods=('GET', 'POST'))
def add_libro():
    if request.method == 'POST':
        titulo = request.form['titulo']
        autor = request.form['autor']
        anio = request.form['anio']

        if not titulo or not autor or not anio:
            flash('Todos los campos son obligatorios!', 'error')
        else:
            try:
                anio = int(anio)  # Asegurar que el año es un entero
                conn = get_db_connection()
                conn.execute('INSERT INTO libros (titulo, autor, anio) VALUES (?, ?, ?)',
                             (titulo, autor, anio))
                conn.commit()
                conn.close()
                flash('Libro añadido correctamente!', 'success')
                return redirect(url_for('index'))
            except ValueError:
                flash('El año debe ser un número entero.', 'error')
            except sqlite3.Error as e:
                flash(f'Error al guardar el libro: {e}', 'error')

    return render_template('add.html')


# U - UPDATE (Editar un elemento existente)
@app.route('/edit/<int:id_libro>', methods=('GET', 'POST'))
def edit_libro(id_libro):
    conn = get_db_connection()
    libro = conn.execute('SELECT * FROM libros WHERE id_libro = ?', (id_libro,)).fetchone()

    if libro is None:
        flash('Libro no encontrado!', 'error')
        return redirect(url_for('index'))

    if request.method == 'POST':
        titulo = request.form['titulo']
        autor = request.form['autor']
        anio = request.form['anio']

        if not titulo or not autor or not anio:
            flash('Todos los campos son obligatorios!', 'error')
        else:
            try:
                anio = int(anio)
                conn.execute('UPDATE libros SET titulo = ?, autor = ?, anio = ? WHERE id_libro = ?',
                             (titulo, autor, anio, id_libro))
                conn.commit()
                conn.close()
                flash('Libro actualizado correctamente!', 'success')
                return redirect(url_for('index'))
            except ValueError:
                flash('El año debe ser un número entero.', 'error')
            except sqlite3.Error as e:
                flash(f'Error al actualizar el libro: {e}', 'error')

    conn.close()
    return render_template('edit.html', libro=libro)


# D - DELETE (Eliminar un elemento)
@app.route('/delete/<int:id_libro>', methods=('POST',))
def delete_libro(id_libro):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM libros WHERE id_libro = ?', (id_libro,))

    if cursor.rowcount == 0:
        flash('Libro no encontrado para eliminar.', 'error')
    else:
        conn.commit()
        flash('Libro eliminado correctamente!', 'success')

    conn.close()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)  # debug=True recarga el servidor automáticamente al guardar cambios