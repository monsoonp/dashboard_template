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
      `https://api.darksky.net/forecast/${conf.api_key}/37.7415,127.0474?lang=ko&units=si`
    ); // Getting the data from DarkSky

    io.emit("WeatherAPI", res.data.currently); // Emitting a new message. It will be consumed by the client
    // sockets.forEach(s => s.broadcast.emit("WeatherAPI", res.data.currently.temperature));
  } catch (error) {
    console.error(`${error}`);
  }
};

// socket.io
let clients = [];

/*
let interval;
if (interval) {
  clearInterval(interval);
}
interval = 
setInterval(() => getApiAndEmit(), 30000);
*/

/*
// let testApi;
*/
setInterval(() => {
  io.emit("WeatherAPI", {
    temperature: (Math.random() * 10).toFixed(1),
    summary: parseInt(Math.random() * 100)
  });
}, 5000);

io.on("connection", socket => {
  /*  클라이언트 최초 추가시 api 시작
  if (clients.length === 0) {
    console.log("Api start");
    testApi = setInterval(() => {
      io.emit("WeatherAPI", {
        temperature: (Math.random() * 10).toFixed(1),
        summary: parseInt(Math.random() * 100)
      });
    }, 5000); 
  }
  */
  clients.push(socket);
  console.log("New client connected : ", socket.id);

  socket.on("message", message => {
    // handle message...
    // clients.forEach(c => c.emit("message", message));
    socket.broadcast.emit("message", message); //, broadcast 나 이외 다른 소켓에
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected : %s", socket.id);
    clients = clients.filter(c => c.id !== socket.id);
    /* 클라이언트가 존재하지 않으면 api 종료
    if (clients.length === 0) {
      clearInterval(testApi);
      console.log("Api shutdown");
    }
    */
  });
  socket.on("error", err => {
    console.log("received error from client : %s", socket.id, err);
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
