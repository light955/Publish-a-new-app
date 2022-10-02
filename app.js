const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);



let count = 0;



io.on('connection', function(socket) {
console.log("接続しました")

socket.on("idid",(idid,idid2)=>{

io.emit("rrr", idid,idid2);

})

socket.on("own_piece",(x,y,own_piece_id)=>{

io.emit("own_piece_response", x,y,own_piece_id);

})

socket.on("button",()=>{
    console.log("buttonを送信するばい")
    io.emit("button_response")
})

socket.on("button2",()=>{
    console.log("button2を送信するばい")
    io.emit("button_response2")
})



})

app.use(express.static('public'));


//viewエンジンをejsであることを設定
app.set("view engine", "ejs");





app.get('/', function(req, res){
count++
res.render("landing", {count: count});
});

//あそび

app.get('/rrr', function(req, res){
    res.send("rrrばい");
    });
    






server.listen(process.env.PORT || 3000, () => console.log('app listening on port 3000!'))

