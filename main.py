import logging
from flask import Flask, render_template, request

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
 app.run(host='127.0.0.1', port=8080, debug=True) 