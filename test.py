from main import app
import unittest


class FlaskTest(unittest.TestCase):
    #check for status 200 on pages
    def test_index(self):
        tester = app.test_client(self)
        response= tester.get("/index", content_type="html/text")
        self.assertEqual(response.status_code,200) 

    def test_products(self):
        tester = app.test_client(self)
        response= tester.get("/orders", content_type="html/text")
        self.assertEqual(response.status_code,200) 

    def test_account(self):
        tester = app.test_client(self)
        response= tester.get("/account", content_type="html/text")
        self.assertEqual(response.status_code,200) 

    def test_orders(self):
        tester = app.test_client(self)
        response= tester.get("/orders", content_type="html/text")
        self.assertEqual(response.status_code,200) 

    def test_orders_list(self):
        tester = app.test_client(self)
        response= tester.get("/orders/list")
        self.assertEqual(response.status_code,200)
    
    #testing response contents
    def test_furniture_data(self):
        tester = app.test_client(self)
        response = tester.get("/furniture")
        self.assertTrue(b"item" in response.data)

    def test_furniture_single_data(self):
        tester = app.test_client(self)
        response = tester.get("/furniture/Chair")
        self.assertTrue(b"Chair" in response.data)

    #testing product ordering
    def test_products_clicked(self):
        tester = app.test_client(self)
        response = tester.post("/products/clicked", json={"user": "tester", "item": "tester"})
        self.assertTrue(b"Item ordered" in response.data)

    #testing order deletion
    def test_user_orders(self):
        tester = app.test_client(self)
        response = tester.post("/orders/delete", json={"user": "tester", "item": "tester"})
        self.assertTrue(b"Item removed" in response.data)        



if __name__ == "__main__":
    unittest.main()
