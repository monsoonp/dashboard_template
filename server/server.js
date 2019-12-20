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

const conn = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

//const multer = require('multer');   //multer 라이브러리 중복되지 않는 형태로 업로드
//const upload = multer({dest: './upload'})

//SNMP
const snmp = require("net-snmp");
// const session = snmp.createSession("127.0.0.1", "public");
// Default options

// const nonRepeaters = 2;

app.get("/snmp/get", (req, res) => {
  const options = {
    port: 161,
    retries: 1,
    timeout: 5000,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version2c,
    idBitsSize: 16
  };
  // const session = snmp.createSession("127.0.0.1", "public", options);
  const session = snmp.createSession("127.0.0.1", "public");
  const oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"]; //, "1.3.6.1.2.1.1.7.0"
  session.get(oids, function(error, varbinds) {
    if (error) {
      console.error(error);
    } else {
      for (var i = 0; i < varbinds.length; i++)
        if (snmp.isVarbindError(varbinds[i]))
          console.error(snmp.varbindError(varbinds[i]));
        else console.log(varbinds[i].oid + " = " + varbinds[i].value);
    }
    console.log(varbinds);
    // If done, close the session
    res.send({
      varbinds: varbinds,
      match: varbinds[0].value.toString()
    });
    session.close();
  });

  session.trap(snmp.TrapType.LinkDown, function(error) {
    if (error) console.error(error);
  });
});

app.get("/snmp/set", (req, res) => {
  const session = snmp.createSession("192.168.0.38", "public");
  var varbinds = [
    {
      oid: "1.3.6.1.2.1.1.5.0",
      type: snmp.ObjectType.OctetString,
      value: "host1"
    },
    {
      oid: "1.3.6.1.2.1.1.6.0",
      type: snmp.ObjectType.OctetString,
      value: "somewhere"
    }
  ];

  session.set(varbinds, function(error, varbinds) {
    if (error) {
      console.error(error.toString());
    } else {
      for (var i = 0; i < varbinds.length; i++) {
        // for version 1 we can assume all OIDs were successful
        console.log(varbinds[i].oid + "|" + varbinds[i].value);

        // for version 2c we must check each OID for an error condition
        if (snmp.isVarbindError(varbinds[i]))
          console.error(snmp.varbindError(varbinds[i]));
        else console.log(varbinds[i].oid + "|" + varbinds[i].value);
      }
    }
  });
  session.close();
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
  const num = Math.random() * 10;
  io.emit("WeatherAPI", {
    temperature: (num * 2 - 10).toFixed(1),
    summary: parseInt(num * 10)
  });
}, 2000);

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
    "SELECT * from test_list order by id desc", // WHERE checkTime BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK ) AND NOW()
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});
app.get("/admin/home/selecter", (req, res) => {
  conn.query(
    "select pageName from test_list group by pageName order by id desc",
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
