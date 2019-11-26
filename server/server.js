const fs = require("fs");
const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const axios = require("axios");

// const bodyParser = require("body-parser");
//var iconv  = require('iconv').iconv; //인코딩을 변환 해주는 모듈, 필자는 iconv보다 iconv-lite를 선호한다.
//const charset = require('charset') //해당 사이트의 charset값을 알 수 있게 해준다.
// app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./config.json");
const port = process.env.PORT || 5000;

const conf = JSON.parse(data);
const mysql = require("mysql");

//const multer = require('multer');   //multer 라이브러리 중복되지 않는 형태로 업로드
//const upload = multer({dest: './upload'})

const conn = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      // "https://api.darksky.net/forecast/942bb1b70fa2577154a10be95440badd/43.7695,11.2558"
      "https://api.darksky.net/forecast/942bb1b70fa2577154a10be95440badd/37.7415,127.0474?lang=ko&units=si"
    ); // Getting the data from DarkSky
    socket.emit("WeatherAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
// socket.io

const clients = [];

let interval;
io.on("connection", socket => {
  clients.push(socket);
  console.log("New client connected ID: ", socket.id);
  socket.on("message", message => {
    // handle message...
    clients.forEach(c => c.emit("message", message));
  });
  if (interval) {
    clearInterval(interval);
  }
  // interval = setInterval(() => getApiAndEmit(socket), 30000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clients.filter(c => c.id !== socket.id);
  });
  socket.on("error", err => {
    console.log("received error from client: %s", socket.id, err);
  });
});

// demo

app.get("/admin/home/list", (req, res) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  conn.query(
    "SELECT * from test_list order by id desc",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

server.listen(port, () => console.log(`Listening on port ${port}`));
// app.listen(port, () => console.log(`Listening on port ${port}`));

//test
/*
app.get('/api/list', (req, res) => {
    conn.query("SELECT * FROM MYTABLE", (err, rows, fields) => {
        res.send(rows);
    })
    
});
app.get('/api/date', (req, res) => {
    conn.query("SELECT NOW() as now", (err, rows, fields) => {
        res.send(rows);
    })
});
app.get('/query/:id', (req, res) => {
    res.send({"id":req.query.id,"name":req.query.name, "path":req.params.id});
});

app.use('/image', express.static('./upload'));
app.post('/api/list', upload.single('image'), (req, res) =>{
    let sql = 'INSERT INTO MYTABLE values (null,?,?,?)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let email = req.body.email;
    let params = [name, email, image];
    conn.query(sql, params, (err, rows, fields) =>{
        res.send(rows);
    });
});
*/
