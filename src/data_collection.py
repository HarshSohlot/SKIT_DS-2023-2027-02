
import os
import numpy as np
import pandas as pd


# ============================================================
# CareKart AI/ML: Food Shelf-Life Dataset Generator
# Sprint 1: Data Collection and Preprocessing
# ============================================================

N_SAMPLES = 100_000
RANDOM_SEED = 42

CATEGORIES = [
    "Cooked Curry / Gravy",
    "Cooked Rice / Biryani",
    "Dal & Lentils",
    "Indian Breads (Roti/Naan)",
    "Fried Items (Samosa/Puri)",
    "Dairy & Desserts",
    "Raw Vegetables & Salad",
    "Bakery / Packaged Breads",
]

FOOD_ITEMS_MAP = {
    "Cooked Curry / Gravy": [
        "Paneer Butter Masala", "Mixed Veg Curry",
        "Chole Gravy", "Dum Aloo", "Kadhai Paneer",
    ],
    "Cooked Rice / Biryani": [
        "Jeera Rice", "Veg Biryani", "Pulao",
        "Khichdi", "Steamed Rice",
    ],
    "Dal & Lentils": [
        "Dal Makhani", "Dal Tadka", "Sambhar",
        "Yellow Dal", "Chana Dal",
    ],
    "Indian Breads (Roti/Naan)": [
        "Tandoori Roti", "Phulka Chapati",
        "Butter Naan", "Paratha", "Puri",
    ],
    "Fried Items (Samosa/Puri)": [
        "Aloo Samosa", "Veg Cutlet", "Pakoda",
        "Kachori", "Spring Roll",
    ],
    "Dairy & Desserts": [
        "Gulab Jamun in Chashni", "Rasgulla",
        "Kheer / Payasam", "Paneer Tikka", "Sweet Lassi",
    ],
    "Raw Vegetables & Salad": [
        "Cucumber Tomato Salad", "Sprouts Salad",
        "Fruit Chaat", "Boiled Corn Salad",
    ],
    "Bakery / Packaged Breads": [
        "White Bread Loaf", "Pav Buns",
        "Dinner Rolls", "Fruit Buns",
    ],
}

PACKAGING_TYPES = [
    "Open Container",
    "Covered Degchi / Pot",
    "Aluminium Foil Wrap",
    "Airtight Food Box",
]

STORAGE_METHODS = [
    "Ambient Room Temp",
    "Refrigerated (4-7C)",
    "Insulated Hot Pot (>55C)",
]

SENSITIVITY = {
    "Dairy & Desserts": 1.6,
    "Cooked Curry / Gravy": 1.4,
    "Dal & Lentils": 1.3,
    "Cooked Rice / Biryani": 1.2,
    "Raw Vegetables & Salad": 1.1,
    "Indian Breads (Roti/Naan)": 0.8,
    "Fried Items (Samosa/Puri)": 0.7,
    "Bakery / Packaged Breads": 0.5,
}

PACKAGING_PROTECTION = {
    "Open Container": 0.60,
    "Covered Degchi / Pot": 0.85,
    "Aluminium Foil Wrap": 1.05,
    "Airtight Food Box": 1.30,
}


