# Cognitive Phishing Demo

Simulación educativa de phishing basada en ingeniería social y sesgos cognitivos. El sitio permite observar cómo una alerta falsa combina autoridad, urgencia, miedo, anclaje y confianza para presionar a una persona.

> **Aviso:** úsalo únicamente en laboratorios, talleres o entornos controlados. Nunca introduzcas datos reales ni distribuyas la simulación como si fuera un banco.

## Qué incluye

- Simulación responsive para escritorio, tableta y móvil.
- Marcadores visibles que señalan las técnicas utilizadas.
- Panel educativo en `/admin/demo` y análisis guiado en `/analysis`.
- Registro estructurado en SQLite (`data/phishing_demo.sqlite3` por defecto).
- Panel educativo protegido por usuario, contraseña y sesión.
- Protección de datos: el registro solo conserva una tarjeta enmascarada y metadatos de los campos intentados; nunca guarda tarjeta completa, CVV, PIN, IP o User-Agent.

## Instalación

Requiere Python 3.9 o posterior.

```bash
python -m venv venv
```

En Windows:

```powershell
venv\Scripts\Activate.ps1
```

En Linux/macOS:

```bash
source venv/bin/activate
```

Instala dependencias y ejecuta:

```bash
pip install -r requirements.txt
python app.py
```

Abre <http://localhost:5000>.

## Rutas

| Ruta | Propósito |
| --- | --- |
| `/` | Simulación interactiva |
| `/admin/login` | Acceso del facilitador al panel |
| `/admin/demo` | Panel educativo y registros seguros, protegido |
| `/analysis` | Análisis de las técnicas y contramedidas |
| `/verify` | Endpoint interno que recibe una simulación y la registra enmascarada |

## Despliegue con Render

- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `gunicorn app:app`
- **Python:** 3.11 o posterior

Configura estas variables de entorno en producción y nunca las cometas al repositorio:

```text
FLASK_SECRET_KEY=una-clave-larga-y-aleatoria
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=hash-generado-con-werkzeug
DATABASE_PATH=data/phishing_demo.sqlite3
COOKIE_SECURE=1
```

Genera el hash sin escribir la contraseña en el código:

```bash
python -c "from werkzeug.security import generate_password_hash; print(generate_password_hash('CAMBIA_ESTA_CONTRASEÑA'))"
```

`ADMIN_PASSWORD_HASH` es la opción recomendada. `ADMIN_PASSWORD` existe como alternativa para entornos locales temporales, pero no debe usarse en producción. SQLite reemplaza el TXT y evita registros sin estructura; en un despliegue con varios procesos o sin disco persistente conviene apuntar `DATABASE_PATH` a un volumen persistente o migrar el adaptador a PostgreSQL/MySQL.

## Estructura

```text
.
├── app.py
├── requirements.txt
├── Procfile
├── models/cognitive.py
├── data/techniques.json
├── data/phishing_demo.sqlite3  # generado en ejecución, ignorado por Git
├── static/
│   ├── style.css
│   ├── dashboard.css
│   └── script.js
└── templates/
    ├── index.html
    ├── admin.html
    ├── analysis.html
    └── login.html
```

## Licencia

MIT. Consulta `LICENSE`.
