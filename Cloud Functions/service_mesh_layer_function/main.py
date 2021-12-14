import requests
import json

def services_get_inventory_list_file(request):
 request_json = request.get_json(silent=True)
 request_args = request.args
 # check to see which data source to use and switch to the approrpiate mesh service.
 if(request_json and 'source' in request_json):
  meshSource = request_json['source']
 else:
  meshSource = request.args.get("source")

 if(meshSource=="mongo"):
  url = 'https://europe-west2-assignment-328920.cloudfunctions.net/mongodbdisplay' 
 else:
  url = "https://europe-west2-assignment-328920.cloudfunctions.net/googlestorage_display"
 # get the data
 json_data = requests.get(url).content
 # return the data 
 return json_data