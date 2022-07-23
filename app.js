//expressモジュールの読み込み
const express = require('express')
//expressのインスタンス化
const app = express()

//8080番ポートでサーバーを待ちの状態にする。
//またサーバーが起動したことがわかるようにログを出力する
app.listen(process.env.PORT || 3000, () => {
  console.log("サーバー起動中");
});

//GETリクエストの設定
//'/get'でアクセスされた時に、JSONとログを出力するようにする
app.get('/', (req, res)=> {
    console.log('GETリクエストを受け取りました')
    res.send("復活");
})