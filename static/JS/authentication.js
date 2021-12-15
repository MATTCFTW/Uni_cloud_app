'use strict';

window.addEventListener('load', function () {
    document.getElementById('sign-out').onclick = function () {
        firebase.auth().signOut();
    }; 
    //FirebaseUI config.
    var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
            //the sign in options I want 
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ], //able to add a terms of service url
        tosUrl: '<your-tos-url>'
    };

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //user is signed in, so display the "sign out" button, login info, and order button.
            document.getElementById('sign-out').hidden = false;
            document.getElementById('login-info').hidden = false; 
            document.getElementById('orders').hidden = false; 
            console.log(`Signed in as ${user.displayName} (${user.email})`);
            const email = user.email
            user.getIdToken().then(function (token) {
                //creates a cookie that I can use to verify if a user is logged in
                document.cookie = "token=" + token;
            });//creates a cookie of the users email so they can be identified in orders
            document.cookie = "user=" + email;
        } else {
            //user is signed out.
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            //show the Firebase login button.
            ui.start('#firebaseui-auth-container', uiConfig);
            //hide user exclusive things
            document.getElementById('sign-out').hidden = true;
            document.getElementById('login-info').hidden = true;
            document.getElementById('orders').hidden = true;  
            //clear cookies.
            document.cookie = "token=";
            document.cookie = "user=";
        }
    }, function (error){
        console.log(error);
        alert('Login failed: ' + error)
    });
});
