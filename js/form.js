  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAcZsmvDG6c10h9ZqqX7GjXcLc1DBJ66cI",
    authDomain: "qonvo-fec00.firebaseapp.com",
    databaseURL: "https://qonvo-fec00-default-rtdb.firebaseio.com",
    projectId: "qonvo-fec00",
    storageBucket: "qonvo-fec00.appspot.com",
    messagingSenderId: "514805453439",
    appId: "1:514805453439:web:8b09ccd98502689997654a",
    measurementId: "G-9H3Y6C4YPY"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth =  firebase.auth();
  var userDB = firebase.database();

  //signup function

  function signUp(){
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var email = document.getElementById("email");
    var password = document.getElementById("pass1");
    var username = document.getElementById('username').value;
    const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
    //
    promise.catch(e=>alert(e.message));
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        var email = user.email;
        alert("SignUp Successfully");
        localStorage.setItem('myobj',email);
        localStorage.setItem('myobj2',username);
        localStorage.setItem('myobj3',fname);
        localStorage.setItem('myobj4',lname);
        window.location.href="lobby.html";
      }else{
        
      }
    })
  }

  //signIN function
  function  signIn(){
    var username = document.getElementById('username').value;
    userDB.ref('Users/'+username).once('value').then(function(snapshot) {
      const email = snapshot.val().email.toString();
    var password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email,password.value);
    promise.catch(e=>alert(e.message));
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        var email = user.email;
        localStorage.setItem('myobj',email);
        localStorage.setItem('myobj2',username);
        window.location.href="lobby.html";
      }else{
        
      }
    })
  });
  }

// Save user details for firebase real time storage
function save(){
  var username = document.getElementById('username').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var pass1 = document.getElementById('pass1').value;
    var email = document.getElementById('email').value;
    userDB.ref('Users/'+ username).set({     //Real time data storage location
    username: username,
    fname: fname,
    lname: lname,
    email: email,
    pass1:pass1,
  })
  localStorage.setItem("userid", email);
};

// sign out
function signOut(){
        auth.signOut();
        alert("SignOut Successfully from System");
        window.location = `login.html`;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Get a reference to the image container element
const imageContainer = document.getElementById("image-container");

// Create a new img element
const img = document.createElement("img");

// Set the src attribute to the URL of the image
img.setAttribute("src", "images/2.PNG");

// Add the img element to the image container
imageContainer.appendChild(img);
    var myobj=localStorage.getItem('myobj');
      document.getElementById('myobj').textContent=myobj;
      var myobj2=localStorage.getItem('myobj2');
      document.getElementById('myobj2').textContent=myobj2;
      var button = document.createElement("button");

    // Set the button text and attributes
    button.innerHTML = "Sign Out";
    button.setAttribute("type", "button");

    // Find the container element in the HTML file
    var container = document.getElementById("button-container");

    // Add the button to the container element
    container.appendChild(button);
    button.addEventListener("click", function() {
      auth.signOut();
        alert("SignOut Successfully from System");
        window.location = `login.html`;
    });
  } else {
    // Create a new button element
    var button = document.createElement("button");

    // Set the button text and attributes
    button.innerHTML = "Sign in";
    button.setAttribute("type", "button");

    // Find the container element in the HTML file
    var container = document.getElementById("button-container");

    // Add the button to the container element
    container.appendChild(button);
    button.addEventListener("click", function() {
      // Redirect the user to the desired HTML file
      window.location.href = "login.html";
    });
  }
});
