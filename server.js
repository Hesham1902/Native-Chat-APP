const net = require("net");

const server = net.createServer();

// ** An array to store all connected sockets
const clients = [];

const broadcastMessage = (message) => {
  clients.forEach((client) => {
    client.socket.write(message);
  });
};

server.on("connection", (socket) => {
  console.log("A new connection has been established");
  const clientId = clients.length + 1;

  broadcastMessage(`User ${clientId} connected **`);

  socket.on("data", (data) => {
    const message = `> User ${clientId}: ${data.toString("utf-8")}`;

    broadcastMessage(message);
    socket.on("error", (err) => {
      const message = `User ${clientId} left.`;
      broadcastMessage(message);
      console.error(`Error with client ${clientId}: ${err.message}`);
    });
  });

  socket.on("end", () => {
    const message = `User ${clientId} left.`;
    broadcastMessage(message);
  });

  clients.push({ id: clientId.toString(), socket });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("Server running at", server.address());
});
