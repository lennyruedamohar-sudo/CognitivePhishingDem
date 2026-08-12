# Cognitive Phishing Demo

"**Educational Social Engineering Simulation Platform**

Una plataforma de demostración creada con **Flask** para estudiar cómo funcionan los ataques de phishing basados en ingeniería social y sesgos cognitivos.  
El objetivo es **enseñar a detectar y comprender las técnicas psicológicas utilizadas en el phishing moderno**.

---

 #Advertencia Legal
Este proyecto fue diseñado exclusivamente para fines de **concienciación y formación**.

❗ **No debe utilizarse para:**
-Ataques reales
-Recolección de datos sensibles
-Campañas de phishing
-Ingeniería social fuera de entornos controlados

✅ **Uso recomendado en:**
-Laboratorios de ciberseguridad
-Formación en seguridad
-Talleres de *awareness*
-Simulaciones controladas

---

 #Objetivo del Proyecto
Los ataques modernos de phishing ya no dependen solo de tecnología, sino de **psicología humana**.

Esta demo muestra cómo los atacantes utilizan:
-Sesgos cognitivos  
-Manipulación emocional  
-Autoridad percibida  
-Presión temporal  
-Diseño de interfaces confiables  

para inducir a una víctima a revelar información sensible.

---

 #Instalación y Uso

 #Crear entorno virtual

 bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

 Instalar dependencias
bash
pip install -r requirements.txt

 Ejecutar en desarrollo
bash
python app.py

 La aplicación estará disponible en:
👉 <http://localhost:5000> (Página principal)
👉 <http://localhost:5000/admin/demo> (Panel educativo)
👉 <http://localhost:5000/analysis> (Análisis cognitivo)

🌐 Despliegue en Render
Archivos necesarios
En la raíz del proyecto asegúrate de tener:

app.py

requirements.txt

Procfile

templates/

static/

README.md

Procfile
txt
web: gunicorn app:app

requirements.txt
txt
Flask==2.3.2
gunicorn==21.2.0
itsdangerous==2.1.2
Werkzeug==2.3.7
Jinja2==3.1.2
click==8.1.7

Pasos de despliegue
Sube tu proyecto a GitHub.

Ve a <https://render.com> y crea una cuenta.

Selecciona New Web Service y conecta tu repo.

Configura:

Environment: Python 3.11

Build Command:
bash
pip install -r requirements.txt

Start Command:
bash
gunicorn app:app

Render desplegará tu aplicación y te dará una URL pública tipo:
👉 <https://cognitivephish.onrender.com>

python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

 #Instalar dependencias

pip install -r requirements.txt

 #Ejecutar en desarrollo

python app.py

📂 Estructura del Proyecto

cognitivephish/
│── app.py
│── requirements.txt
│── Procfile
│── README.md
│── templates/
│   ├── index.html
│   ├── admin.html
│   └── analysis.html
│── static/
│   ├── style.css
│   └── script.js
│── models/
│   └── cognitive.py
│── data/
│   └── techniques.json
│── .gitignore

Capturas de Pantalla
( Agrega imágenes de la demo en ejecución para hacerlo más atractivo)

🤝 Contribuciones
Las contribuciones son bienvenidas.
Por favor abre un issue o envía un pull request.

📜 Licencia
Este proyecto está bajo la licencia MIT.
Consulta el archivo LICENSE para más detalles.
