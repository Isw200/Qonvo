const APP_ID = "c39e86d887ac4d71a81cf751f29cbe9d";

// UID is a random number generated for the client
let uid = sessionStorage.getItem("uid");

if (!uid) {
  uid = String(Math.floor(Math.random() * 10000));
  sessionStorage.setItem("uid", uid);
}

let token = null;
let client;

let rtmClient;
let channel;

// Room ID
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get("room");

if (!roomId) {
  roomId = "main";
}

let displayName = sessionStorage.getItem("display_name");
if (!displayName) {
  window.location = "lobby.html";
}

let localTracks = [];
let remoteUsers = {};

let localScreenTracks;
let sharingScreen = false;

let joinRoomInit = async () => {
  rtmClient = await AgoraRTM.createInstance(APP_ID);
  await rtmClient.login({ uid, token });

  await rtmClient.addOrUpdateLocalUserAttributes({ name: displayName });

  channel = await rtmClient.createChannel(roomId);
  await channel.join();

  channel.on("MemberJoined", handleMemberJoined);
  channel.on("MemberLeft", handleMemberLeft);
  channel.on("ChannelMessage", handleChannelMessage);

  getMembers();
  addBotMessageToDom(`${displayName} joined the room`);

  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  await client.join(APP_ID, roomId, token, uid);

  client.on("user-published", handleUserPublished);
  client.on("user-left", handleUserLeft);

  joinStream();
};

// Stream media
let joinStream = async () => {
  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks(
    {},
    {
      encoderConfig: {
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 480, ideal: 1080, max: 1080 },
      },
    }
  );

  let player = `<div class="video_container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                </div>`;
  document
    .getElementById("streams_container")
    .insertAdjacentHTML("beforeend", player);
  document
    .getElementById(`user-container-${uid}`)
    .addEventListener("click", expandVideoFrame);

  localTracks[1].play(`user-${uid}`);
  await client.publish([localTracks[0], localTracks[1]]);
};

// switch between camera and screen share
let switchToCamera = async () => {
  let player = `<div class="video_container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                </div>`;
  displayFrame.insertAdjacentHTML("beforeend", player);

  await localTracks[0].setMuted(true);
  await localTracks[1].setMuted(true);

  document.getElementById("mic-button").classList.remove("active");
  document.getElementById("screen-button").classList.remove("active");

  localTracks[1].play(`user-${uid}`);
  await client.publish([localTracks[1]]);
};

// Handle user joined
let handleUserPublished = async (user, mediaType) => {
  remoteUsers[user.uid] = user;
  await client.subscribe(user, mediaType);

  let player = document.getElementById(`user-container-${user.uid}`);

  if (player == null) {
    player = `<div class="video_container" id="user-container-${user.uid}">
                    <div class="video-player" id="user-${user.uid}"></div>
                </div>`;
    document
      .getElementById("streams_container")
      .insertAdjacentHTML("beforeend", player);

    document
      .getElementById(`user-container-${user.uid}`)
      .addEventListener("click", expandVideoFrame);
  }

  if (displayFrame.style.display) {
    let videoFrame = document.getElementById(`user-container-${user.uid}`);
    videoFrame.style.height = "100px";
    videoFrame.style.width = "100px";
  }

  if (mediaType === "video") {
    user.videoTrack.play(`user-${user.uid}`);
  }

  if (mediaType === "audio") {
    user.audioTrack.play();
  }
};

// Handle user left
let handleUserLeft = async (user) => {
  delete remoteUsers[user.uid];

  document.getElementById(`user-container-${user.uid}`).remove();

  // shrink bottom videos if user left is in main frame
  if (userIdInDisplayFrame === `user-container-${user.uid}`) {
    displayFrame.style.display = null;

    let videoFrames = document.getElementsByClassName("video_container");

    for (let i = 0; i < videoFrames.length; i++) {
      videoFrames[i].style.height = "300px";
      videoFrames[i].style.width = "300px";
    }
  }
};

// toggle mic
let toggleMic = async (e) => {
  let button = e.currentTarget;

  if (localTracks[0].muted) {
    await localTracks[0].setMuted(false);
    button.classList.add("active");
  } else {
    await localTracks[0].setMuted(true);
    button.classList.remove("active");
  }
};

