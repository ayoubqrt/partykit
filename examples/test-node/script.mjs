/* eslint-disable no-undef */
import WS from "ws";
import PartySocket from "partysocket";

const ps = new PartySocket({
  host: "127.0.0.1:1999",
  room: "test",
  WebSocket: WS,
});

ps.addEventListener("open", () => {
  console.log("connected");
  ps.send("hello");
});

ps.addEventListener("message", (e) => {
  console.log("message", e, e.data);
});

ps.onmessage = (e) => {
  console.log("message", e, e.data);
};

ps.addEventListener("close", () => {
  console.log("closed");
});

ps.addEventListener("error", (e) => {
  console.log("error", e);
});

ps.reconnect();

console.log("connecting...");
