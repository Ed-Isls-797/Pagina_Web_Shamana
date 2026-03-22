from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from datetime import datetime
app = Flask(__name__)
CORS(app, origins=["http://localhost:4200"])
app.config["MONGO_URI"] = "mongodb://localhost:27017/Shamana"
mongo = PyMongo(app)

# MODELOS (referencia, MongoDB es NoSQL, pero se documentan los esquemas)

# Usuarios
class Usuario:
    def __init__(self, nombre_completo, email, password_hash, rol="cliente", membresia=None, puntos_rewards=0):
        self.nombre_completo = nombre_completo
        self.email = email
        self.password_hash = password_hash
        self.rol = rol
        self.membresia = membresia or {}
        self.puntos_rewards = puntos_rewards
        self.eventos_asistidos = []
        self.reservaciones = []
        self.mensajes = []
        self.comprobantes = []

# Eventos
class Evento:
    def __init__(self, titulo, fecha, artista, descripcion, imagen_url, ubicacion, horario, entradas_disponibles, precio):
        self.titulo = titulo
        self.fecha = fecha
        self.artista = artista
        self.descripcion = descripcion
        self.imagen_url = imagen_url
        self.ubicacion = ubicacion
        self.horario = horario
        self.entradas_disponibles = entradas_disponibles
        self.precio = precio

# Reservaciones
class Reservacion:
    def __init__(self, usuario_id, evento_id, tipo_reserva, personas, hora, estado, fecha_reserva):
        self.usuario_id = usuario_id
        self.evento_id = evento_id
        self.tipo_reserva = tipo_reserva
        self.personas = personas
        self.hora = hora
        self.estado = estado
        self.fecha_reserva = fecha_reserva

# Mensajes
class Mensaje:
    def __init__(self, usuario_id, contenido, fecha, leido=False):
        self.usuario_id = usuario_id
        self.contenido = contenido
        self.fecha = fecha
        self.leido = leido

# Comprobantes
class Comprobante:
    def __init__(self, usuario_id, archivo_url, estado, fecha_subida):
        self.usuario_id = usuario_id
        self.archivo_url = archivo_url
        self.estado = estado
        self.fecha_subida = fecha_subida

# Galería
class Galeria:
    def __init__(self, evento_id, imagen_url, descripcion):
        self.evento_id = evento_id
        self.imagen_url = imagen_url
        self.descripcion = descripcion

# --- USUARIOS ---
@app.route("/usuarios", methods=["GET"])
def get_usuarios():
    usuarios = list(mongo.db.usuarios.find())
    for u in usuarios:
        u["_id"] = str(u["_id"])
    return jsonify(usuarios)


@app.route("/usuarios/<id>", methods=["GET"])
def get_usuario(id):
    usuario = mongo.db.usuarios.find_one({"_id": ObjectId(id)})
    if usuario:
        usuario["_id"] = str(usuario["_id"])
        return jsonify(usuario)
    return jsonify({"msg": "Usuario no encontrado"}), 404

@app.route("/usuarios/<id>", methods=["PUT"])
def update_usuario(id):
    data = request.json
    mongo.db.usuarios.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"msg": "Usuario actualizado"})

@app.route("/usuarios/<id>", methods=["DELETE"])
def delete_usuario(id):
    mongo.db.usuarios.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Usuario eliminado"})

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    nombre_completo = data.get("nombre_completo")
    rol = data.get("rol", "cliente")
    if not email or not password or not nombre_completo:
        return jsonify({"msg": "Faltan datos obligatorios"}), 400
    if mongo.db.usuarios.find_one({"email": email}):
        return jsonify({"msg": "El usuario ya existe"}), 409
    password_hash = generate_password_hash(password)
    usuario = {
        "nombre_completo": nombre_completo,
        "email": email,
        "password_hash": password_hash,
        "rol": rol,
        "membresia": {},
        "puntos_rewards": 0,
        "eventos_asistidos": [],
        "reservaciones": [],
        "mensajes": [],
        "comprobantes": []
    }
    mongo.db.usuarios.insert_one(usuario)
    return jsonify({"msg": "Usuario registrado correctamente"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    usuario = mongo.db.usuarios.find_one({"email": email})
    if not usuario:
        return jsonify({"msg": "Usuario no existe"}), 404
    if not check_password_hash(usuario["password_hash"], password):
        return jsonify({"msg": "Contraseña incorrecta"}), 401
    return jsonify({
        "msg": "Login exitoso",
        "usuario": {
            "_id": str(usuario["_id"]),
            "nombre_completo": usuario["nombre_completo"],
            "email": usuario["email"],
            "rol": usuario["rol"]
        }
    })

# --- EVENTOS ---
@app.route("/eventos", methods=["GET"])
def get_eventos():
    eventos = list(mongo.db.eventos.find())
    for e in eventos:
        e["_id"] = str(e["_id"])
    return jsonify(eventos)

@app.route("/eventos", methods=["POST"])
def create_evento():
    data = request.json
    mongo.db.eventos.insert_one(data)
    return jsonify({"msg": "Evento creado"}), 201

@app.route("/eventos/<id>", methods=["GET"])
def get_evento(id):
    evento = mongo.db.eventos.find_one({"_id": ObjectId(id)})
    if evento:
        evento["_id"] = str(evento["_id"])
        return jsonify(evento)
    return jsonify({"msg": "Evento no encontrado"}), 404

@app.route("/eventos/<id>", methods=["PUT"])
def update_evento(id):
    data = request.json
    mongo.db.eventos.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"msg": "Evento actualizado"})

@app.route("/eventos/<id>", methods=["DELETE"])
def delete_evento(id):
    mongo.db.eventos.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Evento eliminado"})

