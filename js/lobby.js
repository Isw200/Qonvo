//  Create a room
let form = document.getElementById("lobby__form1");

let displayName = sessionStorage.getItem("display_name");
if (displayName) {
  form.name.value = displayName;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  sessionStorage.setItem("display_name", e.target.name.value);

  let meetingTitle = e.target.room.value;
  let date = new Date();
  let inviteCode = String(Math.floor(Math.random() * 10000));

  window.location = `room.html?room=${inviteCode}`;
});

// Join a room
let form2 = document.getElementById("lobby__form2");

let displayName2 = sessionStorage.getItem("display_name");
if (displayName2) {
  form2.name.value = displayName2;
}

form2.addEventListener("submit", (e) => {
  e.preventDefault();

  sessionStorage.setItem("display_name", e.target.name.value);

  let inviteCode = e.target.room.value;

  window.location = `room.html?room=${inviteCode}`;
});
