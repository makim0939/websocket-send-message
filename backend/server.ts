import WebSocket, { Server } from 'ws';

const server = new Server({ port: 3000 });

//接続時、クライアントにIDを割り当てる
const assignClientId = (ws: WebSocket) => {
  const clientId = server.clients.size - 1;
  ws.send('id' + clientId);
};
//切断時、各クライアントにIDを再割り当てする
const reAssignClientId = (ws: WebSocket) => {
  let i = 0;
  server.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send('id' + i);
      i++;
    }
  });
};

server.on('connection', (ws: WebSocket) => {
  assignClientId(ws);
  ws.on('message', (messageData) => {
    const [message, id] = ('' + messageData).split(',');
    let i = 0;
    server.clients.forEach((client) => {
      if (client.readyState === ws.OPEN && (id === '' + i || id === '')) {
        client.send('me' + message);
      }
      i++;
    });
  });
  ws.on('close', () => {
    console.log('Closed.');
    reAssignClientId(ws);
  });
});
