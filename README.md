# CareKart — AI/ML Food Shelf-Life & Expiry Prediction Module 🤖🍲

> **Final Year Engineering Capstone Project (2026-27)**  
> **Institution:** Swami Keshvanand Institute of Technology, Management & Gramothan (SKIT), Jaipur  
> **Department:** Computer Science & Engineering (Data Science)  
> **Project ID:** `SKIT/DS/2023-2027/02`  
> **SDG Mapping:** UN SDG 2 — **Zero Hunger**  
> **Mentor:** Mrs. Abha Jain (Assistant Professor-2, CSE)  
> **Coordinator:** Dr. Sumit Mathur  
> **Role / Developer:** Harshit Goyal (AI & ML Developer)  
> **Sprint Scope:** Sprints 1, 2, and 3 Complete (Requirements **FR-003**)  

---

## 📌 Module Overview
This repository contains the Machine Learning pipeline developed for **CareKart** to predict the remaining edible shelf-life of surplus food before it is listed on the platform.

As identified in the project literature survey (*Zhang et al. 2026, "Shelf-Life Prediction"* and *Kusumawati et al. 2025*), food donation platforms fail when food spoils en-route. Our AI model acts as an automated quality gatekeeper (**Requirement FR-003**).

---

## 📅 Sprint Deliverables Completed (Sprints 1 to 3)

| Sprint | Task Name | Deliverables & Artifacts Completed | Status |
|---|---|---|---|
| **Sprint 1** | **Data Collection & Processing** | `src/data_collection.py`, 3,000 domain-grounded records in `data/raw/` and `data/processed/`, data validation & cleaning pipeline | **DONE** |
| **Sprint 2** | **EDA (Exploratory Data Analysis)** | `src/eda.py`, statistical summary, correlation matrix, 4 publication-quality visualization charts in `reports/figures/`, markdown insights report | **DONE** |
| **Sprint 3** | **AI & ML Model Development** | `src/train_model.py`, Scikit-Learn **Random Forest Regressor**, baseline model benchmarking, feature importance chart, serialized binaries in `models/` | **DONE** |

---

## 🎯 Model Performance & Evaluation Metrics

We benchmarked the proposed **Random Forest Regressor** against standard baseline Linear Regression:

| Algorithm / Metric | $R^2$ Score (Accuracy) | Mean Absolute Error (MAE) | Root Mean Squared Error (RMSE) | 5-Fold Cross Validation |
|---|---|---|---|---|
| **Baseline Linear Regression** | 0.8856 | 2.052 hours | 2.610 hours | 0.8812 |
| **CareKart Random Forest Regressor** | **0.9827** | **0.614 hours** (~36 mins) | **1.021 hours** | **0.9776 (±0.005)** |

### Top Predictive Features (from `models/model_metadata.json`):
1. **Storage Temperature (°C):** 28.40% contribution (higher ambient heat in Jaipur drastically accelerates microbial degradation)
2. **Refrigerated Storage (4°C–7°C):** 25.51% contribution (cold chain multiplies shelf life by ~2.8x)
3. **Moisture Level:** 17.15% contribution (high water activity curries spoil 3x faster than dry rotis)
4. **Hours Since Cooking:** 10.83% contribution
5. **Packaging Type (Open Container vs Airtight):** 10.31% contribution

---

