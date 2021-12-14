#imports
from pymongo import MongoClient
from bson.json_util import dumps
from flask import Blueprint, request, jsonify
import os
import requests
import json


# Cloud function to get a forum posts from mongo
def get_user_orders(request): 
  cluster=MongoClient( "mongodb+srv://Admin:eR4xVrLSpXr7Pecn@assignment.xtiqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  db=cluster["Assignment"]
  collection=db["Orders"]
  user = request.args.get('user')
  output = []
  for x in collection.find({"user" : user}):
    output.append({"item": x["item"], "user": x["user"]})
  return jsonify(output)
