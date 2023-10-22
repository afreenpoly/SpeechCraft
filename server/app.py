# app.py

from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/SpeechCraft'
mongo = PyMongo(app)

@app.route('/register', methods=['POST'])
def register():

    # Define the collection name
    collection_name = "info"
    data = request.json
    first_name = data['first_name']
    last_name = data['last_name']
    dob = data['dob']
    known_language = data['known_language']

    user_data = {
        'first_name': first_name,
        'last_name': last_name,
        'dob': dob,
        'known_language': known_language
    }

    # Access the specified collection within the database
    users = mongo.db[collection_name]
    user_id = users.insert_one(user_data).inserted_id

    return jsonify({"message": "User registered successfully", "user_id": str(user_id)})


if __name__ == '__main__':
    app.run(debug=True)
