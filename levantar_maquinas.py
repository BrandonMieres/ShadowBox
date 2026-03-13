import subprocess
import re

# Diccionari d'IDs a playbooks
PLAYBOOKS = {
    "1": "deploy_cybernexus.yaml",
    "2": "deploy_quantum_breach.yaml",
    "3": "deploy_neural_infiltrator.yaml",
    "4": "deploy_crypto_sentinel.yaml",
}

def lambda_handler(event, context):
    try:
        user = event.get("user", "desconegut")
        machine_id = event.get("machine_id")

        print(f"[DEBUG] Lambda iniciada per user: {user}, machine_id: {machine_id}")

        playbook = PLAYBOOKS.get(machine_id)
        if not playbook:
            return {
                "status": "error",
                "message": f"ID de màquina no vàlid: {machine_id}"
            }

        cmd = ["ansible-playbook", "-i", "localhost,", f"/home/ubuntu/{playbook}", "-c", "local"]

        print(f"[DEBUG] Executant comanda: {' '.join(cmd)}")

        result = subprocess.run(cmd, capture_output=True, text=True)

        # 🔧 Neteja sortides
        stdout_clean = re.sub(r'[^\x20-\x7E\n\r\t]', '', result.stdout)[:8000]
        stderr_clean = re.sub(r'[^\x20-\x7E\n\r\t]', '', result.stderr)[:2000]

        if result.returncode != 0:
            print("[ERROR] Execució amb errors")
            return {
                "status": "error",
                "message": "Error en executar el playbook",
                "stderr": stderr_clean
            }

        print("[+] Playbook executat correctament")
        return {
            "status": "success",
            "message": "Playbook executat",
        }

    except Exception as e:
        print(f"[-] Excepció atrapada: {e}")
        return {
            "status": "error",
            "message": "Excepció durant execució",
            "details": str(e)
        }
