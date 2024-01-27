# app.py
import os
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv

# Load variables from the .env file
load_dotenv()

app = Flask(__name__)

MONGO_URI = f"mongodb+srv://afreenpoly:" + os.getenv('MONGO_PASSWORD') + "@studetails.ebwix9o.mongodb.net/"
# Connect to MongoDB
client = MongoClient(MONGO_URI)

@app.route('/register', methods=['POST'])
def register():
    try:
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
            'password': password,
            'languages': [],
            'stats': {},
            'friend_requests': [],
            'friends':[]
        }

        # Access the specified collection within the database
        user = collection.insert_one(user_data)

        return jsonify({"message": "User registered successfully", "user_id": str(user.inserted_id)})
    except Exception as e:
        return jsonify({"message": "User registeration failed."})

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
        return jsonify({"message": "Authorization successful", "user_id":str(user.get('_id'))})
    else:
        return jsonify({"message": "Authorization failed"})
    

@app.route('/getUserInfo', methods=['POST'])
def getUserInfo():
    db = client.Studetails
    collection = db.Information

    data = request.json
    user_id = data['user_id']

    # Query the database to check if the provided email and password match any user
    user = collection.find_one({'_id': ObjectId(user_id)})

    if user:
        # get list of languages without thier values
        languagesList = []
        for lang in user.get('languages'):
            languagesList.extend(lang.keys())

        user_details = {
            'user_id': user_id,
            'first_name': user.get('first_name'),
            'last_name': user.get('last_name'),
            'dob':user.get('dob'),
            'known_language':user.get('known_language'),
            'email': user.get('email'),
            'languages': languagesList,
            'stats': user.get('stats')
        }
        return jsonify({"message": "Authorization successful", "user":user_details})
    else:
        return jsonify({"message": "Authorization failed"})


@app.route('/addLangauge', methods=['POST'])
def addLangauge():
    db = client.Studetails
    collection = db.Information

    data = request.json
    user_id = data['user_id']
    language = data['language']

    user = collection.find_one({'_id': ObjectId(user_id)})

    if user:
        # Add the language to the languages array with value 1
        languages = user.get('languages')
        languages.append({language:1})

        updated_user = collection.update_one({'_id': ObjectId(user_id)},{"$set": {"languages": languages}})
        if updated_user.modified_count > 0:
            return jsonify({"message": "Language added successfully", "user_id": user_id})
        else:
            return jsonify({"message": "Error in updating languages list"})
    else:
        return jsonify({"message": "Unauthorized user"})

@app.route('/getWordPair', methods=['POST'])
def getWordPair():
    db = client.Studetails
    collection = db.Information

    data = request.json
    user_id = data['user_id']
    language = data['language']
    status = data['status']

    # Query the database to check if the provided email and languages match any user
    user = collection.find_one({'_id': ObjectId(user_id)})

    if user:
        index = -1
        for lang in user.get('languages'):
            if language in lang:
                # If language exists, store its value
                index = lang[language]

                if status == 1:
                    lang[language] += 1
                    collection.update_one({'_id': ObjectId(user_id)},{"$set": {"languages": user.get('languages')}})
                    index += 1
                
        newWord = "fetch Word from "+language+"DB"
        knownWord ="fetch Known Word from "+language+"DB"

        # Open the file
        try:
            with open("languages\\"+ language + ".txt", "r",  encoding="utf-8") as file:
                # Read all lines into a list
                lines = file.readlines()
                if len(lines) >= index:
                    # Print the word on the index-th line (assuming each line contains a single word)
                    newWord =  lines[index-1].strip()
                else:
                    print("There is no more words")
        except FileNotFoundError:
            print("File for", language, "not found")
        
        
        try:
            with open("languages\\"+ user.get('known_language') + ".txt", "r",  encoding="utf-8") as file:
                # Read all lines into a list
                lines = file.readlines()
                if len(lines) >= index:
                    # Print the word on the index-th line (assuming each line contains a single word)
                    knownWord =  lines[index-1].strip()
                else:
                    print("There is no more words")
        except FileNotFoundError:
            print("File for", language, "not found")
        

        """ for langObj in languagesList:
            if language in langObj:
                langObj[language] = langObj.get(language, 0) + 1
                collection.update_one({'_id': user_id}, {'$set': {'languages': languagesList}}) """
            
        wordPair = {
            'newWord': newWord,
            'knownWord':knownWord,
        }
        return jsonify({"message": "Updated languages list", "wordPair":wordPair})
    else:
        return jsonify({"message": "Unauthorized user"})


@app.route('/sendFriendRequest', methods=['POST'])
def sendFriendRequest():
    try:
        data = request.json
        sender_id = data['sender_id']
        receiver_id = data['receiver_id']
        db = client.Studetails
        collection = db.Information
        
        sender = collection.find_one({'_id': ObjectId(sender_id)})
        receiver = collection.find_one({'_id': ObjectId(receiver_id)})

        if not sender or not receiver:
            return jsonify({"message": "Invalid sender or receiver"})

        # Check if the friend request already exists
        existing_request = next((req for req in sender['friend_requests'] if req['user_id'] == receiver_id), None)

        if existing_request:
            return jsonify({"message": "Friend request already sent"})

        # Add friend request to sender's list
        sender['friend_requests'].append({
            'user_id': receiver_id,
            'status': 'pending',
        })

        # Add your ID to the receiver's friend list
        receiver['friends'].append({
            'user_id': sender_id,
            'status': 'pending',
        })

        collection.update_one({'_id': ObjectId(sender_id)}, {'$set': {'friend_requests': sender['friend_requests']}})
        collection.update_one({'_id': ObjectId(receiver_id)}, {'$set': {'friends': receiver['friends']}})

        return jsonify({"message": "Friend request sent successfully"})
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Failed to send friend request"})


@app.route('/acceptFriendRequest', methods=['POST'])
def acceptFriendRequest():
    try:
        data = request.json
        sender_id = data['sender_id']
        receiver_id = data['receiver_id']
        db = client.Studetails
        collection = db.Information
        
        sender = collection.find_one({'_id': ObjectId(sender_id)})
        receiver = collection.find_one({'_id': ObjectId(receiver_id)})

        if not sender or not receiver:
            return jsonify({"message": "Invalid sender or receiver"})

        # Check if the friend request exists
        friend_request = next((req for req in sender['friend_requests'] if req['user_id'] == receiver_id), None)

        if not friend_request or friend_request['status'] == 'accepted':
            return jsonify({"message": "Invalid friend request"})

        # Update friend request status to 'accepted'
        friend_request['status'] = 'accepted'

        # Add the sender to the receiver's friends list
        receiver['friends'].append({
            'user_id': sender_id,
            'status': 'accepted',
        })

        # Add the receiver to the sender's friends list
        sender['friends'].append({
            'user_id': receiver_id,
            'status': 'accepted',
        })

        # Update sender's friend requests, receiver's friends list, and sender's friends list
        collection.update_one({'_id': ObjectId(sender_id)}, {'$set': {'friend_requests': sender['friend_requests'], 'friends': sender['friends']}})
        collection.update_one({'_id': ObjectId(receiver_id)}, {'$set': {'friends': receiver['friends']}})

        return jsonify({"message": "Friend request accepted successfully"})
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Failed to accept friend request"})


if __name__ == '__main__':
    app.run(debug=True)
