"""
CareKart AI/ML Module — Sprint 3: Model Development (Random Forest Regressor)
Developer: Harshit Goyal (AI & ML Dev, Team DS-02, SKIT Jaipur)
Project: CareKart — Food Redistribution System (SDG 2: Zero Hunger)
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

def train_carekart_model(data_path, models_dir, figures_dir):
    os.makedirs(models_dir, exist_ok=True)
    os.makedirs(figures_dir, exist_ok=True)

    print("--- [Sprint 3: AI & ML Development] Training Food Expiry Predictor ---")
    df = pd.read_csv(data_path)

    # Features and Target
    feature_cols = [
        'category',
        'storage_condition',
        'packaging_type',
        'temperature_c',
        'humidity_percent',
        'hours_since_cooking',
        'moisture_level'
    ]
    target_col = 'remaining_shelf_life_hours'

    X = df[feature_cols]
    y = df[target_col]

    # Split dataset into 80% train, 20% test
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42
    )
    print(f"Dataset split: {len(X_train)} training samples, {len(X_test)} testing samples")

    # Preprocessing Pipeline
    categorical_features = ['category', 'storage_condition', 'packaging_type']
    numerical_features = ['temperature_c', 'humidity_percent', 'hours_since_cooking', 'moisture_level']

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features)
        ]
    )

    # Fit preprocessor
    X_train_proc = preprocessor.fit_transform(X_train)
    X_test_proc = preprocessor.transform(X_test)

    # 1. Baseline Model Comparison: Linear Regression vs Random Forest
    print("\nComparing Algorithms (Baseline Linear Regression vs Proposed Random Forest):")
    lr = LinearRegression()
    lr.fit(X_train_proc, y_train)
    lr_preds = lr.predict(X_test_proc)
    lr_r2 = r2_score(y_test, lr_preds)
    lr_mae = mean_absolute_error(y_test, lr_preds)
    print(f"  [Linear Regression]       R2 Score: {lr_r2:.4f} | MAE: {lr_mae:.3f} hrs")

    # 2. Proposed Algorithm: Random Forest Regressor
    rf = RandomForestRegressor(
        n_estimators=150,
        max_depth=12,
        min_samples_split=4,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    )
    rf.fit(X_train_proc, y_train)
    rf_preds = rf.predict(X_test_proc)
    rf_r2 = r2_score(y_test, rf_preds)
    rf_mae = mean_absolute_error(y_test, rf_preds)
    rf_rmse = np.sqrt(mean_squared_error(y_test, rf_preds))

    cv_scores = cross_val_score(rf, X_train_proc, y_train, cv=5, scoring='r2')
    print(f"  [Random Forest Regressor] R2 Score: {rf_r2:.4f} | MAE: {rf_mae:.3f} hrs | RMSE: {rf_rmse:.3f} hrs")
    print(f"  [5-Fold Cross Validation] Mean R2:  {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")

    # 3. Feature Importances
    cat_feature_names = preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_features)
    all_feature_names = numerical_features + list(cat_feature_names)
    importances = rf.feature_importances_

    fi_df = pd.DataFrame({
        'feature': all_feature_names,
        'importance': importances
    }).sort_values(by='importance', ascending=False)

    print("\nTop 7 Predictive Features:")
    for idx, row in fi_df.head(7).iterrows():
        print(f"  - {row['feature']}: {row['importance']*100:.2f}%")

    # Plot Feature Importance Chart
    plt.figure(figsize=(10, 6))
    top_fi = fi_df.head(10).sort_values(by='importance', ascending=True)
    plt.barh(top_fi['feature'], top_fi['importance'] * 100, color='#10B981', edgecolor='#065F46')
    plt.title('Random Forest Feature Importance (%) for Food Shelf-Life', fontsize=12, fontweight='bold', pad=12)
    plt.xlabel('Importance Contribution (%)', fontsize=10)
    plt.grid(axis='x', linestyle='--', alpha=0.5)
    plt.tight_layout()
    fi_chart_path = os.path.join(figures_dir, 'feature_importance.png')
    plt.savefig(fi_chart_path, dpi=200)
    plt.close()
    print(f" Feature Importance chart saved to: {fi_chart_path}")

    # Plot Actual vs Predicted
    plt.figure(figsize=(7, 6))
    plt.scatter(y_test, rf_preds, alpha=0.4, color='#059669', edgecolors='none', s=30)
    plt.plot([0, 24], [0, 24], color='#EF4444', linestyle='--', lw=2, label='Ideal 1:1 Parity')
    plt.title(f'Actual vs. Predicted Food Shelf Life (R2 = {rf_r2:.3f})', fontsize=12, fontweight='bold', pad=12)
    plt.xlabel('Actual Shelf Life (Hours)', fontsize=10)
    plt.ylabel('Model Predicted Shelf Life (Hours)', fontsize=10)
    plt.legend()
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.tight_layout()
    parity_chart_path = os.path.join(figures_dir, 'actual_vs_predicted.png')
    plt.savefig(parity_chart_path, dpi=200)
    plt.close()
    print(f" Actual vs Predicted chart saved to: {parity_chart_path}")

    # 4. Save Model Artifacts
    model_file = os.path.join(models_dir, 'random_forest_expiry_model.pkl')
    preprocessor_file = os.path.join(models_dir, 'preprocessor.pkl')
    metadata_file = os.path.join(models_dir, 'model_metadata.json')

    joblib.dump(rf, model_file)
    joblib.dump(preprocessor, preprocessor_file)

    metadata = {
        'model_name': 'CareKart Random Forest Regressor',
        'algorithm': 'RandomForestRegressor',
        'n_estimators': 150,
        'max_depth': 12,
        'test_r2_score': round(float(rf_r2), 4),
        'test_mae_hours': round(float(rf_mae), 3),
        'test_rmse_hours': round(float(rf_rmse), 3),
        'cv_mean_r2': round(float(cv_scores.mean()), 4),
        'features_used': feature_cols,
        'top_features': fi_df.head(5).to_dict(orient='records')
    }

    with open(metadata_file, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2)

    print(f"\n Model files serialized successfully:")
    print(f"  -> Model: {model_file}")
    print(f"  -> Preprocessor: {preprocessor_file}")
    print(f"  -> Metadata: {metadata_file}")

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_file = os.path.join(base_dir, 'data', 'processed', 'carekart_food_cleaned.csv')
    models_dir = os.path.join(base_dir, 'models')
    figures_dir = os.path.join(base_dir, 'reports', 'figures')

    train_carekart_model(data_file, models_dir, figures_dir)
