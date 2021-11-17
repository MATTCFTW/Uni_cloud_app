import logging, flask, json, requests

from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps 

cluster=MongoClient( "mongodb+srv://Admin:eR4xVrLSpXr7Pecn@assignment.xtiqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db=cluster["Assignment"]
collection=db["Furniture"]

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/products')
def products():
    return render_template('products.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login')
def login():
    return render_template('login.html')

#JSON of all furniture
@app.route("/mongodbdisplay", methods=["GET"])
def mongodbdisplay():
    url = "https://europe-west2-assignment-328920.cloudfunctions.net/mongodbdisplay"
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
    return jsonify({"result": output})

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