"""
CareKart AI/ML Module — Sprint 1: Data Collection & Preprocessing
Developer: Harshit Goyal (AI & ML Dev, Team DS-02, SKIT Jaipur)
Project: CareKart — Food Redistribution System (SDG 2: Zero Hunger)
"""

import os
import numpy as np
import pandas as pd

def generate_food_shelf_life_dataset(n_samples=2500, random_seed=42):
    """
    Synthesize realistic, domain-grounded food quality and shelf-life data
    based on FSSAI guidelines, typical Indian food profiles, and Jaipur climate ranges.
    """
    np.random.seed(random_seed)

    # Common food categories encountered in Indian food redistribution
    categories = [
        'Cooked Curry / Gravy',      # High moisture, high microbial spoilage rate
        'Cooked Rice / Biryani',     # Prone to Bacillus cereus if left at room temp
        'Dal & Lentils',             # High moisture, rapid acidification
        'Indian Breads (Roti/Naan)', # Low-to-moderate moisture, slower spoilage
        'Fried Items (Samosa/Puri)', # Low moisture, moderate shelf life
        'Dairy & Desserts',          # Extremely perishable, high risk
        'Raw Vegetables & Salad',    # High water activity, prone to wilting
        'Bakery / Packaged Breads'   # Low water activity, preservatives present
    ]

    food_items_map = {
        'Cooked Curry / Gravy': ['Paneer Butter Masala', 'Mixed Veg Curry', 'Chole Gravy', 'Dum Aloo', 'Kadhai Paneer'],
        'Cooked Rice / Biryani': ['Jeera Rice', 'Veg Biryani', 'Pulao', 'Khichdi', 'Steamed Rice'],
        'Dal & Lentils': ['Dal Makhani', 'Dal Tadka', 'Sambhar', 'Yellow Dal', 'Chana Dal'],
        'Indian Breads (Roti/Naan)': ['Tandoori Roti', 'Phulka Chapati', 'Butter Naan', 'Paratha', 'Puri'],
        'Fried Items (Samosa/Puri)': ['Aloo Samosa', 'Veg Cutlet', 'Pakoda', 'Kachori', 'Spring Roll'],
        'Dairy & Desserts': ['Gulab Jamun in Chashni', 'Rasgulla', 'Kheer / Payasam', 'Paneer Tikka', 'Sweet Lassi'],
        'Raw Vegetables & Salad': ['Cucumber Tomato Salad', 'Sprouts Salad', 'Fruit Chaat', 'Boiled Corn Salad'],
        'Bakery / Packaged Breads': ['White Bread Loaf', 'Pav Buns', 'Dinner Rolls', 'Fruit Buns']
    }

    packaging_types = ['Open Container', 'Covered Degchi / Pot', 'Aluminium Foil Wrap', 'Airtight Food Box']
    storage_methods = ['Ambient Room Temp', 'Refrigerated (4-7C)', 'Insulated Hot Pot (>55C)']

    rows = []

    for i in range(n_samples):
        cat = np.random.choice(categories, p=[0.20, 0.18, 0.16, 0.14, 0.10, 0.08, 0.06, 0.08])
        food_name = np.random.choice(food_items_map[cat])
        packaging = np.random.choice(packaging_types, p=[0.25, 0.35, 0.25, 0.15])
        storage = np.random.choice(storage_methods, p=[0.60, 0.25, 0.15])

        # Temperature in Celsius: Ambient (24 to 38 C in Jaipur), Refrigerated (3 to 8 C), Insulated (50 to 65 C)
        if storage == 'Refrigerated (4-7C)':
            temperature = np.random.uniform(3.0, 7.5)
        elif storage == 'Insulated Hot Pot (>55C)':
            temperature = np.random.uniform(50.0, 65.0)
        else:
            temperature = np.random.uniform(22.0, 39.0)

        # Ambient Humidity percentage (30% to 80%)
        humidity = np.random.uniform(30.0, 80.0)

        # Elapsed hours since food was prepared in the kitchen (0.5 to 12.0 hours)
        hours_since_prep = np.random.uniform(0.5, 12.0)

        # Moisture content rating (1 = low, 2 = medium, 3 = high)
        if cat in ['Cooked Curry / Gravy', 'Dal & Lentils', 'Dairy & Desserts']:
            moisture_score = 3
        elif cat in ['Cooked Rice / Biryani', 'Raw Vegetables & Salad']:
            moisture_score = 2
        else:
            moisture_score = 1

        # Spoilage sensitivity base parameter
        sensitivity = {
            'Dairy & Desserts': 1.6,
            'Cooked Curry / Gravy': 1.4,
            'Dal & Lentils': 1.3,
            'Cooked Rice / Biryani': 1.2,
            'Raw Vegetables & Salad': 1.1,
            'Indian Breads (Roti/Naan)': 0.8,
            'Fried Items (Samosa/Puri)': 0.7,
            'Bakery / Packaged Breads': 0.5
        }[cat]

        # Packaging protection factor
        pkg_protection = {
            'Open Container': 0.6,
            'Covered Degchi / Pot': 0.85,
            'Aluminium Foil Wrap': 1.05,
            'Airtight Food Box': 1.30
        }[packaging]

        # Max safe shelf-life model (ground truth physics based)
        if storage == 'Refrigerated (4-7C)':
            base_safe_hours = 28.0 / sensitivity
        elif storage == 'Insulated Hot Pot (>55C)':
            base_safe_hours = 16.0 / sensitivity
        else:
            # Ambient temperature degradation: higher temp accelerates microbial growth
            temp_penalty = max(1.0, (temperature - 20.0) / 7.0)
            base_safe_hours = (13.0 / (sensitivity * temp_penalty))

        total_safe_hours = base_safe_hours * pkg_protection

        # Noise to mimic real-world biological variations
        noise = np.random.normal(0, 0.4)
        total_safe_hours = max(2.0, total_safe_hours + noise)

        # Remaining shelf-life = total safe hours - elapsed hours
        remaining_hours = total_safe_hours - hours_since_prep
        remaining_hours = round(float(np.clip(remaining_hours, 0.0, 24.0)), 2)

        # Overall safety score (0 to 100%)
        safety_score = round(float(np.clip((remaining_hours / total_safe_hours) * 100.0, 0.0, 100.0)), 1)
        safe_to_donate = 1 if remaining_hours >= 3.0 and safety_score >= 40.0 else 0

        rows.append({
            'donation_id': f'CK-ML-{i+10001}',
            'food_name': food_name,
            'category': cat,
            'storage_condition': storage,
            'packaging_type': packaging,
            'temperature_c': round(float(temperature), 1),
            'humidity_percent': round(float(humidity), 1),
            'hours_since_cooking': round(float(hours_since_prep), 1),
            'moisture_level': moisture_score,
            'spoilage_sensitivity': sensitivity,
            'remaining_shelf_life_hours': remaining_hours,
            'safety_score': safety_score,
            'safe_for_donation': safe_to_donate
        })

    df = pd.DataFrame(rows)
    return df

