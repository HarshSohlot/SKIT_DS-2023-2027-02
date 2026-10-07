"""
CareKart AI/ML Module — Inference & Expiry Prediction Script
Developer: Harshit Goyal (AI & ML Dev, Team DS-02, SKIT Jaipur)
Project: CareKart — Food Redistribution System (SDG 2: Zero Hunger)
"""

import os
import argparse
import joblib
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'random_forest_expiry_model.pkl')
PREPROCESSOR_PATH = os.path.join(BASE_DIR, 'models', 'preprocessor.pkl')

def load_predictor():
    if not os.path.exists(MODEL_PATH) or not os.path.exists(PREPROCESSOR_PATH):
        raise FileNotFoundError("Model or preprocessor binary not found. Please run train_model.py first.")
    model = joblib.load(MODEL_PATH)
    preprocessor = joblib.load(PREPROCESSOR_PATH)
    return model, preprocessor

def predict_shelf_life(food_dict):
    """
    Predicts the remaining safe shelf-life hours and safety classification.
    """
    model, preprocessor = load_predictor()

    # Default values if not specified
    category = food_dict.get('category', 'Cooked Curry / Gravy')
    storage = food_dict.get('storage_condition', 'Ambient Room Temp')
    packaging = food_dict.get('packaging_type', 'Covered Degchi / Pot')
    temperature = float(food_dict.get('temperature_c', 30.0))
    humidity = float(food_dict.get('humidity_percent', 55.0))
    hours_since_cooking = float(food_dict.get('hours_since_cooking', 2.0))

    # Derive moisture level
    if category in ['Cooked Curry / Gravy', 'Dal & Lentils', 'Dairy & Desserts']:
        moisture_level = 3
    elif category in ['Cooked Rice / Biryani', 'Raw Vegetables & Salad']:
        moisture_level = 2
    else:
        moisture_level = 1

    input_df = pd.DataFrame([{
        'category': category,
        'storage_condition': storage,
        'packaging_type': packaging,
        'temperature_c': temperature,
        'humidity_percent': humidity,
        'hours_since_cooking': hours_since_cooking,
        'moisture_level': moisture_level
    }])

    # Preprocess & Predict
    X_proc = preprocessor.transform(input_df)
    predicted_hours = float(model.predict(X_proc)[0])
    predicted_hours = max(0.0, round(predicted_hours, 2))

    # Assess safety threshold
    if predicted_hours >= 4.0:
        recommendation = "SAFE_TO_DONATE"
        urgency = "LOW"
        ui_badge = "Excellent Quality"
    elif predicted_hours >= 2.0:
        recommendation = "PRIORITY_PICKUP"
        urgency = "HIGH"
        ui_badge = "Consume Soon (Urgent Pickup)"
    else:
        recommendation = "UNSAFE_FOR_REDISTRIBUTION"
        urgency = "CRITICAL"
        ui_badge = "Expired / High Risk"

    return {
        'food_item': food_dict.get('food_name', 'Donation Batch'),
        'category': category,
        'predicted_remaining_hours': predicted_hours,
        'recommendation': recommendation,
        'urgency_level': urgency,
        'ui_quality_badge': ui_badge,
        'model_version': 'CareKart-RandomForest-v1.0'
    }

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="CareKart Food Shelf-Life Predictor")
    parser.add_argument('--name', default="Paneer Butter Masala", help="Food item name")
    parser.add_argument('--category', default="Cooked Curry / Gravy", help="Food category")
    parser.add_argument('--storage', default="Ambient Room Temp", help="Storage condition")
    parser.add_argument('--packaging', default="Aluminium Foil Wrap", help="Packaging type")
    parser.add_argument('--temp', type=float, default=32.0, help="Temperature in Celsius")
    parser.add_argument('--humidity', type=float, default=60.0, help="Humidity percentage")
    parser.add_argument('--hours', type=float, default=2.0, help="Hours elapsed since preparation")

    args = parser.parse_args()

    sample = {
        'food_name': args.name,
        'category': args.category,
        'storage_condition': args.storage,
        'packaging_type': args.packaging,
        'temperature_c': args.temp,
        'humidity_percent': args.humidity,
        'hours_since_cooking': args.hours
    }

    result = predict_shelf_life(sample)

    print("\n================ CareKart AI Prediction Output ================")
    print(f" Food Item:             {result['food_item']} ({result['category']})")
    print(f" Predicted Shelf Life:  {result['predicted_remaining_hours']} Hours Remaining")
    print(f" Donation Safety:       {result['recommendation']}")
    print(f" Urgency Level:         {result['urgency_level']}")
    print(f" Status Badge:          {result['ui_quality_badge']}")
    print("===============================================================\n")
