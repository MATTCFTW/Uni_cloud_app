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
        div.classList.add("product-box", "col");
        //unique div to identify each item
        div.id = data[i].id_;
        //updates overall div
        mainContainer.appendChild(div);
  
        //adding content to each product box
        var productContainer = document.getElementById(data[i].id_)
    
        //display item information in <P>
        var text = document.createElement('P');
        text.classList.add("product-title");
        text.innerHTML = data[i].item; 
    
        //product image
        var image = document.createElement('IMG');
        image.classList.add("product-image");
        image.setAttribute("src", data[i].image);

        //creates a button unique to each product 
        var btn = document.createElement('BUTTON');
        btn.innerHTML = "Order item";
        btn.id = data[i].id_;
        //item to be passed from clicking the order button
        var itemClicked = data[i].item;
        //will add the product to users' orders
        btn.addEventListener('click', () => {    
            orderAdd(user, itemClicked)
        })
        //order-button class hides the button for users not logged in
        btn.classList.add("order-button", "btn", "btn-dark");

        
        //link for getting more info on the product

        //append all changes
        productContainer.appendChild(text);
        productContainer.appendChild(image);
        productContainer.appendChild(btn);
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
        var user = getCookie("user");
    }
    else{
        window.alert("Please log in if you want to make an order")
    }
}

function getCookie(name){
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

function orderAdd(user, itemClicked){
    var DataSent = {
      user: user,
      item: itemClicked  
    };
    $.ajax({
        url: '/products/clicked',
        type: 'POST',
        data: JSON.stringify(DataSent),
        contentType: 'application/json',
        dataType: 'json',
        success : function(response){
            window.alert(response)
        }
    });
 }