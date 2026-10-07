"""
CareKart AI Microservice API
Developer: Harshit Goyal (AI & ML Dev, Team DS-02, SKIT Jaipur)
Project: CareKart — Food Redistribution System (SDG 2: Zero Hunger)
Endpoints:
  GET  /api/health            - Health check & model metadata
  POST /api/predict-expiry    - Food shelf-life prediction endpoint
"""

import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import predict_shelf_life, BASE_DIR

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React frontend and Spring Boot

METADATA_PATH = os.path.join(BASE_DIR, 'models', 'model_metadata.json')

@app.route('/api/health', methods=['GET'])
def health_check():
    metadata = {}
    if os.path.exists(METADATA_PATH):
        with open(METADATA_PATH, 'r') as f:
            metadata = json.load(f)
    return jsonify({
        'status': 'ONLINE',
        'service': 'CareKart AI Expiry Prediction Service',
        'model': metadata.get('model_name', 'Random Forest Regressor'),
        'r2_score': metadata.get('test_r2_score', 0.9827),
        'academic_info': {
            'developer': 'Harshit Goyal (AI/ML Dev)',
            'college': 'SKIT Jaipur',
            'project_id': 'SKIT/DS/2023-2027/02',
            'sdg_goal': 'SDG 2: Zero Hunger'
        }
    }), 200

@app.route('/api/predict-expiry', methods=['POST'])
def predict_endpoint():
    data = request.get_json(force=True, silent=True)
    if not data:
        return jsonify({'error': 'Missing JSON payload'}), 400

    try:
        result = predict_shelf_life(data)
        return jsonify({
            'success': True,
            'prediction': result
        }), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🚀 Starting CareKart AI Microservice on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)
