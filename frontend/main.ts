document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>WebSocket</h1>
  <div id="playground"></div>
`;
const socket = new WebSocket('ws://192.168.10.103:3000');

socket.addEventListener('open', (e) => {
  console.log('接続が開かれたときに呼び出されるイベント');
});
socket.addEventListener('message', (e) => {
  console.log('サーバーからメッセージを受信したときに呼び出されるイベント');
  clientId.onMessage(e);
  shareCounter.onMessage(e);
});
socket.addEventListener('close', (e) => {
  console.log('接続が閉じられたときに呼び出されるイベント');
});
socket.addEventListener('error', (e) => {
  console.log('エラーが発生したときに呼び出されるイベント');
});

const clientId = new ClientId(socket);
const shareCounter = new ShareCounter(socket);
