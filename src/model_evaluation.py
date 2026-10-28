
"""
CareKart AI/ML Module - Sprint 4: Model Evaluation
Evaluates the existing Random Forest model on a held-out test set.
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error,
    median_absolute_error,
    explained_variance_score,
)


def evaluate_model(base_dir):
    data_path = os.path.join(
        base_dir, "data", "processed",
        "carekart_food_cleaned.csv"
    )
    models_dir = os.path.join(base_dir, "models")
    reports_dir = os.path.join(base_dir, "reports")
    figures_dir = os.path.join(reports_dir, "figures")

    os.makedirs(reports_dir, exist_ok=True)
    os.makedirs(figures_dir, exist_ok=True)

    model_path = os.path.join(
        models_dir, "random_forest_expiry_model.pkl"
    )
    preprocessor_path = os.path.join(
        models_dir, "preprocessor.pkl"
    )

    # Validate required files
    for path in [data_path, model_path, preprocessor_path]:
        if not os.path.exists(path):
            raise FileNotFoundError(
                f"Required file not found: {path}"
            )

    df = pd.read_csv(data_path)

    feature_cols = [
        "category",
        "storage_condition",
        "packaging_type",
        "temperature_c",
        "humidity_percent",
        "hours_since_cooking",
        "moisture_level",
    ]
    target_col = "remaining_shelf_life_hours"

    required_cols = feature_cols + [target_col]
    missing_cols = [
        col for col in required_cols if col not in df.columns
    ]
    if missing_cols:
        raise ValueError(
            f"Dataset is missing columns: {missing_cols}"
        )

    df = df.dropna(subset=required_cols)

    X = df[feature_cols]
    y = df[target_col]

    # Reproduce the same split used during Sprint 3.
    _, X_test, _, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
    )

    model = joblib.load(model_path)
    preprocessor = joblib.load(preprocessor_path)

    X_test_processed = preprocessor.transform(X_test)
    predictions = model.predict(X_test_processed)

    errors = predictions - y_test.to_numpy()

    metrics = {
        "model": "CareKart Random Forest Regressor",
        "evaluation_samples": int(len(y_test)),
        "r2_score": round(float(r2_score(y_test, predictions)), 4),
        "mae_hours": round(
            float(mean_absolute_error(y_test, predictions)), 4
        ),
        "rmse_hours": round(
            float(np.sqrt(mean_squared_error(y_test, predictions))),
            4,
        ),
        "median_absolute_error_hours": round(
            float(median_absolute_error(y_test, predictions)), 4
        ),
        "explained_variance_score": round(
            float(explained_variance_score(y_test, predictions)),
            4,
        ),
        "mean_error_hours": round(float(np.mean(errors)), 4),
        "within_1_hour_percent": round(
            float(np.mean(np.abs(errors) <= 1.0) * 100), 2
        ),
        "within_2_hours_percent": round(
            float(np.mean(np.abs(errors) <= 2.0) * 100), 2
        ),
    }

    # Save detailed predictions and errors.
    prediction_df = pd.DataFrame({
        "actual_shelf_life_hours": y_test.to_numpy(),
        "predicted_shelf_life_hours": predictions,
        "prediction_error_hours": errors,
        "absolute_error_hours": np.abs(errors),
    })

    prediction_path = os.path.join(
        reports_dir, "model_evaluation_predictions.csv"
    )
    prediction_df.to_csv(prediction_path, index=False)

    # Save evaluation metrics.
    metrics_path = os.path.join(
        reports_dir, "model_evaluation_metrics.json"
    )
    with open(metrics_path, "w", encoding="utf-8") as file:
        json.dump(metrics, file, indent=2)

    # Plot prediction error distribution.
    plt.figure(figsize=(9, 5))
    plt.hist(errors, bins=30, edgecolor="black")
    plt.axvline(0, linestyle="--", linewidth=2)
    plt.title("CareKart Model Prediction Error Distribution")
    plt.xlabel("Prediction Error (Predicted - Actual Hours)")
    plt.ylabel("Number of Test Samples")
    plt.tight_layout()

    error_plot_path = os.path.join(
        figures_dir, "prediction_error_distribution.png"
    )
    plt.savefig(error_plot_path, dpi=200)
    plt.close()

    print("\n=== CareKart Sprint 4: Model Evaluation ===")
    for key, value in metrics.items():
        print(f"{key}: {value}")

    print(f"\nMetrics saved: {metrics_path}")
    print(f"Predictions saved: {prediction_path}")
    print(f"Error chart saved: {error_plot_path}")


if __name__ == "__main__":
    project_dir = os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
    evaluate_model(project_dir)
