import math

def calculate_heart_disease_probability(input_data):
    """
    Calculate the probability of heart disease based on input data and logistic regression coefficients.
    
    :param input_data: A dictionary containing feature names as keys and the individual's feature values as values.
    :return: The probability of the individual having heart disease (between 0 and 1).
    """
    
    # Calculate the logit (linear combination of features and coefficients)
    logit = coefficients['intercept']
    
    for feature, value in input_data.items():
        feature_name = feature.replace(" ", "_")  # Format feature names to match the coefficients
        if feature_name in coefficients:
            logit += coefficients[feature_name] * value
    
    # Apply the sigmoid function to get the probability
    probability = 1 / (1 + math.exp(-logit))
    
    return probability