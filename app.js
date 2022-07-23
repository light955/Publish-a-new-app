const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);





let count = 0;
let idid = 0;



io.on('connection', function(socket) {
  console.log("接続しました")
  
  socket.on("idid",(idid,idid2)=>{
    console.log(idid)
    console.log(idid2)

    io.emit("rrr", idid,idid2);

  })

  socket.on("own_piece",(x,y,own_piece_id)=>{

    io.emit("own_piece_response", x,y,own_piece_id);

  })


  
  


})




//viewエンジンをejsであることを設定
app.set("view engine", "ejs");



app.get('/', function(req, res){
    count++
    res.render("landing", {count: count});
});



server.listen(3000, () => console.log('app listening on port 3000!'))


let obj = {name:"力斗",age:29}

obj.weight = 68;

console.log(obj)



