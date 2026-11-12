
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timezone
from uuid import uuid4
import requests
import math

app = Flask(__name__)
CORS(app)

# Temporary storage. Replace with MongoDB later.
donations = {}

# Existing CareKart ML microservice
ML_API_URL = "http://127.0.0.1:5000/api/predict-expiry"


def get_expiry_prediction(donation):
    """Send donation details to the CareKart ML service."""

    ml_payload = {
        "food_name": donation["food_name"],
        "category": donation["category"],
        "storage_condition": donation["storage_condition"],
        "packaging_type": donation["packaging_type"],
        "temperature_c": donation["temperature_c"],
        "humidity_percent": donation["humidity_percent"],
        "hours_since_cooking": donation["hours_since_cooking"]
    }

    try:
        response = requests.post(
            ML_API_URL,
            json=ml_payload,
            timeout=10
        )

        response.raise_for_status()

        prediction = response.json()

        return {
            "prediction_status": "SUCCESS",
            "expiry_prediction": prediction
        }

    except requests.exceptions.Timeout:
        return {
            "prediction_status": "UNAVAILABLE",
            "prediction_error": "ML service request timed out"
        }

    except requests.exceptions.RequestException as error:
        return {
            "prediction_status": "UNAVAILABLE",
            "prediction_error": str(error)
        }

    except ValueError:
        return {
            "prediction_status": "UNAVAILABLE",
            "prediction_error": "ML service returned invalid JSON"
        }


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "success": True,
        "service": "CareKart REST API",
        "status": "ONLINE",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }), 200


@app.route("/api/donations", methods=["POST"])
def create_donation():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "success": False,
            "message": "Request body must contain valid JSON"
        }), 400

    required_fields = [
        "food_name",
        "category",
        "quantity",
        "storage_condition",
        "packaging_type",
        "temperature_c",
        "humidity_percent",
        "hours_since_cooking"
    ]

    missing_fields = [
        field for field in required_fields
        if field not in data
    ]

    if missing_fields:
        return jsonify({
            "success": False,
            "message": "Missing required fields",
            "missing_fields": missing_fields
        }), 400

    try:
        quantity = float(data["quantity"])
        temperature = float(data["temperature_c"])
        humidity = float(data["humidity_percent"])
        hours = float(data["hours_since_cooking"])

        numeric_values = [
            quantity, temperature, humidity, hours
        ]

        if not all(math.isfinite(value) for value in numeric_values):
            raise ValueError("Numeric values must be finite")

        if quantity <= 0 or hours < 0:
            raise ValueError("Invalid quantity or preparation time")

        if not 0 <= humidity <= 100:
            raise ValueError("Humidity must be between 0 and 100")

        if not all(
            isinstance(data[field], str) and data[field].strip()
            for field in [
                "food_name",
                "category",
                "storage_condition",
                "packaging_type"
            ]
        ):
            raise ValueError("Food details must be non-empty strings")

    except (ValueError, TypeError):
        return jsonify({
            "success": False,
            "message": "Invalid input. Check food details and numeric values."
        }), 400

    donation_id = str(uuid4())

    donation = {
        "donation_id": donation_id,
        "food_name": data["food_name"].strip(),
        "category": data["category"].strip(),
        "quantity": quantity,
        "storage_condition": data["storage_condition"].strip(),
        "packaging_type": data["packaging_type"].strip(),
        "temperature_c": temperature,
        "humidity_percent": humidity,
        "hours_since_cooking": hours,
        "status": "PENDING",
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    # Save donation before calling ML.
    donations[donation_id] = donation

    # Request expiry prediction from ML service.
    prediction_result = get_expiry_prediction(donation)

    # Attach prediction information to donation.
    donation.update(prediction_result)

    return jsonify({
        "success": True,
        "message": "Food donation created successfully",
        "donation": donation
    }), 201


@app.route("/api/donations", methods=["GET"])
def get_all_donations():
    return jsonify({
        "success": True,
        "total": len(donations),
        "donations": list(donations.values())
    }), 200


@app.route("/api/donations/<donation_id>", methods=["GET"])
def get_donation(donation_id):
    donation = donations.get(donation_id)

    if donation is None:
        return jsonify({
            "success": False,
            "message": "Donation not found"
        }), 404

    return jsonify({
        "success": True,
        "donation": donation
    }), 200


if __name__ == "__main__":
    print("Starting CareKart REST API...")
    app.run(host="0.0.0.0", port=5001, debug=True)
