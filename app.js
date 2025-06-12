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
    //こちらは観戦用ばい(笑)
    if (playercount > 2) {
        playerData[socket.id] = 3
    }
    socket.on('page_loaded_username', function (data) {
        if (playercount <= 2) {
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
        if (playerData[socket.id] == 1 && own_piece_id == "field_1" || playerData[socket.id] == 2 && own_piece_id == "field_2") {
            io.emit("own_piece_response", x, y, own_piece_id);
        } else {
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
    //ページが閉じられたり、戻ったりすると下記を実行
    socket.on('disconnect', function () {
        io.emit("discon");
        resetServerState();
    });
})

//リセット
function resetServerState() {
    //すべてリセット
    count = 0;
    playercount = 0;
    namesave = [];
    playerData = {};
}


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