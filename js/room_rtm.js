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
  } else if (data.type === "image") {
    console.log("Image reciving");
    createImage(data);
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
  input.click();
};

input.addEventListener("change", function () {
  file = this.files[0];
  dropArea.classList.add("active");
  beforePredictImage(file);
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
  beforePredictImage(file);
});

const OBJ_MDL_URL = "https://teachablemachine.withgoogle.com/models/3K2rCwpAX/";
let objectModel, objectModelMaxPredictions;
let imageForCanvas, canvas;

function beforePredictImage(file) {
  // Create a new FileReader instance
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function () {
    imageForCanvas = new Image();
    imageForCanvas.src = reader.result;
  };

  console.log("Image loaded");
  // showFile();
  initObjModel();
}

// Object detection model
async function initObjModel() {
  console.log("Loading Model...");
  const modelURL = OBJ_MDL_URL + "model.json";
  const metadataURL = OBJ_MDL_URL + "metadata.json";

  objectModel = await tmImage.load(modelURL, metadataURL);
  objectModelMaxPredictions = objectModel.getTotalClasses();

  await predictImage();
}

// run the webcam image through the image objectModel
async function predictImage() {
  // predict can take in an image, video or canvas html element
  const prediction = await objectModel.predict(imageForCanvas);
  for (let i = 0; i < objectModelMaxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    console.log(classPrediction);
  }
}

let selectedImg_src = "";

let selectedImageContainer = document.getElementById("selectedImageContainer");
let dragIcon = document.getElementById("dragIcons");
let dragHeading = document.getElementById("dragHeader");
let dragSpan = document.getElementById("dragSpan");

function showFile() {
  selectedImageContainer.style.display = "block";
  console.log("file shown");

  let fileType = file.type; //getting selected file type

  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      selectedImg_src = fileURL;
      let imgTag = `<img src="${fileURL}" alt="image">`;
      selectedImageContainer.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);

    dragIcon.style.display = "none";
    dragHeading.style.display = "none";
    dragSpan.style.display = "none";

    attachbutton.style.transform = "translateY(-30px)";
    sendImageButton.style.display = "block";
    sendImageButton.style.transform = "translateY(-30px)";
  } else {
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

sendImageButton.onclick = () => {
  sendImageHandler();
  resetDragArea();
};

// Reset Drag Area
let resetDragArea = () => {
  dragIcon.style.display = "block";
  dragHeading.style.display = "block";
  dragSpan.style.display = "block";
  selectedImageContainer.innerHTML = "";
  selectedImageContainer.style.display = "none";
  sendImageButton.style.display = "none";
};

// Sending Image
let sendImageHandler = async () => {
  let image = file;
  upload_image.style.display = "none";
  handleSendImage(image);
};

async function handleSendImage(imageFile) {
  const base64String = await convertImageToBase64(imageFile);

  channel.sendMessage({
    text: JSON.stringify({
      type: "image",
      message: base64String,
      displayName: displayName,
    }),
  });

  addImageToDom(displayName, selectedImg_src);
}

// Receiving Image
function createImage(data) {
  const jsonString = `{"imgdata":${JSON.stringify(data.message)}}`;
  displayBase64Image(data.displayName, data.message, "testloadimage");
}

function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = btoa(reader.result);
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
}

function displayBase64Image(name, base64String, containerId) {
  const container = document.getElementById(containerId);
  const imgElem = document.createElement("img");
  imgElem.src = `data:image/png;base64,${base64String}`;
  addImageToDom(name, imgElem.src);
}

let addImageToDom = (name, imageSrc) => {
  let messageWrapper = document.getElementById("messages");

  let newMessage = `<div class="message__wrapper">
                        <div class="message__body">
                            <strong class="message__author">${name}</strong>
                            <img src="${imageSrc}" alt="image">
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
