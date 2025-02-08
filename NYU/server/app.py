from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def root():
    return jsonify({'message': 'Welcome to the API'})

while __name__ == '__main__':
    app.run(debug=True)
