import { io } from "socket.io-client";

const socket = io("https://sociallyconnect-g0gs.onrender.com", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default socket;
