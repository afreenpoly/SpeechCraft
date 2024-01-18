# app.py
import os
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient

app = Flask(__name__)

MONGO_URI = f"mongodb+srv://afreenpoly:" + os.environ.get('MONGO_PASSWORD') + "@studetails.ebwix9o.mongodb.net/"
# Connect to MongoDB
client = MongoClient(MONGO_URI)

@app.route('/register', methods=['POST'])
def register():
    
    db = client.Studetails
    # Define the collection name
    collection= db.Information
    data = request.json
    first_name = data['first_name']
    last_name = data['last_name']
    dob = data['dob']
    known_language = data['known_language']
    email = data['email']
    password = data['password']

    user_data = {
        'first_name': first_name,
        'last_name': last_name,
        'dob': dob,
        'known_language': known_language,
        'email': email,
        'password': password
    }

    # Access the specified collection within the database
    
    user_id = collection.insert_one(user_data)

    return jsonify({"message": "User registered successfully", "user_id": str(user_id)})


if __name__ == '__main__':
    app.run(debug=True)