## 📂 Directory Structure
```
carekart-ai/
├── README.md                          # Harshit Goyal sprint documentation
├── requirements.txt                   # Python dependencies (scikit-learn, pandas, flask, etc.)
│
├── data/
│   ├── raw/
│   │   └── carekart_food_shelf_life_raw.csv    # 3,000 generated samples (Sprint 1)
│   └── processed/
│       └── carekart_food_cleaned.csv           # Cleaned & scaled dataset (Sprint 1)
│
├── notebooks/
│   ├── 01_data_collection_and_processing.ipynb # Interactive notebook for Sprint 1
│   ├── 02_exploratory_data_analysis.ipynb      # Interactive notebook for Sprint 2
│   └── 03_model_development_random_forest.ipynb# Interactive notebook for Sprint 3
│
├── src/
│   ├── data_collection.py             # Data synthesis, cleaning & validation pipeline
│   ├── eda.py                         # Statistical correlation & plot generator
│   ├── train_model.py                 # Scikit-Learn model training & evaluation
│   ├── predict.py                     # CLI inference tool for test food batches
│   └── app.py                         # Flask REST API microservice (Sprint 5 ready!)
│
├── models/
│   ├── random_forest_expiry_model.pkl # Trained Scikit-Learn Random Forest Regressor
│   ├── preprocessor.pkl               # OneHotEncoder + StandardScaler transformer
│   └── model_metadata.json            # Parameters, evaluation metrics & feature list
│
└── reports/
    ├── eda_summary_report.md          # Comprehensive Sprint 2 findings report
    └── figures/
        ├── target_distribution.png    # Shelf-life frequency histogram
        ├── shelf_life_by_category.png # Ranked duration by Indian food category
        ├── temperature_vs_shelflife.png# Thermal degradation gradient
        ├── correlation_matrix.png     # Feature correlation heatmap
        ├── feature_importance.png     # Feature importance bar chart
        └── actual_vs_predicted.png    # Parity plot (R2 = 0.983)
```

---

## 🚀 How to Run and Test

### 1. Retrain or Verify the Pipeline
```powershell
cd C:\Users\karte\.gemini\antigravity\scratch\carekart-ai

# Sprint 1: Generate & clean dataset
python src/data_collection.py

# Sprint 2: Run Exploratory Data Analysis & generate plots
python src/eda.py

# Sprint 3: Train Random Forest Regressor & evaluate metrics
python src/train_model.py
```

### 2. Run Test Prediction via CLI
Predict the safe remaining hours for any food item:
```powershell
python src/predict.py --name "Paneer Butter Masala" --category "Cooked Curry / Gravy" --storage "Ambient Room Temp" --temp 30 --hours 2
```

### 3. Launch the REST API Microservice
Start the Flask API to serve predictions to Karan's Spring Boot backend or the React web portal:
```powershell
python src/app.py
```
* Health Endpoint: `http://localhost:5000/api/health`
* Prediction Endpoint: `POST http://localhost:5000/api/predict-expiry`
* Sample Request Payload:
  ```json
  {
    "food_name": "Dal Makhani",
    "category": "Dal & Lentils",
    "storage_condition": "Ambient Room Temp",
    "packaging_type": "Covered Degchi / Pot",
    "temperature_c": 32.0,
    "humidity_percent": 60.0,
    "hours_since_cooking": 2.5
  }
  ```

---

## 🎓 Academic Viva Questions & Answers for Harshit Goyal

| Examiner Question | Model Answer |
|---|---|
| **"Why did you choose Random Forest over a Single Decision Tree or Linear Regression?"** | *"A single decision tree overfits noisy biological data, while Linear Regression assumes linear degradation ($R^2 = 0.885$). Random Forest is an ensemble of 150 bagged decision trees with feature subsampling, reducing variance and capturing non-linear threshold effects like rapid bacterial proliferation above 30°C, achieving an $R^2$ of 0.9827."* |
| **"What are the top features affecting food shelf life?"** | *"Our feature importance analysis revealed that storage temperature ($28.4\%$) and cold-chain refrigeration ($25.5\%$) are the dominant factors, followed by food moisture content ($17.1\%$) and elapsed kitchen time ($10.8\%$) as per FSSAI safety norms."* |
| **"How does your ML module connect with the rest of the CareKart team?"** | *"The model is serialized into `.pkl` binaries and exposed as a lightweight REST microservice (`app.py`). When a donor posts food in Kartavya's React web app or Harsh's Android app, Karan's Spring Boot backend calls `POST /api/predict-expiry` to validate shelf-life before listing."* |
