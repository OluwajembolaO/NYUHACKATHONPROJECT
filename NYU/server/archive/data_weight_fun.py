import pandas as pd
from sklearn.linear_model import LogisticRegression
import numpy as np
import json

def calculate_risk_weights(data_path='server/archive/HeartDisease.csv', output_path='server/heart_disease_model.json'):
    # Read the CSV file
    df = pd.read_csv(data_path)
    
    # Define columns and their metadata
    feature_metadata = {
        'BMI': {'id': 'bmi', 'type': 'numeric'},
        'Smoking': {'id': 'smoking', 'type': 'categorical'},
        'AlcoholDrinking': {'id': 'alcohol', 'type': 'categorical'},
        'Stroke': {'id': 'stroke', 'type': 'categorical'},
        'DiffWalking': {'id': 'diffWalking', 'type': 'categorical'},
        'Sex': {'id': 'sex', 'type': 'categorical'},
        'AgeCategory': {'id': 'age', 'type': 'categorical'},
        'Race': {'id': 'race', 'type': 'categorical'},
        'Diabetic': {'id': 'diabetic', 'type': 'categorical'},
        'PhysicalActivity': {'id': 'physicalActivity', 'type': 'categorical'},
        'PhysicalHealth': {'id': 'physicalHealth', 'type': 'numeric'},
        'MentalHealth': {'id': 'mentalHealth', 'type': 'numeric'},
        'SleepTime': {'id': 'sleepTime', 'type': 'numeric'},
        'Asthma': {'id': 'asthma', 'type': 'categorical'},
        'KidneyDisease': {'id': 'kidneyDisease', 'type': 'categorical'},
        'SkinCancer': {'id': 'skinCancer', 'type': 'categorical'}
    }
    
    # Separate categorical and numeric columns
    categorical_columns = [col for col, meta in feature_metadata.items() if meta['type'] == 'categorical']
    numeric_columns = [col for col, meta in feature_metadata.items() if meta['type'] == 'numeric']
    
    # Create dummy variables for categorical columns
    X = pd.get_dummies(df[categorical_columns], prefix=categorical_columns)
    
    # Add numeric columns to X with their original names
    for col in numeric_columns:
        if col in df.columns:
            # Use the same name as in the original dataframe
            X[col] = df[col]
    
    # Convert target variable to numeric
    y = (df['HeartDisease'] == 'Yes').astype(int)
    
    # Fit logistic regression
    model = LogisticRegression(max_iter=1000)
    model.fit(X, y)
    
    # Create model data structure
    model_data = {
        "metadata": {
            "model_type": "logistic_regression",
            "baseline_risk": float(model.intercept_[0])
        },
        "features": []
    }
    
    # Get all column names and their corresponding weights
    feature_weights = dict(zip(X.columns, model.coef_[0]))
    
    # Store weights for each feature
    for column, meta in feature_metadata.items():
        feature_info = {
            "id": meta['id'],
            "name": column,
            "type": meta['type']
        }
        
        if meta['type'] == 'categorical':
            # Get all dummy columns for this categorical feature
            dummy_cols = [col for col in X.columns if col.startswith(f"{column}_")]
            options = []
            for dummy_col in dummy_cols:
                value = dummy_col.split(f"{column}_")[1]
                options.append({
                    "value": value,
                    "weight": float(feature_weights[dummy_col])
                })
            feature_info["options"] = options
        else:
            # For numeric features, use the original column name
            try:
                feature_info["weight"] = float(feature_weights[column])
            except KeyError:
                print(f"Warning: Could not find weight for {column}. Setting weight to 0.")
                feature_info["weight"] = 0.0
        
        model_data["features"].append(feature_info)
    
    # Save to JSON file
    with open(output_path, 'w') as f:
        json.dump(model_data, f, indent=2)
    
    return model_data

def calculate_absolute_risk(user_data, model_data):
    """
    Calculate absolute risk of heart disease based on user characteristics
    
    Args:
        user_data (dict): User's characteristics
        model_data (dict): Model weights and metadata loaded from JSON
    
    Returns:
        float: Probability of heart disease (0-1)
    """
    # Start with baseline risk
    log_odds = model_data["metadata"]["baseline_risk"]
    
    # Add contribution from each feature
    for feature in model_data["features"]:
        if feature["id"] in user_data:
            value = user_data[feature["id"]]
            
            if feature["type"] == "categorical":
                # Find matching option and add its weight
                for option in feature["options"]:
                    if option["value"] == value:
                        log_odds += option["weight"]
                        break
            else:
                # For numeric features, multiply value by weight
                log_odds += feature["weight"] * float(value)
    
    # Convert to probability
    probability = 1 / (1 + np.exp(-log_odds))
    return probability

if __name__ == "__main__":
    # Generate and save model data
    model_data = calculate_risk_weights()
    print("Model weights have been saved to heart_disease_model.json")

