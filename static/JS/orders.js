UsercookieValue = getCookie("token");
//if the user is logged in, this cookie will have a value
if(UsercookieValue){
    var user = getCookie("user");
    //do nothing (allow the user to access the page)  
    fetch('https://assignment-328920.ew.r.appspot.com/orders/list')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayOrders(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}
else{//the page is protected from users who aren't logged in
    window.location.replace("https://assignment-328920.ew.r.appspot.com/");
    window.alert("You must be logged in to view orders");
}

function displayOrders(data){
    var mainContainer = document.getElementById('orders');
    //for each item of furniture
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement('div');
        div.classList.add("order-box", "text-center");
        //updates overall div
        mainContainer.appendChild(div);
        //display item information in <P>
        var text = document.createElement('P');
        text.classList.add("order-title");
        text.innerHTML = data[i].item; 
        //creates a button unique to each product 
        var btn = document.createElement('BUTTON');
        btn.innerHTML = "Cancel order";
        //item to be passed from clicking the order button
        btn.id = data[i].item
        //will add the product to users' orders
        btn.addEventListener('click', function(){ 
            deleteOrder(user, this.id);  
        })
        //order-button class hides the button for users not logged in
        btn.classList.add("btn", "btn-dark","btn-centering");
        div.appendChild(text);
        div.appendChild(btn);
    }
}

//gets the cookie used for determining if a user is logged in
function getCookie(name){
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

//POSTs data to be usable in python
function deleteOrder(user, itemRemoved){
    var DataSent = {
      user: user,
      item: itemRemoved
    };
    $.ajax({
        url: '/orders/delete',
        type: 'POST',
        data: JSON.stringify(DataSent),
        contentType: 'application/json',
        dataType: 'json',
        success : function(response){
            window.alert(response)
        }
    });
}