def generate_food_shelf_life_dataset(
    n_samples=N_SAMPLES,
    random_seed=RANDOM_SEED,
):
    rng = np.random.default_rng(random_seed)

    category = rng.choice(
        CATEGORIES,
        size=n_samples,
        p=[0.20, 0.18, 0.16, 0.14, 0.10, 0.08, 0.06, 0.08],
    )

    packaging = rng.choice(
        PACKAGING_TYPES,
        size=n_samples,
        p=[0.25, 0.35, 0.25, 0.15],
    )

    storage = rng.choice(
        STORAGE_METHODS,
        size=n_samples,
        p=[0.60, 0.25, 0.15],
    )

    temperature = np.empty(n_samples)
    ambient = storage == "Ambient Room Temp"
    refrigerated = storage == "Refrigerated (4-7C)"
    insulated = storage == "Insulated Hot Pot (>55C)"

    # Variable environmental conditions
    temperature[ambient] = rng.uniform(
        22.0, 39.0, ambient.sum()
    )
    temperature[refrigerated] = rng.uniform(
        3.0, 7.5, refrigerated.sum()
    )
    temperature[insulated] = rng.uniform(
        55.0, 65.0, insulated.sum()
    )

    humidity = rng.uniform(30.0, 80.0, n_samples)
    hours_since_prep = rng.uniform(0.5, 12.0, n_samples)

    sensitivity = np.array(
        [SENSITIVITY[c] for c in category]
    )

    protection = np.array(
        [PACKAGING_PROTECTION[p] for p in packaging]
    )

    moisture_map = {
        "Cooked Curry / Gravy": 3,
        "Cooked Rice / Biryani": 2,
        "Dal & Lentils": 3,
        "Indian Breads (Roti/Naan)": 1,
        "Fried Items (Samosa/Puri)": 1,
        "Dairy & Desserts": 3,
        "Raw Vegetables & Salad": 2,
        "Bakery / Packaged Breads": 1,
    }

    moisture = np.array(
        [moisture_map[c] for c in category]
    )

    # Synthetic shelf-life assumptions.
    # These are simulation rules, not validated food-safety limits.
    temp_penalty = np.maximum(
        1.0, (temperature - 20.0) / 7.0
    )

    base_safe_hours = np.select(
        [refrigerated, insulated],
        [28.0 / sensitivity, 16.0 / sensitivity],
        default=13.0 / (sensitivity * temp_penalty),
    )

    # Small humidity effect, deliberately bounded
    humidity_factor = np.clip(
        1.0 - (humidity - 50.0) * 0.002,
        0.90,
        1.10,
    )

    total_safe_hours = (
        base_safe_hours * protection * humidity_factor
    )

    # Biological variation represented by synthetic noise
    noise = rng.normal(0.0, 0.4, n_samples)
    total_safe_hours = np.maximum(
        2.0, total_safe_hours + noise
    )

    remaining_hours = np.clip(
        total_safe_hours - hours_since_prep,
        0.0,
        24.0,
    )

    safety_score = np.clip(
        (remaining_hours / total_safe_hours) * 100.0,
        0.0,
        100.0,
    )

    safe_for_donation = (
        (remaining_hours >= 3.0) &
        (safety_score >= 40.0)
    ).astype(int)

    food_names = [
        rng.choice(FOOD_ITEMS_MAP[c])
        for c in category
    ]

    df = pd.DataFrame({
        "donation_id": [
            f"CK-ML-{i + 10001}"
            for i in range(n_samples)
        ],
        "food_name": food_names,
        "category": category,
        "storage_condition": storage,
        "packaging_type": packaging,
        "temperature_c": np.round(temperature, 1),
        "humidity_percent": np.round(humidity, 1),
        "hours_since_cooking": np.round(
            hours_since_prep, 1
        ),
        "moisture_level": moisture,
        "spoilage_sensitivity": sensitivity,
        "remaining_shelf_life_hours": np.round(
            remaining_hours, 2
        ),
        "safety_score": np.round(safety_score, 1),
        "safe_for_donation": safe_for_donation,
    })

    return df


def clean_and_process_dataset(raw_df):
    df = raw_df.copy()

    df = df.dropna().drop_duplicates(
        subset=["donation_id"]
    )

    df["temperature_c"] = df["temperature_c"].clip(
        0.0, 70.0
    )
    df["humidity_percent"] = df["humidity_percent"].clip(
        10.0, 100.0
    )
    df["hours_since_cooking"] = (
        df["hours_since_cooking"].clip(0.1, 24.0)
    )

    return df


if __name__ == "__main__":
    base_dir = os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )

    raw_dir = os.path.join(base_dir, "data", "raw")
    processed_dir = os.path.join(
        base_dir, "data", "processed"
    )

    os.makedirs(raw_dir, exist_ok=True)
    os.makedirs(processed_dir, exist_ok=True)

    raw_path = os.path.join(
        raw_dir, "carekart_food_shelf_life_raw.csv"
    )
    processed_path = os.path.join(
        processed_dir, "carekart_food_cleaned.csv"
    )

    print("Generating 100,000 synthetic food records...")

    raw_data = generate_food_shelf_life_dataset(
        n_samples=100_000,
        random_seed=42,
    )

    raw_data.to_csv(raw_path, index=False)
    print(f"Raw dataset saved: {raw_path}")
    print(f"Raw records: {len(raw_data):,}")

    print("Cleaning and preprocessing dataset...")

    cleaned_data = clean_and_process_dataset(raw_data)
    cleaned_data.to_csv(processed_path, index=False)

    print(f"Processed dataset saved: {processed_path}")
    print(f"Processed records: {len(cleaned_data):,}")

    print("\nDataset preview:")
    print(
        cleaned_data[
            [
                "food_name",
                "category",
                "temperature_c",
                "hours_since_cooking",
                "remaining_shelf_life_hours",
                "safe_for_donation",
            ]
        ].head()
    )

    print("\nDonation label distribution:")
    print(
        cleaned_data["safe_for_donation"]
        .value_counts(normalize=True)
        .mul(100)
        .round(2)
        .rename("percentage")
    )
