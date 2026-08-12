from datetime import datetime
from model.cognitive import CognitivePhish

class CognitivePhish:
    """Clase mínima para registrar intentos de demostración.

    Esta versión mantiene solo la lógica de registro y la lista de entradas
    para que el módulo sea un verdadero módulo de modelo (sin rutas Flask).
    """

    def __init__(self):
        self.victims = []
        self.techniques_used = []

    def log_attempt(self, data, ip_addr=None, user_agent=None):
        """Registrar un intento y devolver la entrada creada.

        Args:
            data: dict con los datos recibidos (puede ser cualquier objeto serializable).
            ip_addr: dirección IP (opcional).
            user_agent: cadena User-Agent (opcional).
        """
        entry = {
            "timestamp": datetime.now().isoformat(),
            "data": data,
            "ip_addr": ip_addr,
            "user_agent": user_agent,
        }
        self.victims.append(entry)
        return entry
