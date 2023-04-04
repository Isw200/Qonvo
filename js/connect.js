
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAwIy35nxtyzZ6xcy8VLJmyfNN0GL0NvvY",
    authDomain: "convo-5f354.firebaseapp.com",
    databaseURL: "https://convo-5f354-default-rtdb.firebaseio.com",
    projectId: "convo-5f354",
    storageBucket: "convo-5f354.appspot.com",
    messagingSenderId: "543581797247",
    appId: "1:543581797247:web:4a06b8e61dc0075fd6b84a",
    measurementId: "G-42SEMV1NH9"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth =  firebase.auth();

//signup function
function signUp(){
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
  //
  promise.catch(e=>alert(e.message));
  alert("SignUp Successfully");
}
