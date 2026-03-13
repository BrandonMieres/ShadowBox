from flask import Flask, request, jsonify
import levantar_maquinas

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"message": "connection okay"}), 200

@app.route('/start-machine', methods=['POST'])
def start_machine():
    data = request.get_json(silent=True) or {}

    user = request.args.get("user") or data.get("user")
    machine_id = (
        request.args.get("machine_id") or
        request.args.get("machineId") or
        data.get("machine_id") or
        data.get("machineId")
    )

    print(f"[DEBUG] Sol·licitud rebuda - user: {user}, machine_id: {machine_id}")

    if not user or not machine_id:
        return jsonify({
            "status": "error",
            "message": "Falten els paràmetres 'user' o 'machine_id'"
        }), 400

    try:
        event = {"user": user, "machine_id": machine_id}
        result = levantar_maquinas.lambda_handler(event, None)

        print(f"[DEBUG] Resultat de lambda_handler: {result}")

        if not result or not isinstance(result, dict):
            return jsonify({
                "status": "error",
                "message": "Resposta buida o invàlida de lambda_handler"
            }), 500

        return jsonify(result), 200

    except Exception as e:
        print(f"[ERROR] Excepció a start_machine: {e}")
        return jsonify({
            "status": "error",
            "message": f"Error intern: {str(e)}"
        }), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
