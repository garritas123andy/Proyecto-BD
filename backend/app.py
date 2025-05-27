from flask import Flask, request, jsonify, session
from flask_cors import CORS
from database import get_db_connection

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
        return jsonify({"mensaje": "Inicio de sesion con exito"})
    else:
        return jsonify({"error": "Inicio Fallido"}), 401


if __name__ == '__main__':
    app.run(debug=True)  # debug=True recarga el servidor automáticamente al guardar cambios