# --- RESERVACIONES ---
@app.route("/reservaciones", methods=["GET"])
def get_reservaciones():
    reservaciones = list(mongo.db.reservaciones.find())
    for r in reservaciones:
        r["_id"] = str(r["_id"])
    return jsonify(reservaciones)

@app.route("/reservaciones", methods=["POST"])
def create_reservacion():
    data = request.json
    mongo.db.reservaciones.insert_one(data)
    return jsonify({"msg": "Reservación creada"}), 201

@app.route("/reservaciones/<id>", methods=["GET"])
def get_reservacion(id):
    reservacion = mongo.db.reservaciones.find_one({"_id": ObjectId(id)})
    if reservacion:
        reservacion["_id"] = str(reservacion["_id"])
        return jsonify(reservacion)
    return jsonify({"msg": "Reservación no encontrada"}), 404

@app.route("/reservaciones/<id>", methods=["PUT"])
def update_reservacion(id):
    data = request.json
    mongo.db.reservaciones.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"msg": "Reservación actualizada"})

@app.route("/reservaciones/<id>", methods=["DELETE"])
def delete_reservacion(id):
    mongo.db.reservaciones.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Reservación eliminada"})

# --- MENSAJES ---
@app.route("/mensajes", methods=["GET"])
def get_mensajes():
    usuario_id = request.args.get("usuario_id")
    if usuario_id:
        mensajes = list(mongo.db.mensajes.find({"usuario_id": usuario_id}))
    else:
        mensajes = list(mongo.db.mensajes.find())
    
    # Sort messages by date to ensure proper conversation order
    mensajes.sort(key=lambda x: x.get('fecha', ''))

    for m in mensajes:
        m["_id"] = str(m["_id"])
    return jsonify(mensajes)

@app.route("/mensajes", methods=["POST"])
def create_mensaje():
    data = request.json
    usuario_id = data.get("usuario_id")
    sender = data.get("sender")  # 'client' o 'admin'
    contenido = data.get("contenido")
    fecha = data.get("fecha") or datetime.utcnow().isoformat()
    if not usuario_id or not sender or not contenido:
        return jsonify({"msg": "Faltan datos obligatorios"}), 400
    mensaje = {
        "usuario_id": usuario_id,
        "sender": sender,
        "contenido": contenido,
        "fecha": fecha
    }
    mongo.db.mensajes.insert_one(mensaje)
    return jsonify({"msg": "Mensaje creado"}), 201

@app.route("/mensajes/<id>", methods=["GET"])
def get_mensaje(id):
    mensaje = mongo.db.mensajes.find_one({"_id": ObjectId(id)})
    if mensaje:
        mensaje["_id"] = str(mensaje["_id"])
        return jsonify(mensaje)
    return jsonify({"msg": "Mensaje no encontrado"}), 404

@app.route("/mensajes/<id>", methods=["PUT"])
def update_mensaje(id):
    data = request.json
    mongo.db.mensajes.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"msg": "Mensaje actualizado"})

@app.route("/mensajes/<id>", methods=["DELETE"])
def delete_mensaje(id):
    mongo.db.mensajes.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Mensaje eliminado"})

# --- COMPROBANTES ---
@app.route("/comprobantes", methods=["GET"])
def get_comprobantes():
    comprobantes = list(mongo.db.comprobantes.find())
    for c in comprobantes:
        c["_id"] = str(c["_id"])
    return jsonify(comprobantes)

@app.route("/comprobantes", methods=["POST"])
def create_comprobante():
    data = request.json
    mongo.db.comprobantes.insert_one(data)
    return jsonify({"msg": "Comprobante creado"}), 201

@app.route("/comprobantes/<id>", methods=["GET"])
def get_comprobante(id):
    comprobante = mongo.db.comprobantes.find_one({"_id": ObjectId(id)})
    if comprobante:
        comprobante["_id"] = str(comprobante["_id"])
        return jsonify(comprobante)
    return jsonify({"msg": "Comprobante no encontrado"}), 404

@app.route("/comprobantes/<id>", methods=["PUT"])
def update_comprobante(id):
    data = request.json
    mongo.db.comprobantes.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"msg": "Comprobante actualizado"})

@app.route("/comprobantes/<id>", methods=["DELETE"])
def delete_comprobante(id):
    mongo.db.comprobantes.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Comprobante eliminado"})

# --- GALERÍA ---
@app.route("/galeria", methods=["GET"])
def get_galeria():
    galeria = list(mongo.db.galeria.find())
    for g in galeria:
        g["_id"] = str(g["_id"])
    return jsonify(galeria)

@app.route("/galeria", methods=["POST"])
def create_galeria():
    data = request.json
    mongo.db.galeria.insert_one(data)
    return jsonify({"msg": "Imagen agregada a galería"}), 201

@app.route("/galeria/<id>", methods=["GET"])
def get_galeria_item(id):
    galeria_item = mongo.db.galeria.find_one({"_id": ObjectId(id)})
    if galeria_item:
        galeria_item["_id"] = str(galeria_item["_id"])
        return jsonify(galeria_item)
    return jsonify({"msg": "Imagen no encontrada"}), 404

@app.route("/galeria/<id>", methods=["PUT"])
def update_galeria_item(id):
    data = request.json
    mongo.db.galeria.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"msg": "Imagen actualizada"})

@app.route("/galeria/<id>", methods=["DELETE"])
def delete_galeria_item(id):
    mongo.db.galeria.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Imagen eliminada"})

# Ejemplo de conexión y prueba
@app.route("/ping")
def ping():
    return {"msg": "Conexión exitosa a MongoDB Shamana"}

if __name__ == "__main__":
    app.run(debug=False)
