const participants = {};
let userId;
let channelId;
let stompClient = null;
let accessToken;

window.onbeforeunload = function () {
  stompClient.disconnect();
};

async function Open() {
  accessToken = document.cookie;
  userId = localStorage.getItem('userId');
  channelId = 1;

  document.getElementById('room-header').innerText = `ROOM ${channelId}`;
  const errorCallback = function (error) {
    console.log(error);
  };
  const connectCallback = function (frame) {
    console.log(`Connected: ${frame}`);
    stompClient.subscribe(`/sub/meeting/user/${userId}/existingUsers`, (message) => {
      const parsedMessage = JSON.parse(message.body);
      console.info(`Received message: ${message.body}`);
      onExistingParticipants(parsedMessage);
    });
    stompClient.subscribe(`/sub/meeting/user/${userId}/newUserArrived`, (message) => {
      const parsedMessage = JSON.parse(message.body);
      console.info(`Received message: ${message.body}`);
      onNewParticipant(parsedMessage);
    });
    stompClient.subscribe(`/sub/meeting/user/${userId}/userLeft`, (message) => {
      const parsedMessage = JSON.parse(message.body);
      console.info(`Received message: ${message.body}`);
      onParticipantLeft(parsedMessage);
    });
    stompClient.subscribe(`/sub/meeting/user/${userId}/receiveVideoAnswer`, (message) => {
      const parsedMessage = JSON.parse(message.body);
      console.info(`Received message: ${message.body}`);
      receiveVideoResponse(parsedMessage);
    });
    stompClient.subscribe(`/sub/meeting/user/${userId}/iceCandidate`, (message) => {
      const parsedMessage = JSON.parse(message.body);
      console.info(`Received message: ${message.body}`);
      participants[parsedMessage.userId].rtcPeer.addIceCandidate(
        parsedMessage.candidate,
        (error) => {
          if (error) {
            console.error(`Error adding candidate: ${error}`);
          }
        },
      );
    });
    const message = {
      eventType: 'joinMeeting',
      userId,
      channelId,
    };
    sendMessage(message, message.eventType);
  };
  const connectHeader = {
    accessToken,
  };

  const socket = new SockJS('https://www.aplay.n-e.kr/api/socket/meeting');
  stompClient = Stomp.over(socket);
  await stompClient.connect(connectHeader, connectCallback, errorCallback);
}

Open();
// async function register() {
//   const email = document.getElementById('userEmail').value;
//   const password = document.getElementById('password').value;
//   const loginMessage = {
//     email,
//     password,
//   };

//   await axios
//     .post('https://www.aplay.n-e.kr/api/v1/users/local/signin', loginMessage)
//     .then((response) => {
//       accessToken = response.data.data.accessToken;
//       userId = response.data.data.userId;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   // 로그인 후 토큰 받아서 유저 아이디 얻고, 토큰 설정하기.

//   channelId = document.getElementById('channelId').value;

