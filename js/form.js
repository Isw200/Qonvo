  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBKcvDh7YO0aK7St4iFLmQX69e46Xu5Hss",
    authDomain: "qonvo-e70db.firebaseapp.com",
    databaseURL: "https://qonvo-e70db-default-rtdb.firebaseio.com",
    projectId: "qonvo-e70db",
    storageBucket: "qonvo-e70db.appspot.com",
    messagingSenderId: "985174819530",
    appId: "1:985174819530:web:2485acbf2081e4dbabaa33",
    measurementId: "G-RHHDYBKS5D"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth =  firebase.auth();
  var userDB = firebase.database();

  //signup function

  function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("pass1");

    const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
    //
    promise.catch(e=>alert(e.message));
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        var email = user.email;
        alert("SignUp Successfully");
        localStorage.setItem('myobj',email);
        window.location.href="lobby.html";
      }else{
        
      }
    })
  }

  //signIN function
  function  signIn(){
    var email = document.getElementById("email");
    var password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.catch(e=>alert(e.message));
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        var email = user.email;
        localStorage.setItem('myobj',email);
        window.location.href="lobby.html";
      }else{
        
      }
    })
  }

// password eka nethuwa weda
function save(){
  var username = document.getElementById('username').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var pass1 = document.getElementById('pass1').value;
    var email = document.getElementById('email').value;
    userDB.ref('Users/'+ username).set({
    username: username,
    fname: fname,
    lname: lname,
    email: email,
    pass1:pass1,
  })
  localStorage.setItem("userid", email);
};
function signOut(){
        auth.signOut();
        alert("SignOut Successfully from System");
        window.location = `login.html`;
}
console.log(firebase);
const storage = firebase.storage();
function uploadImage() {
  
 // Get the file
 const file = document.getElementById('fileUpload').files[0];
 var email = document.getElementById('email').value;
 // Create a storage reference
 const storageRef = storage.ref(email+'.jpg');

 // Upload the file
 const task = storageRef.put(file);
}

//sessionStorage.setItem('key', 'value');