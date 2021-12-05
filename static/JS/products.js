fetch('https://assignment-328920.ew.r.appspot.com/furniture')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log('error: ' + err);
    });
  function appendData(data) {
    //targetting changes to be made within this container div  
    var mainContainer = document.getElementById('products');
    //for each item of furniture
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement('div');
      div.classList.add("product-box");
      //unique div to identify each item
      div.id = data[i].id_;
      //display item information
      div.innerHTML = 'Item: ' + data[i].item;
      mainContainer.appendChild(div);
      //creates a button unique to each product
      var buttonContainer = document.getElementById(data[i].id_);
      var btn = document.createElement('BUTTON');
      btn.innerHTML = "Order item";
      btn.id = data[i].id_;
      //will add the product to users' orders
      btn.addEventListener('click', () => {
        
      })
      //order-button class hides the button for users not logged in
      btn.classList.add("order-button", "btn", "btn-dark");
      buttonContainer.appendChild(btn); 
    }
    UsercookieValue = getCookie("token");
    //if user is logged in
    if(UsercookieValue){
      //gets every element with the class that hides the button
      var hiddens = document.getElementsByClassName("order-button"); 
      //interates through the elements
      while(hiddens.length){  
        //removes the class
        hiddens[0].classList.remove("order-button");
      }
    }
    function getCookie(name)
    {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }
  }
//   function orderAdd(){

//   }