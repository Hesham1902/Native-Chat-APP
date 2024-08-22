const net = require("net");

const server = net.createServer();

// ** An array to store all connected sockets
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection has been established");

  const clientId = clients.length + 1;

  socket.on("data", (data) => {
    clients.forEach((client) => {
      client.socket.write(`${clientId}-${data.toString("utf-8")}`);
    });
  });
  clients.push({ id: clientId.toString(), socket });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("Server running at", server.address());
});
