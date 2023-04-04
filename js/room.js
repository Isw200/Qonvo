let messagesContainer = document.getElementById("messages");
messagesContainer.scrollTop = messagesContainer.scrollHeight;

const streamContainer = document.getElementById("stream__container");

const memberContainer = document.getElementById("members__container");
const memberDeskButton = document.getElementById("membeButton");

const chatContainer = document.getElementById("messages__container");
const chatDeskButton = document.getElementById("chatButton");

const closeMemberbutton = document.getElementById("closeMembers");
const closeChatButton = document.getElementById("closeMessages");

// For mobile view chat and members visibility
closeMemberbutton.addEventListener("click", () => {
  memberContainer.style.display = "none";
});

closeChatButton.addEventListener("click", () => {
  chatContainer.style.display = "none";
});

// For desktop view chat and members visibility
let activeMemberContainerDesk = true;
memberDeskButton.addEventListener("click", () => {
  let screenWidth = screen.width;
  if (activeMemberContainerDesk) {
    memberContainer.style.display = "none";
    if (screenWidth > 700) {
      streamContainer.style.left = "10px";
      streamContainer.style.width = "calc(100% - 28rem)";
    }
  } else {
    memberContainer.style.display = "block";
    if (screenWidth > 700) {
      streamContainer.style.left = "16.7rem";
      streamContainer.style.width = "calc(100% - 42.7rem)";
    }
  }

  activeMemberContainerDesk = !activeMemberContainerDesk;
});

let activeChatContainerDesk = true;

chatDeskButton.addEventListener("click", () => {
  let screenWidth = screen.width;
  if (activeChatContainerDesk) {
    chatContainer.style.display = "none";
    if (screenWidth > 700) {
      streamContainer.style.width = "calc(100% - 18.7rem)";
    }
  } else {
    chatContainer.style.display = "block";
    if (screenWidth > 700) {
      streamContainer.style.width = "calc(100% - 42.7rem)";
    }
  }

  activeChatContainerDesk = !activeChatContainerDesk;
});

// handle click events on click on user
let displayFrame = document.getElementById("stream_box");
let videoFrame = document.getElementsByClassName("video_container");
let userIdInDisplayFrame = null;

let expandVideoFrame = (e) => {
  let child = displayFrame.children[0];
  if (child) {
    document.getElementById("streams_container").appendChild(child);
  }

  displayFrame.style.display = "block";
  displayFrame.appendChild(e.currentTarget);
  userIdInDisplayFrame = e.currentTarget.id;

  // resize bottom videos
  for (let i = 0; i < videoFrame.length; i++) {
    if (videoFrame[i].id != userIdInDisplayFrame) {
      videoFrame[i].style.height = "100px";
      videoFrame[i].style.width = "100px";
    }
  }
};

for (let i = 0; i < videoFrame.length; i++) {
  videoFrame[i].addEventListener("click", expandVideoFrame);
}

// hide display frame when clicked again
let hideDisplayFrame = () => {
  userIdInDisplayFrame = null;
  displayFrame.style.display = null;

  let child = displayFrame.children[0];
  document.getElementById("streams_container").appendChild(child);

  for (let i = 0; i < videoFrame.length; i++) {
    videoFrame[i].style.height = "300px";
    videoFrame[i].style.width = "300px";
  }
};

displayFrame.addEventListener("click", hideDisplayFrame);

// share meeting
const shareButton = document.querySelector(".share-button");
const shareDialog = document.querySelector(".share-dialog");
const closeButton = document.querySelector(".close-button");

shareButton.addEventListener("click", (event) => {
  if (navigator.share) {
    navigator
      .share({
        title: "WebShare API Demo",
        url: "https://codepen.io/ayoisaiah/pen/YbNazJ",
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  } else {
    shareDialog.classList.add("is-open");
  }
});

closeButton.addEventListener("click", (event) => {
  shareDialog.classList.remove("is-open");
});

const copyLink = document.getElementById("copyLink");
const inviteUrl = document.getElementById("inviteUrl");
const url = window.location.href;
const urlParts = url.split("=");
const inviteText = urlParts[1];

const initeTextParts = inviteText.split("%");
const meetingTitle = initeTextParts[1];

document.getElementById("meeting_name").innerHTML = meetingTitle;

inviteUrl.innerHTML = inviteText;

copyLink.addEventListener("click", (event) => {
  let tempInput = document.createElement("input");
  tempInput.value = inviteText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
});

// // Select image
const selectImage = document.getElementById("selectImage");
selectImage.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("imageInput").click();
});

const imageInput = document.getElementById("imageInput");
imageInput.addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
  const file = event.target.files[0];
  // Perform image upload logic here
}
