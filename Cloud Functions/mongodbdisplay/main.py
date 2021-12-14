#imports
from pymongo import MongoClient
from bson.json_util import dumps
from flask import Blueprint, request, jsonify
import os
import requests
import json


# Cloud function to get a forum posts from mongo
def get_mongodb_items(request): 
  cluster=MongoClient( "mongodb+srv://Admin:eR4xVrLSpXr7Pecn@assignment.xtiqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  db=cluster["Assignment"]
  collection=db["Furniture"]
  output = []
  for x in collection.find():
    output.append({"id_": x["id_"],"image": x["image"],"item": x["item"]})
  return jsonify(output)
