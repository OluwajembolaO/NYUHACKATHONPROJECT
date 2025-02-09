import pandas as pd
from sklearn.linear_model import LogisticRegression
import numpy as np

def calculate_risk_weights(data_path='./filtered_data.csv'):
    # Read the CSV file
    df = pd.read_csv(data_path)
    
    # Create dummy variables for categorical columns
    categorical_columns = ['Smoking', 'AlcoholDrinking', 'Stroke', 'DiffWalking', 
                         'Sex', 'AgeCategory', 'Race', 'Diabetic', 'PhysicalActivity',
                         'Asthma', 'KidneyDisease', 'SkinCancer']
    
    # Store original categories before encoding
    X = pd.get_dummies(df[categorical_columns], prefix=categorical_columns)
    
    # Convert target variable to numeric (0 for 'No', 1 for 'Yes')
    y = (df['HeartDisease'] == 'Yes').astype(int)
    
    # Add numeric columns if they exist in your dataset
    numeric_columns = ['BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime', 'GenHealth']
    for col in numeric_columns:
        if col in df.columns:
            X[col] = df[col]
    
    # Fit logistic regression
    model = LogisticRegression(max_iter=1000)
    model.fit(X, y)
    
    # Calculate weights
    weights = {}
    for feature, weight in zip(X.columns, model.coef_[0]):
        weights[feature] = weight
    
    # Normalize weights to sum to 1 (using absolute values for normalization)
    total_weight = sum(abs(val) for val in weights.values())
    normalized_weights = {k: v/total_weight for k, v in weights.items()}
    
    # Sort weights by absolute importance
    sorted_weights = dict(sorted(normalized_weights.items(), key=lambda x: abs(x[1]), reverse=True))
    
    return sorted_weights

if __name__ == "__main__":
    weights = calculate_risk_weights()
    
    # Create a dictionary to store the categorized weights
    categories = {}
    for factor, weight in weights.items():
        category = factor.split('_')[0]  # Get the category (first part before the underscore)
        value = factor.split('_')[1] if len(factor.split('_')) > 1 else 'value'  # Get the value (second part)

        # Add the category to the dictionary if it's not already present
        if category not in categories:
            categories[category] = {}
        
        # Store the value and its corresponding weight in the category
        categories[category][value] = weight
    
    # Now, the categories dictionary contains the data in the structure: 
    # {'category': {'value': weight, ...}, ...}
    
    # If you want to check the dictionary structure
    print(categories)

