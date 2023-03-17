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

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("fname");
  var emailid = getElementVal("lname");
  var msgContent = getElementVal("pass1");

  saveMessages(name, emailid, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
