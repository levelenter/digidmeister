import http from "http";
import path from "path"
import express from "express";
import sockeIO from "socket.io"

process.title = "networked-aframe-server";
const port = 8080;

/**
 * Roomをディクショナリ形式でアクセスできるようにするインターフェイス
 */
interface Room {
  [key: string]: any;
}

// HTTPサーバー起動（clientディレクトリを公開）
const app = express();
app.use(express.static(path.resolve(__dirname, "..", "client")));

// WebSocketのサーバーを起動
const webServer = http.createServer(app);
const io = sockeIO(webServer);

// Roomをディクショナリ形式で管理する
const rooms:Room = {};

// webSocketで接続されたときに反応する
io.on("connection", socket => {
  console.log("user connected", socket.id);

  let curRoom:string = "";

  // ルームへの入室があったときに反応する
  socket.on("joinRoom", (data:any) => {
    const room = data.room;

    if (!rooms[room]) {
      rooms[room] = {
        name: room,
        occupants: {}, //居住者
      };
    }

    const joinedTime = Date.now();
    rooms[room].occupants[socket.id] = joinedTime;
    curRoom = room;

    console.log(`${socket.id} joined room ${room}`);
    socket.join(room);

    socket.emit("connectSuccess", { joinedTime });
    const occupants = rooms[room].occupants;
    io.in(curRoom).emit("occupantsChanged", { occupants });
  });

  // 送信イベントに反応する
  socket.on("send", data => {
    io.to(data.to).emit("send", data);
  });

  // ブロードキャストイベントに反応
  socket.on("broadcast", data => {
    socket.to(curRoom).broadcast.emit("broadcast", data);
  });

  // 切断イベントに反応
  socket.on("disconnect", () => {
    console.log('disconnected: ', socket.id, curRoom);
    if (rooms[curRoom]) {
      console.log("user disconnected", socket.id);

      delete rooms[curRoom].occupants[socket.id];
      const occupants = rooms[curRoom].occupants;
      socket.to(curRoom).broadcast.emit("occupantsChanged", { occupants });

      if (occupants == {}) {
        console.log("everybody left room");
        delete rooms[curRoom];
      }
    }
  });
});

// httpサーバーを起動
webServer.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});


