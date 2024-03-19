const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

let count = 0;

let namesave = [];
let playerData = {};

io.on('connection', function (socket) {
    if(count == 1){
        playerData[socket.id] = 1
    }
    if(count == 2){
        playerData[socket.id] = 2
    }
    socket.on('page_loaded', function (data) {
        namesave.push(data.message)
        // 必要な処理をここで行う
        io.emit("formdata", namesave);
    });

    socket.on("ban_click", (ban_x, ban_y,turn) => {
        if(!(playerData[socket.id] === turn)){
            console.log("あなたのターンではないよ!!")
            return
        }
        io.emit("ban_click_res", ban_x, ban_y);
    })

    socket.on("own_piece", (x, y, own_piece_id,turn) => {
        if(!(playerData[socket.id] === turn)){
            console.log("あなたのターンではないよ!!")
            return
        }

        io.emit("own_piece_response", x, y, own_piece_id);
    })

    socket.on("button", () => {
        console.log("buttonを送信するばい")
        io.emit("button_response")
    })

    socket.on("button2", () => {
        console.log("button2を送信するばい")
        io.emit("button_response2")
    })
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
    res.render("landing", { count: count,username: req.body.username});
});

server.listen(process.env.PORT || 3000, () => console.log('app listening on port 3000!'))