// toggle camera
let toggleCamera = async (e) => {
  let button = e.currentTarget;

  if (localTracks[1].muted) {
    await localTracks[1].setMuted(false);
    button.classList.add("active");
  } else {
    await localTracks[1].setMuted(true);
    button.classList.remove("active");
  }
};

// Screen sharing
let toggleScreen = async (e) => {
  let screenButton = e.currentTarget;
  let cameraButton = document.getElementById("camera-button");

  if (!sharingScreen) {
    sharingScreen = true;

    screenButton.classList.add("active");
    cameraButton.classList.remove("active");
    cameraButton.style.display = "none";

    localScreenTracks = await AgoraRTC.createScreenVideoTrack();

    document.getElementById(`user-container-${uid}`).remove();
    displayFrame.style.display = "block";

    let player = `<div class="video_container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                </div>`;

    displayFrame.insertAdjacentHTML("beforeend", player);
    document
      .getElementById(`user-container-${uid}`)
      .addEventListener("click", expandVideoFrame);

    userIdInDisplayFrame = `user-container-${uid}`;

    localScreenTracks.play(`user-${uid}`);

    // publish screen track
    await client.unpublish(localTracks[1]);
    await client.publish([localScreenTracks]);

    let videoFrame = document.getElementsByClassName("video_container");
    for (let i = 0; i < videoFrame.length; i++) {
      if (videoFrame[i].id != userIdInDisplayFrame) {
        videoFrame[i].style.height = "100px";
        videoFrame[i].style.width = "100px";
      }
    }
  } else {
    sharingScreen = false;
    cameraButton.style.display = "block";
    document.getElementById(`user-container-${uid}`).remove();
    await client.unpublish([localScreenTracks]);

    switchToCamera();
  }
};

let leaveSession = async () => {
  await client.leave();
  localTracks[0].close();
  localTracks[1].close();
  window.location.href = "lobby.html";
};

document
  .getElementById("camera-button")
  .addEventListener("click", toggleCamera);
document.getElementById("mic-button").addEventListener("click", toggleMic);
document
  .getElementById("screen-button")
  .addEventListener("click", toggleScreen);
document.getElementById("leave-button").addEventListener("click", leaveSession);
joinRoomInit();

// settings

// Turn on Safe Mode
let safe_cam_switch = document.getElementById("safecam_switch");

let safe_mode = false;
let is_model_loaded = false;

// Turn on Safe Mode check
safe_cam_switch.addEventListener("click", async () => {
  if (safe_cam_switch.checked) {
    console.log("Safe Mode On");
    safe_mode = true;
    await initModel();
  } else {
    console.log("Safe Mode Off");
    safe_mode = false;
  }
});

// Pose Model

const URL = "https://teachablemachine.withgoogle.com/models/UnD9KdVhZ/";
let model, webcam, ctx, maxPredictions;

async function initModel() {
  console.log("Initializing");
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  if (!model) {
    document.getElementById("loading_model").style.display = "block";
  }

  model = await tmPose.load(modelURL, metadataURL);

  if (model) {
    console.log("Model loaded");
    document.getElementById("loading_model").style.display = "none";
  }

  maxPredictions = model.getTotalClasses();

  // Convenience function to set up a webcam
  const size = 200;
  const flip = true;
  webcam = new tmPose.Webcam(size, size, flip); 
  console.log(webcam);
  // request access to the webcam
  await webcam.setup(); 
  await webcam.play();
  if (!safe_mode) {
    webcam.pause();
  }
  await loop();
}

async function loop(timestamp) {
  is_model_loaded = true;
  // update the webcam frame
  webcam.update();
  await predict();
  await loop();
}

async function predict() {
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  
  const prediction = await model.predict(posenetOutput);

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);

    if (prediction[i].probability.toFixed(2) > 0.8) {
      if (prediction[i].className == "Correct") {
        console.log("Correct");
      } else {
        console.log("Wrong");
        cameraOff();
      }
    }
  }
}

// Camera off function when wrong pose is detected
async function cameraOff() {
  if (safe_mode) {
    await localTracks[1].setMuted(true);
    document.getElementById("camera-button").classList.remove("active");
  } else {
    console.log("Not in safe mode");
  }
}
