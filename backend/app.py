from flask import Flask, request, jsonify, session
from flask_cors import CORS
from database import get_db_connection
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'admin123'  # Necesario para flash messages
CORS(app, supports_credentials=True)

# --- Rutas CRUD ---


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    nombre = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    usuario = conn.execute(
        "SELECT * FROM usuarios WHERE username = ? AND password = ?",
        (nombre, password)
    ).fetchone()
    conn.close()

    if usuario:
        session['usuario'] = dict(usuario)
        return jsonify({"mensaje": "Inicio de sesion con exito", "user": nombre})
    else:
        return jsonify({"error": "Inicio Fallido"}), 401

@app.route('/animales', methods=['GET'])
def obtener_animales():
    conn = get_db_connection()
    perros = conn.execute('SELECT id_perro AS id, nombre, raza, edad, tamaño, estado_salud, estado_adopcion FROM perros').fetchall()
    gatos = conn.execute('SELECT id_gato AS id, nombre, raza, edad, tamaño, estado_salud, estado_adopcion FROM gatos').fetchall()
    conn.close()

    perros = [dict(row) | {"tipo": "perro"} for row in perros]
    gatos = [dict(row) | {"tipo": "gato"} for row in gatos]

    return jsonify(perros + gatos)

# DELETE: Eliminar un animal
@app.route('/animales/<tipo>/<int:id>', methods=['DELETE'])
def eliminar_animal(tipo, id):
    tabla = "perros" if tipo == "perro" else "gatos"
    columna_id = "id_perro" if tipo == "perro" else "id_gato"

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f'DELETE FROM {tabla} WHERE {columna_id} = ?', (id,))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({"error": "Animal no encontrado"}), 404
    return '', 204

# PUT: Editar un animal
@app.route('/animales/<tipo>/<int:id>', methods=['PUT'])
def editar_animal(tipo, id):
    datos = request.json
    tabla = "perros" if tipo == "perro" else "gatos"
    columna_id = "id_perro" if tipo == "perro" else "id_gato"

    campos = ["nombre", "raza", "edad", "tamaño", "estado_salud", "estado_adopcion"]
    actualizaciones = [f"{campo} = ?" for campo in campos if campo in datos]
    valores = [datos[campo] for campo in campos if campo in datos]

    if not actualizaciones:
        return jsonify({"error": "Nada que actualizar"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f'''
        UPDATE {tabla} SET {", ".join(actualizaciones)} WHERE {columna_id} = ?
    ''', (*valores, id))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({"error": "Animal no encontrado"}), 404
    return jsonify({"mensaje": "Animal actualizado"}), 200

@app.route('/api/perros')
def obtener_perros():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM perros WHERE estado_adopcion = 'Disponible'")
    perros = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(perros)

@app.route('/api/gatos')
def obtener_gatos():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM gatos WHERE estado_adopcion = 'Disponible'")
    gatos = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(gatos)


@app.route('/api/solicitudes', methods=['POST'])
def registrar_solicitud():
    data = request.get_json()
    animal = data.get('animal');
    nombre = data.get('nombre')
    telefono = data.get('telefono')
    direccion = data.get('direccion')
    email = data.get('email')
    id_perro = data.get('id')
    fecha_actual = datetime.now().strftime('%Y-%m-%d')
    
    if not all([nombre, telefono, direccion, email, id_perro]):
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    try:
        conn = get_db_connection()
        conn.execute(
            """
            INSERT INTO peticiones_adopcion (
                nombre_solicitante,
                email,
                telefono,
                direccion,
                tipo_mascota,
                id_mascota,
                estado,
                fecha_peticion
            ) VALUES (?, ?, ?, ?, ?, ?, 'pendiente', ? )
            """,
            (nombre, email, telefono, direccion, animal, id_perro, fecha_actual )
        )
        conn.commit()
        conn.close()
        return jsonify({'mensaje': 'Solicitud registrada correctamente'}), 201
    except Exception as e:
        print("Error al guardar solicitud:", e)
        return jsonify({'error': 'Error interno del servidor'}), 500


@app.route('/api/peticiones', methods=['GET'])
def obtener_peticiones():
    conn = get_db_connection()
    peticiones = conn.execute(
        "SELECT * FROM peticiones_adopcion WHERE estado = 'pendiente'"
    ).fetchall()
    conn.close()
    return jsonify([dict(p) for p in peticiones])

@app.route('/api/peticion/<int:id>/aceptar', methods=['POST'])
def aceptar_peticion(id):
    data = request.get_json()
    id_mascota = data.get('id_mascota')

    try:
        conn = get_db_connection()
        conn.execute("UPDATE peticiones_adopcion SET estado = 'aprobado' WHERE id = ?", (id,))
        conn.execute("UPDATE perros SET estado_adopcion = 'Adoptado' WHERE id = ?", (id_mascota,))
        conn.commit()
        conn.close()
        return jsonify({'mensaje': 'Petición aceptada y mascota marcada como adoptada'})
    except Exception as e:
        print(e)
        return jsonify({'error': 'Error en el servidor'}), 500

@app.route('/api/peticion/<int:id>/declinar', methods=['POST'])
def declinar_peticion(id):
    try:
        conn = get_db_connection()
        conn.execute("DELETE FROM peticiones_adopcion WHERE id = ?", (id,))
        conn.commit()
        conn.close()
        return jsonify({'mensaje': 'Petición eliminada correctamente'})
    except Exception as e:
        print(e)
        return jsonify({'error': 'Error al eliminar la petición'}), 500


@app.route('/api/nuevoperro', methods=['POST'])
def nuevo_perro():
    data = request.get_json()
    animalito = data.get('animalito')
    nombre = data.get('nombre')
    raza = data.get('raza')
    edad = data.get('edad')
    tamaño = data.get('tamaño')
    estado_salud = data.get('estado_salud')
    fecha_registro = datetime.now().strftime('%Y-%m-%d')
    estado_adopcion = data.get('estado_adopcion')
    descripcion = data.get('descripcion')
    
    if not all([nombre, raza, edad, tamaño, estado_salud, fecha_registro, estado_adopcion]):
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    try:
        conn = get_db_connection()
        if animalito == 'perro':
            conn.execute(
                """
                INSERT INTO perros (
                    nombre,
                    raza,
                    edad,
                    tamaño,
                    estado_salud,
                    fecha_registro,
                    estado_adopcion,
                    descripcion
                    
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (nombre, raza, edad, tamaño, estado_salud, fecha_registro, estado_adopcion, descripcion)
            )
        else:
            conn.execute(
                """
                INSERT INTO gatos (
                    nombre,
                    raza,
                    edad,
                    tamaño,
                    estado_salud,
                    fecha_registro,
                    estado_adopcion,
                    descripcion
                    
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (nombre, raza, edad, tamaño, estado_salud, fecha_registro, estado_adopcion, descripcion)
            )

        conn.commit()
        conn.close()
        return jsonify({'mensaje': 'Animalito registrado correctamente'}), 200
    except Exception as e:
        print("Error al guardar perro:", e)
        return jsonify({'error': 'Error interno del servidor'}), 500


if __name__ == '__main__':
    app.run(debug=True)  # debug=True recarga el servidor automáticamente al guardar cambios