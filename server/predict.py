from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import os
import base64
import google.generativeai as genai
from pymongo import MongoClient
from datetime import datetime
from bson.objectid import ObjectId
import threading

# pip install flask flask-cors tensorflow numpy pymongo google-generativeai

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('model_.h5')
labels = ['Aloevera', 'Amla', 'Amruthaballi', 'Arali', 'Astma_weed', 'Badipala', 'Balloon_Vine', 'Bamboo', 'Beans', 'Betel', 'Bhrami', 'Bringaraja', 'Caricature', 'Castor', 'Catharanthus', 'Chakte', 'Chilly', 'Citron lime (herelikai)', 'Coffee', 'Common rue(naagdalli)', 'Coriender', 'Curry', 'Doddpathre', 'Drumstick', 'Ekka', 'Eucalyptus', 'Ganigale', 'Ganike', 'Gasagase', 'Ginger', 'Globe Amarnath', 'Guava', 'Henna', 'Hibiscus', 'Honge', 'Insulin', 'Jackfruit', 'Jasmine', 'Kambajala', 'Kasambruga', 'Kohlrabi', 'Lantana', 'Lemon', 'Lemongrass', 'Malabar_Nut', 'Malabar_Spinach', 'Mango', 'Marigold', 'Mint', 'Neem', 'Nelavembu', 'Nerale', 'Nooni', 'Onion', 'Padri', 'Palak(Spinach)', 'Papaya', 'Parijatha', 'Pea', 'Pepper', 'Pomoegranate', 'Pumpkin', 'Raddish', 'Rose', 'Sampige', 'Sapota', 'Seethaashoka', 'Seethapala', 'Spinach1', 'Tamarind', 'Taro', 'Tecoma', 'Thumbe', 'Tomato', 'Tulsi', 'Turmeric', 'ashoka', 'camphor', 'kamakasturi', 'kepala']

genai.configure(api_key="AIzaSyDRCbQipfXAQQvgF9BpFl5ViRPaXfAoB4A")
genai_client = genai.GenerativeModel("gemini-2.0-flash")

client = MongoClient('mongodb+srv://logesh:Qwer1234@testcl.n3rgrj4.mongodb.net/llm?retryWrites=true&w=majority')
db = client['plant_chatbot']
chats_collection = db['chats']

def preprocess_image(img_path):
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=(299, 299))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    return img_array

def get_gemini_response(predicted_label):
    prompt = f"""
    You are a plant expert. Provide a short and crisp summary of the plant {predicted_label}, including:
    - Common name and scientific name (if available).
    - Key medical uses and benefits.
    - Any precautions or warnings.
    - Fun fact (optional).
    Keep the response under 100 words. Avoid lengthy paragraphs.
    """
    response = genai_client.generate_content(prompt)
    return response.text

def save_chat_async(chat_data):
    chats_collection.insert_one(chat_data)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)
        img_array = preprocess_image(file_path)
        predictions = model.predict(img_array)
        score = tf.nn.sigmoid(predictions[0])
        predicted_label = labels[np.argmax(score)]
        confidence = 100 * np.max(score)
        gemini_info = get_gemini_response(predicted_label)
        os.remove(file_path)

        chat_data = {
            'predicted_label': predicted_label,
            'confidence': float(confidence),
            'gemini_info': gemini_info,
            'timestamp': datetime.now(),
            'messages': [],
            'chat_id': str(ObjectId())
        }
        threading.Thread(target=save_chat_async, args=(chat_data,)).start()

        return jsonify({
            'predicted_label': predicted_label,
            'confidence': float(confidence),
            'gemini_info': gemini_info,
            'chat_id': chat_data['chat_id']
        })

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    chat_id = data.get('chat_id')
    user_message = data.get('message')

    if not chat_id or not user_message:
        return jsonify({'error': 'Invalid request'}), 400

    chat_data = chats_collection.find_one({'chat_id': chat_id})
    if not chat_data:
        return jsonify({'error': 'Chat not found'}), 404

    try:
        prompt = f"""
        You are a friendly and knowledgeable plant expert. Your task is to assist users with their questions about plants. Follow these guidelines:

        1. **If the user greets you (e.g., "hi", "hello", "hey")**:
           - Respond with a friendly greeting and ask how you can help them.
           - Example: "Hi there! How can I assist you today?"

        2. **If the user asks about a specific plant (e.g., {chat_data['predicted_label']})**:
           - Use the provided context: {chat_data['gemini_info']}.
           - Provide a short, accurate, and relevant response (under 50 words).

        3. **If the user's message is 100% unclear or you cannot understand it **:
           - Politely let them know you couldn't understand and ask them to rephrase or provide more details.
           - Example: "I'm sorry, I couldn't quite understand that. Could you please rephrase or provide more details?"

        4. **If the user says something unrelated or out of scope**:
           - Gently steer the conversation back to plants or ask how you can assist them.
           - Example: "I'm here to help with plant-related questions. How can I assist you today?"

        5. **Always maintain a friendly and helpful tone**.

        Current Context:
        - Plant: {chat_data['predicted_label']}
        - Plant Info: {chat_data['gemini_info']}

        User Message: {user_message}

        Now, respond appropriately based on the user's input.
        """
        response = genai_client.generate_content(prompt)
        bot_response = response.text

        chats_collection.update_one(
            {'chat_id': chat_id},
            {'$push': {'messages': {'user': user_message, 'bot': bot_response}}}
        )

        return jsonify({'data': {'user': user_message, 'bot': bot_response}})

    except Exception as e:
        error_message = f"An error occurred: {str(e)}"
        return jsonify({'error': error_message}), 500

@app.route('/chatbots', methods=['GET'])
def get_chatbots():
    chatbots = list(chats_collection.find({}, {'chat_id': 1, 'predicted_label': 1, '_id': 0}))
    return jsonify(chatbots)

@app.route('/chathistory/<chat_id>', methods=['GET'])
def get_chathistory(chat_id):
    chat_data = chats_collection.find_one({'chat_id': chat_id}, {'_id': 0})
    if not chat_data:
        return jsonify({'error': 'Chat not found'}), 404
    return jsonify(chat_data)

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
