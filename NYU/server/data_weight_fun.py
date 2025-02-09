import pandas as pd
from sklearn.linear_model import LogisticRegression
import numpy as np
import json

def calculate_risk_weights(data_path='server/filtered_data.csv', output_path='server/heart_disease_model.json'):
    # Read the CSV file
    df = pd.read_csv(data_path)
    
    # Define columns
    categorical_columns = ['Smoking', 'AlcoholDrinking', 'Stroke', 'DiffWalking', 
                         'Sex', 'AgeCategory', 'Race', 'Diabetic', 'PhysicalActivity',
                         'Asthma', 'KidneyDisease', 'SkinCancer']
    
    numeric_columns = ['BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime', 'GenHealth']
    
    # Create dummy variables for categorical columns
    X = pd.get_dummies(df[categorical_columns], prefix=categorical_columns)
    
    # Convert target variable to numeric
    y = (df['HeartDisease'] == 'Yes').astype(int)
    
    # Add numeric columns
    for col in numeric_columns:
        if col in df.columns:
            X[col] = df[col]
    
    # Fit logistic regression
    model = LogisticRegression(max_iter=1000)
    model.fit(X, y)
    
    # Create model data structure
    model_data = {
        "metadata": {
            "model_type": "logistic_regression",
            "categorical_features": categorical_columns,
            "numeric_features": numeric_columns,
            "baseline_risk": float(model.intercept_[0])
        },
        "feature_weights": {}
    }
    
    # Store possible values for each categorical feature
    for column in categorical_columns:
        unique_values = df[column].unique()
        weights = {}
        for value in unique_values:
            feature_name = f"{column}_{value}"
            if feature_name in X.columns:
                weight_index = list(X.columns).index(feature_name)
                weights[value] = float(model.coef_[0][weight_index])
        
        model_data["feature_weights"][column] = {
            "type": "categorical",
            "values": weights
        }
    
    # Store numeric feature weights
    for column in numeric_columns:
        if column in X.columns:
            weight_index = list(X.columns).index(column)
            model_data["feature_weights"][column] = {
                "type": "numeric",
                "weight": float(model.coef_[0][weight_index])
            }
    
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
    for feature, value in user_data.items():
        if feature in model_data["feature_weights"]:
            feature_data = model_data["feature_weights"][feature]
            
            if feature_data["type"] == "categorical":
                if value in feature_data["values"]:
                    log_odds += feature_data["values"][value]
            elif feature_data["type"] == "numeric":
                log_odds += feature_data["weight"] * float(value)
    
    # Convert to probability
    probability = 1 / (1 + np.exp(-log_odds))
    return probability

if __name__ == "__main__":
    # Generate and save model data
    model_data = calculate_risk_weights()
    
    # Example usage
    example_user = {
        'AgeCategory': '70-74',
        'Sex': 'Male',
        'Smoking': 'Yes',
        'AlcoholDrinking': 'No',
        'Stroke': 'No',
        'DiffWalking': 'No',
        'Race': 'White',
        'Diabetic': 'No',
        'PhysicalActivity': 'Yes',
        'Asthma': 'No',
        'KidneyDisease': 'No',
        'SkinCancer': 'No',
        'BMI': 25.0,
        'PhysicalHealth': 0,
        'MentalHealth': 0,
        'SleepTime': 7,
        'GenHealth': 'Good'
    }
    
    risk = calculate_absolute_risk(example_user, model_data)
    print(f"\nAbsolute probability of heart disease: {risk:.3%}")