def clean_and_process_dataset(raw_df):
    """
    Cleans raw data, handles outliers/missing values, and structures features for modeling.
    """
    df = raw_df.copy()

    # Verify no NaN values
    df = df.dropna()

    # Clip numerical outliers to realistic boundaries
    df['temperature_c'] = df['temperature_c'].clip(0.0, 70.0)
    df['humidity_percent'] = df['humidity_percent'].clip(10.0, 100.0)
    df['hours_since_cooking'] = df['hours_since_cooking'].clip(0.1, 24.0)

    return df

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    raw_path = os.path.join(base_dir, 'data', 'raw', 'carekart_food_shelf_life_raw.csv')
    processed_path = os.path.join(base_dir, 'data', 'processed', 'carekart_food_cleaned.csv')

    print("[Sprint 1] Generating and Collecting Food Shelf-Life Dataset...")
    raw_data = generate_food_shelf_life_dataset(n_samples=3000, random_seed=42)
    raw_data.to_csv(raw_path, index=False)
    print(f" Saved Raw Dataset to: {raw_path} ({len(raw_data)} samples)")

    print("[Sprint 1] Cleaning & Preprocessing Dataset...")
    cleaned_data = clean_and_process_dataset(raw_data)
    cleaned_data.to_csv(processed_path, index=False)
    print(f" Saved Cleaned Dataset to: {processed_path}")
    print("\nDataset Summary Preview:")
    print(cleaned_data[['category', 'storage_condition', 'temperature_c', 'remaining_shelf_life_hours', 'safe_for_donation']].head(5))
