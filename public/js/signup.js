$(document).ready(function () {
    
    $("button#signup").click(function (e) { 
        e.preventDefault();
        var fullname = $("#fullName").val();
        var email = $("#email").val();
        var password = $("#password").val();
        
        if (email == "" || password == "") {
            alert("Please fill in all the fields");
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in 
              var user = userCredential.user;
              var email = user.email;
              var uid = user.uid;
              db.collection("users").doc(uid).set({
                fullName: fullname,
                email: email,
                uid: uid
            }).then(function () {
                console.log("Document successfully written!");
                alert("Registered in successfully as "+user.email);
                //redircet to login page
                window.location.href = "./login.html";
            });
             
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage);
              // ..
            });
        }

        

    });
});