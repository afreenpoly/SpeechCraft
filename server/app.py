# app.py
import os
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient
from dotenv import load_dotenv

# Load variables from the .env file
load_dotenv()

app = Flask(__name__)

MONGO_URI = f"mongodb+srv://afreenpoly:" + os.getenv('MONGO_PASSWORD') + "@studetails.ebwix9o.mongodb.net/"
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

    existing_user = collection.find_one({'email': email})
    if existing_user:
        return jsonify({"message": "User already exists"})

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

@app.route('/checkAuthorization', methods=['POST'])
def checkAuthorization():
    db = client.Studetails
    collection = db.Information

    data = request.json
    email = data['email']
    password = data['password']

    # Query the database to check if the provided email and password match any user
    user = collection.find_one({'email': email, 'password': password})

    if user:
        user_details = {
            'user_id': str(user.get('_id')),
            'first_name': user.get('first_name'),
            'last_name': user.get('last_name'),
            'email': user.get('email'),
            'dob':"2024-01-13",
            'known_language':"malayalam"
        }
        return jsonify({"message": "Authorization successful", "user":user_details})
    else:
        return jsonify({"message": "Authorization failed"})





if __name__ == '__main__':
    app.run(debug=True)
