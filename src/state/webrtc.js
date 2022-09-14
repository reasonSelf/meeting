import React, { useState } from "react";

function createPeerConnection() {
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.stunprotocol.org'
      }
    ]
  })
}