from flask import Flask, jsonify, request
from PercentageCalc.dataCalculator import calculate_risk_percentage, extract_coefficients
app = Flask(__name__)

@app.route('/getPercentage', methods=['POST'])
def getPercentage():
    print ("Received request")    
    # Get the data from the request
    data = request.get_json()
    
    # Calculate the percentage
    percentage = calculate_risk_percentage(data, extract_coefficients('./Data/HeartDisease.csv', ['HeartDisease']))
    
    # Return the result as a JSON response
    return jsonify({'percentage': percentage})

while __name__ == '__main__':
    app.run(debug=True)
