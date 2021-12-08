import logging, flask, json, requests

from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps 
from google.auth.transport import requests as Requests_google #renamed due to overlap
from google.cloud import datastore
import google.oauth2.id_token

firebase_request_adapter = Requests_google.Request()
datastore_client = datastore.Client()

#MongoDB connection
cluster=MongoClient( "mongodb+srv://Admin:eR4xVrLSpXr7Pecn@assignment.xtiqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db=cluster["Assignment"]
collection=db["Furniture"]
order_collection = db["Orders"]

app = Flask(__name__)

#app routes
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/products')
def products():
    return render_template('products.html')

@app.route('/products/clicked', methods=['POST'])
def make_order():
    # getData = request.json
    post = {"user": "test", "item": "Chair"}
    order_collection.insert_one(post)

    return ""

@app.route('/orders')
def orders():
    return render_template('orders.html')

@app.route('/account')
def login():
    # Verify Firebase auth.
    id_token = request.cookies.get("token")
    error_message = None
    claims = None
    if id_token:
        try: 
            claims = google.oauth2.id_token.verify_firebase_token(id_token, firebase_request_adapter)
        except ValueError as exc:
            # This will be raised if the token is expired or any other
            # verification checks fail.
            error_message = str(exc)           
    return render_template('account.html',  user_data=claims, error_message=error_message) 


#JSON of all furniture
@app.route("/furniture", methods=["GET"])
def mongodbdisplay():
    url = "https://europe-west2-assignment-328920.cloudfunctions.net/Service_Mesh_Layer_Function"
    response = requests.get(url)
    return(response.content) 

#JSON of single furniture item from URL
@app.route('/furniture/<item>', methods=['GET'])
def get_single_furniture(item):
    x = collection.find_one({"item": item})
    if x:
        output = {"item": x["item"],"id_": x["id_"]}
    else:
        output = "No results found"  
    return jsonify(output)

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404
 
if __name__ == '__main__':
# Only run for local development.
    app.run(host='localhost', port=8080, debug=True) 