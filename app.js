const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

let count = 0;      //ゲームのカウント
let playercount = 0;    //playerのcount

let namesave = [];
let playerData = {};

io.on('connection', function (socket) {
    playercount++
    if (playercount == 1) {
        playerData[socket.id] = 1
    }
    if (playercount == 2) {
        playerData[socket.id] = 2
    }
    //こちらは観戦用
    if (playercount > 2) {
        playerData[socket.id] = 3
    }
    socket.on('page_loaded', function (data) {
        if (playercount <= 2) {
            //いつか下記を適用させる
            //namesave.push({ id: socket.id, name: data.message });
            namesave.push(data.message);
            console.log(namesave)
        }
        io.emit("formdata", namesave);
    });

    socket.on("ban_click", (ban_x, ban_y, turn) => {
        if (!(playerData[socket.id] === turn)) {
            console.log("あなたのターンではないよ!!")
            return
        }
        io.emit("ban_click_res", ban_x, ban_y);
    })

    socket.on("own_piece", (x, y, own_piece_id, turn) => {
        if (!(playerData[socket.id] === turn)) {
            console.log("あなたのターンではないよ!!")
            return
        }
        if(playerData[socket.id]==1 && own_piece_id=="field_1"||playerData[socket.id]==2&& own_piece_id=="field_2"){
            io.emit("own_piece_response", x, y, own_piece_id);
        }else{
            console.log("あなたの駒ではないよ!")
            return    
        }



    })

    socket.on("button", () => {
        console.log("buttonを送信するばい")
        io.emit("button_response")
    })

    socket.on("button2", () => {
        console.log("button2を送信するばい")
        io.emit("button_response2")
    })

    socket.on('disconnect', function () {
        // countの更新
        playercount--;
        namesave.splice(playerData[socket.id]-1, 1);
        // playerDataから該当のsocket.idを削除
        delete playerData[socket.id];

        // namesaveから該当する名前を削除（より複雑）
        // namesave配列の更新方法については下記参照

        // 全てのクライアントが切断された場合の処理
        // if (io.engine.clientsCount === 0) {
        //     count = 0; // ゲーム状態のリセットなど
        // }
    });
})

//ミドルウェアの設定
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//viewエンジンをejsであることを設定
app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.render("start")
});


app.post('/login', function (req, res) {
    //値を受け取りたい
    count++
    res.render("landing", { count: count, username: req.body.username });
});

server.listen(process.env.PORT || 3000, () => console.log('app listening on port 3000!'))












//練習だよ


// const people = [
//     { name: "Alice", age: 25 },
//     { name: "Bob", age: 16 },
//     { name: "Charlie", age: 30 }
//   ];
  
//   const adults = people.filter(function(person) {
//     console.log(person)
//     return person.age >= 18;
//   });
  


let aaa = ["こんにちは", "こんばんは", "おはよう"];

// インデックス1の要素を取り除く
aaa.splice(2, 1);

console.log(aaa);


  
  

