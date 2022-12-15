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

function onNewParticipant(request) {
  receiveVideo(request.user.userId);
}

function receiveVideoResponse(result) {
  // eslint-disable-next-line consistent-return
  participants[result.user.userId].rtcPeer.processAnswer(result.sdpAnswer, (error) => {
    if (error) return console.error(error);
  });
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

setTimeout(() => {
  Open();
}, 0);
