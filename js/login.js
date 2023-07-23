$(document).ready(function () {
    
    $("button#login").click(function (e) { 
        e.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
        
        if (email == "" || password == "") {
            alert("Please fill in all the fields");
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              var user = userCredential.user;
                alert("Logged in successfully as "+user.email);
                window.location.href = "./tasks.html";
              // ...
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
                alert(errorMessage);
            });
        }

        

    });

    //on #signout click event signout user from firebase auth
    $("button#signout").click(function (e) {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            alert("Signed out successfully");
            window.location.href = "./login.html";
          }).catch((error) => {
            // An error happened.
            alert(error.message);
          });
    }
    );


    //check if user logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var email = user.email;
          var uid = user.uid;
          localStorage.setItem("uid",uid);
          //add uid to local storage
          localStorage.setItem("uid",uid);
          // ...
        } else {
          // User is signed out.
          // ...
        }
      }
        );
});