UsercookieValue = getCookie("token")

if(UsercookieValue)
{
  
}
else{
    window.location.replace("https://assignment-328920.ew.r.appspot.com/");
    window.alert("You must be logged in to view orders")
}

function getCookie(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}
