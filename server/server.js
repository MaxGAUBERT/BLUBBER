const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 9000 });

wss.on("connection", (ws) => {
  ws.room = null;

  ws.on("message", (raw) => {
    const { room, text } = JSON.parse(raw);

    ws.room = room;
    wss.clients.forEach((client) => {
      if (client.readyState === 1 && client.room === room) {
        client.send(JSON.stringify({ room, text }));
      }
    });
  });
});
