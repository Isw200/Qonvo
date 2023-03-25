let handleMemberJoined = async (MemberId) => {
  addMemberToDom(MemberId);

  let members = await channel.getMembers();
  updateMemberTotal(members);

  let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ["name"]);
  addBotMessageToDom(`${name} joined the room`);
};

let addMemberToDom = async (MemberId) => {
  let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ["name"]);

  let membersWrapper = document.getElementById("member__list");
  let memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                        <span class="green__icon"></span>
                        <p class="member_name">${name}</p>
                    </div>`;
  membersWrapper.insertAdjacentHTML("beforeend", memberItem);
};

let updateMemberTotal = async (members) => {
  let total = document.getElementById("members__count");

  total.innerText = members.length;
};

let handleMemberLeft = async (MemberId) => {
  removeMemberFromDom(MemberId);

  let members = await channel.getMembers();
  updateMemberTotal(members);
};

let removeMemberFromDom = async (MemberId) => {
  let memberWrapper = document.getElementById(`member__${MemberId}__wrapper`);
  let name = memberWrapper.getElementsByClassName("member_name")[0].textContent;
  memberWrapper.remove();

  addBotMessageToDom(`${name} has left the room`);
};

let getMembers = async () => {
  let members = await channel.getMembers();
  updateMemberTotal(members);
  members.forEach((member) => {
    addMemberToDom(member);
  });
};

// Messages
let handleChannelMessage = async (message, memberId) => {
  let data = JSON.parse(message.text);
  console.log("received message: ");

  if (data.type === "chat") {
    addMessageToDom(data.displayName, data.message);
  }
};

// Send Message
let sendMessage = async (e) => {
  e.preventDefault();

  let message = e.target.message.value;

  channel.sendMessage({
    text: JSON.stringify({
      type: "chat",
      message: message,
      displayName: displayName,
    }),
  });

  addMessageToDom(displayName, message);
  e.target.reset();
};

let addMessageToDom = (name, message) => {
  let messageWrapper = document.getElementById("messages");

  let newMessage = `<div class="message__wrapper">
                        <div class="message__body">
                            <strong class="message__author">${name}</strong>
                            <p class="message__text">${message}</p>
                        </div>
                    </div>`;

  messageWrapper.insertAdjacentHTML("beforeend", newMessage);

  let lastMessage = document.querySelector(
    "#messages .message__wrapper:last-child"
  );
  if (lastMessage) {
    lastMessage.scrollIntoView();
  }
};

// Bot message
let addBotMessageToDom = (botMessage) => {
  let messageWrapper = document.getElementById("messages");

  let newMessage = `<div class="message__wrapper">
                        <div class="message__body__bot">
                            <strong class="message__author__bot">System Bot</strong>
                            <p class="message__text__bot">${botMessage}</p>
                        </div>
                    </div>`;

  messageWrapper.insertAdjacentHTML("beforeend", newMessage);

  let lastMessage = document.querySelector(
    "#messages .message__wrapper:last-child"
  );
  if (lastMessage) {
    lastMessage.scrollIntoView();
  }
};

// Handle user left
let leaveChannel = async () => {
  await channel.leave();
  await rtmClient.logout();
};

window.addEventListener("beforeunload", leaveChannel);

let messageForm = document.getElementById("message__form");
messageForm.addEventListener("submit", sendMessage);

let attachButton = document.getElementById("attach_image");

// Attaching Image
//selecting all required elements
let upload_image = document.getElementById("upload_image");
let closeImageAttach = document.getElementById("closeimageattach");
let sendImageButton = document.getElementById("sendimagebutton");

attachButton.onclick = () => {
  upload_image.style.display = "flex";
};

closeImageAttach.onclick = () => {
  upload_image.style.display = "none";
};

let file;
const dropArea = document.querySelector(".drag-area"),
  dragText = dropArea.querySelector("header"),
  input = dropArea.querySelector("input");

let attachbutton = document.getElementById("attachbutton");

attachbutton.onclick = () => {
  console.log("clicked");
  input.click();
};

input.addEventListener("change", function () {
  file = this.files[0];
  dropArea.classList.add("active");
  showFile();
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  showFile();
});

function showFile() {
  let buttonContainer = document.getElementById("buttonContainer");
  attachbutton.style.transform = "translateY(0px)";
  sendImageButton.style.display = "block";
  sendImageButton.style.transform = "translateY(0px)";

  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="image">`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

sendImageButton.onclick = () => {
  sendImageHandler();
};

// Sending Image
let sendImageHandler = async () => {
  let image = file;
  // let imageMessage = await channel.sendFileMessage(image);
  // console.log(imageMessage);
  upload_image.style.display = "none";
  attachbutton.style.transform = "translateY(50px)";
  sendImageButton.style.transform = "translateY(50px)";
  sendImageButton.style.display = "none";
  addImageToDom(image);
  handleSendImage(image);
};

let addImageToDom = (image) => {
  let messageWrapper = document.getElementById("messages");

  let newMessage = `<div class="message__wrapper">
                        <div class="message__body">
                            <strong class="message__author">${name}</strong>
                            <p class="message__text__bot">${image.name}</p>
                        </div>
                    </div>`;

  messageWrapper.insertAdjacentHTML("beforeend", newMessage);

  let lastMessage = document.querySelector(
    "#messages .message__wrapper:last-child"
  );
  if (lastMessage) {
    lastMessage.scrollIntoView();
  }
};

function handleSendImage(imageFile) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(imageFile);

  reader.onload = function () {
    const imageData = new Uint8Array(reader.result);
    console.log(imageData);
    // Send byte array using Agora SDK
    client.sendCustomReportMessage({
      event: "custom-report-message",
      category: "image",
      reportId: "image",
      label: "image",
      data: imageData,
    });
  };
  console.log("Image sent");
}

// Error in handle receive image
// Image not reciving
// calling in room_rtc

// function handleReceiveImage(evt) {
//   console.log("Image reciving");
//   if (evt.event === "custom-report-message") {
//     // Convert byte array back to image
//     const imageData = new Uint8Array(evt.data);
//     const blob = new Blob([imageData], { type: "image/jpeg" });
//     const imageUrl = URL.createObjectURL(blob);
//     const imageElement = document.createElement("img");
//     imageElement.src = imageUrl;
//     console.log("Image received successfully");
//   }
// }
