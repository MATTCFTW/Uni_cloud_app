UsercookieValue = getCookie("token")
//if the user is logged in, this cookie will have a value
if(UsercookieValue){
    //do nothing (allow the user to access the page)
}
else{//the page is protected from users who aren't logged in
    window.location.replace("https://assignment-328920.ew.r.appspot.com/");
    window.alert("You must be logged in to view orders")
}

//gets the cookie used for determining if a user is logged in
function getCookie(name){
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}