//   document.getElementById('room-header').innerText = `ROOM ${channelId}`;
//   //   document.getElementById('join').style.display = 'none';
//   //   document.getElementById('room').style.display = 'block';
//   const errorCallback = function (error) {
//     console.log(error);
//   };
//   const connectCallback = function (frame) {
//     console.log(`Connected: ${frame}`);
//     stompClient.subscribe(`/sub/meeting/user/${userId}/existingUsers`, (message) => {
//       const parsedMessage = JSON.parse(message.body);
//       console.info(`Received message: ${message.body}`);
//       onExistingParticipants(parsedMessage);
//     });
//     stompClient.subscribe(`/sub/meeting/user/${userId}/newUserArrived`, (message) => {
//       const parsedMessage = JSON.parse(message.body);
//       console.info(`Received message: ${message.body}`);
//       onNewParticipant(parsedMessage);
//     });
//     stompClient.subscribe(`/sub/meeting/user/${userId}/userLeft`, (message) => {
//       const parsedMessage = JSON.parse(message.body);
//       console.info(`Received message: ${message.body}`);
//       onParticipantLeft(parsedMessage);
//     });
//     stompClient.subscribe(`/sub/meeting/user/${userId}/receiveVideoAnswer`, (message) => {
//       const parsedMessage = JSON.parse(message.body);
//       console.info(`Received message: ${message.body}`);
//       receiveVideoResponse(parsedMessage);
//     });
//     stompClient.subscribe(`/sub/meeting/user/${userId}/iceCandidate`, (message) => {
//       const parsedMessage = JSON.parse(message.body);
//       console.info(`Received message: ${message.body}`);
//       participants[parsedMessage.userId].rtcPeer.addIceCandidate(
//         parsedMessage.candidate,
//         (error) => {
//           if (error) {
//             console.error(`Error adding candidate: ${error}`);
//           }
//         },
//       );
//     });
//     const message = {
//       eventType: 'joinMeeting',
//       userId,
//       channelId,
//     };
//     sendMessage(message, message.eventType);
//   };
//   const connectHeader = {
//     accessToken,
//   };

//   const socket = new SockJS('https://www.aplay.n-e.kr/api/socket/meeting');
//   stompClient = Stomp.over(socket);
//   await stompClient.connect(connectHeader, connectCallback, errorCallback);
// }

function onNewParticipant(request) {
  receiveVideo(request.user.userId);
}

function receiveVideoResponse(result) {
  // eslint-disable-next-line consistent-return
  participants[result.user.userId].rtcPeer.processAnswer(result.sdpAnswer, (error) => {
    if (error) return console.error(error);
  });
}

function callResponse(message) {
  if (message.response !== 'accepted') {
    console.info('Call not accepted by peer. Closing call');
    // eslint-disable-next-line no-restricted-globals
    stop();
  } else {
    // eslint-disable-next-line consistent-return
    webRtcPeer.processAnswer(message.sdpAnswer, (error) => {
      if (error) return console.error(error);
    });
  }
}

function onExistingParticipants(msg) {
  const userIds = msg.data.map((user) => user.userId);
  const constraints = {
    audio: true,
    video: {
      mandatory: {
        maxWidth: 320,
        maxFrameRate: 15,
        minFrameRate: 15,
      },
    },
  };
  console.log(`userId : ${userId} registered in room ${channelId}`);
  const participant = new Participant(userId);
  participants[userId] = participant;
  const video = participant.getVideoElement();

  const options = {
    localVideo: video,
    mediaConstraints: constraints,
    onicecandidate: participant.onIceCandidate.bind(participant),
  };
  // eslint-disable-next-line func-names, consistent-return
  participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
    if (error) {
      return console.error(error);
    }
    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
  });

  userIds.forEach(receiveVideo);
}

function leaveRoom() {
  sendMessage({
    id: 'leaveRoom',
  });

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in participants) {
    participants[key].dispose();
  }

  document.getElementById('join').style.display = 'block';
  document.getElementById('room').style.display = 'none';

  stompClient.disconnect();
}

function receiveVideo(sender) {
  const participant = new Participant(sender);
  participants[sender] = participant;
  const video = participant.getVideoElement();
  const options = {
    remoteVideo: video,
    onicecandidate: participant.onIceCandidate.bind(participant),
  };

  // eslint-disable-next-line func-names, consistent-return
  participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
    if (error) {
      return console.error(error);
    }
    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
  });
  console.log(video);
}

function onParticipantLeft(request) {
  // eslint-disable-next-line no-shadow
  const { userId } = request.user;
  console.log(`Participant ${userId} left`);
  const participant = participants[userId];
  participant.dispose();
  delete participants[userId];
}

function sendMessage(message, eventType) {
  const jsonMessage = JSON.stringify(message);
  console.log(`Sending message: ${jsonMessage}`);
  stompClient.send(`/pub/meeting/${eventType}`, { accessToken }, jsonMessage);
}
