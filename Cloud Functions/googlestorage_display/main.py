from google.cloud import storage


def service_mesh_get_inventory_list_file(request):
 storage_client=storage.Client.from_service_account_json("Google_Key.json")

 bucket=storage_client.get_bucket("furniture_db_alt")
 url="furniture.json"
 blob = bucket.get_blob(url)

 json_data=blob.download_as_string()
 return json_data
