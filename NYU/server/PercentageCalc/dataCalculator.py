import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression

def extract_coefficients(data_path, target_columns):
    # Read the CSV file
    df = pd.read_csv(data_path)
    
    # Automatically select feature columns (all columns except the target columns)
    feature_columns = [col for col in df.columns if col not in target_columns]
    
    # Dictionary to store coefficients for each health condition
    coefficients = {}
    
    # Convert categorical variables to dummy variables
    X = pd.get_dummies(df[feature_columns], drop_first=True)
    
    # Loop through the target columns and train a model for each condition
    for target in target_columns:
        # Create target variable (0 for No, 1 for Yes)
        y = (df[target] == 'Yes').astype(int)
        
        # Fit logistic regression model
        model = LogisticRegression(max_iter=1000)
        model.fit(X, y)
        
        # Extract coefficients and store them
        coefficients[target] = dict(zip(X.columns, model.coef_[0]))
    
    return coefficients

def calculate_risk_percentage(individual_data, coefficients):
    # Initialize the risk percentage
    z = 0
    
    # Iterate over the coefficients for each health condition
    for feature, value in individual_data.items():
        # Check if the feature exists in the coefficients for each health condition
        for condition, coeffs in coefficients.items():
            if feature in coeffs:
                # If it's a categorical feature (like Smoking_Yes), check if it's present in the individual data
                if isinstance(value, str):  # For categorical variables
                    feature_name = f"{feature}_{value}"
                else:
                    feature_name = feature
                
                if feature_name in coeffs:
                    z += coeffs[feature_name] * value
    
    # Calculate the risk probability using the sigmoid function
    probability = 1 / (1 + np.exp(-z))
    print("Calculated Risk Percentage:", round(probability*100), "%")
    return round(probability*100)  # Return the risk probability
