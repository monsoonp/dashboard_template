/* eslint-disable no-undef */
const fs = require("fs"); // file system
const serverIp = require("ip");
// const path = require("path");
// const os = require("os");
const express = require("express"); // Web App Framework / http wrapper
// const url = require("url");

const app = express(); // express
const server = require("http").createServer(app); // Http Library, Http Server Instance 생성
// Express 대신 직접 Http 서버 생성, 동일한 서버 instance에서 socket.io사용 등 http server 재사용시 유용

const io = require("socket.io")(server); // socket.io
const axios = require("axios"); // Async Http 통신 Library / Promise 기반 async/await
// 구형 브라우저 지원, fetch의 경우 polyfill 필요

// const _ = require("lodash"); // JS util library / array, object 비교

// const bodyParser = require("body-parser"); // post request의 data로 부터 parameter 추출,
// var iconv  = require('iconv').iconv; // 인코딩을 변환 해주는 모듈, iconv, iconv-lite
// const charset = require('charset') // 해당 사이트의 charset값을 알 수 있게 해준다.
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./config.json"); // DB configure file
const port = process.env.PORT || 5000; // server port

const conf = JSON.parse(data); // DB data to json
const mysql = require("mysql"); // MySQL

const conn = mysql.createConnection({
  // DB connection
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

//const multer = require('multer');   //multer 라이브러리 중복되지 않는 형태로 업로드
//const upload = multer({dest: './upload'})

function getUserIP(req) {
  // http server - getUserIP(req);, socket(callback) - getUserIP(socket.handshake);
  let ipAddress;
  if (!!req.hasOwnProperty("sessionID")) {
    ipAddress = req.headers["x-forwarded-for"];
  } else {
    if (!ipAddress) {
      var forwardedIpsStr = req.header("x-forwarded-for");

      if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(",");
        ipAddress = forwardedIps[0];
      }
      if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
      }
    }
  }
  return ipAddress.replace("::ffff:", "");
}

//SNMP
const snmp = require("net-snmp"); // snmp library

//test
app.get("/snmp/test", (req, res) => {
  // let ip = getUserIP(req).split(":");
  // ip = ip[ip.length - 1];
  let ip = getUserIP(req);
  console.log(ip);
  let oids = [
    "1.3.6.1.2.1.80.1.4.1.1",
    "1.3.6.1.2.1.80.1.4.1.2",
    "1.3.6.1.2.1.80.1.4.1.3",
    "1.3.6.1.2.1.80.1.4.1.8",
    "1.3.6.1.2.1.10.46.1.4",
    "1.3.6.1"
  ];
  let next = [];
  let bulk = [];
  const options = {
    version: snmp.Version2c
  };
  var nonRepeaters = 6; // oid 수
  const session = snmp.createSession(ip, "public", options);
  // mib 상 해당 oid가 없으면 다음 oid가 매칭

  session.getNext(oids, function(error, varbinds) {
    if (error) {
      console.error(error.toString());
    } else {
      for (var i = 0; i < varbinds.length; i++) {
        /*
        // for version 1 we can assume all OIDs were successful
        console.log(varbinds[i].oid + "|" + varbinds[i].value);
        */
        // for version 2c we must check each OID for an error condition
        if (snmp.isVarbindError(varbinds[i]))
          console.error(snmp.varbindError(varbinds[i]));
        else {
          console.log(varbinds[i].oid + "|" + varbinds[i].value);
        }
      }
      next = varbinds;
    }
    // res.send(varbinds);
  });
  session.getBulk(oids, nonRepeaters, function(error, varbinds) {
    if (error) {
      console.error(error.toString());
    } else {
      // step through the non-repeaters which are single varbinds
      for (let i = 0; i < nonRepeaters; i++) {
        if (i >= varbinds.length) break;

        if (snmp.isVarbindError(varbinds[i]))
          console.error(snmp.varbindError(varbinds[i]));
        else console.log(varbinds[i].oid + "|" + varbinds[i].value);
      }

      // then step through the repeaters which are varbind arrays
      for (let i = nonRepeaters; i < varbinds.length; i++) {
        for (let j = 0; j < varbinds[i].length; j++) {
          if (snmp.isVarbindError(varbinds[i][j]))
            console.error(snmp.varbindError(varbinds[i][j]));
          else console.log(varbinds[i][j].oid + "|" + varbinds[i][j].value);
        }
      }
      bulk = varbinds;
    }
    // res.send(varbinds);
  });
  res.send({ next: next, bulk: bulk });
});

//system
app.get("/snmp/get", (req, res) => {
  let ip = getUserIP(req);
  const options = {
    version: snmp.Version2c
  };
  // const session = snmp.createSession("DESKTOP-ND7M4HH", "public", options);
  const session = snmp.createSession(ip, "public", options);
  const oids = [
    "1.3.6.1.2.1.1.1.0",
    "1.3.6.1.2.1.1.2.0",
    "1.3.6.1.2.1.1.3.0",
    "1.3.6.1.2.1.1.4.0",
    "1.3.6.1.2.1.1.5.0",
    "1.3.6.1.2.1.1.6.0",
    "1.3.6.1.2.1.1.7.0"
  ];
  session.get(oids, function(error, varbinds) {
    if (error) {
      console.error(error);
    } else {
      for (var i = 0; i < varbinds.length; i++)
        if (snmp.isVarbindError(varbinds[i]))
          console.error(snmp.varbindError(varbinds[i]));
        else console.log(varbinds[i].oid + " = " + varbinds[i].value);
    }

    // If done, close the session
    session.close();

    let values = [];
    varbinds.forEach((e, i) => {
      values.push({ [i]: e.value.toString() });
    });
    res.send({
      varbinds: varbinds,
      match: values
    });
  });

  session.trap(snmp.TrapType.LinkDown, function(error) {
    if (error) console.error(error);
  });
});

app.get("/snmp/port", (req, res) => {
  let ip = getUserIP(req);
  const options = {
    // port: 161,
    // retries: 1,
    // timeout: 5000,
    transport: "udp4", //udp6
    // trapPort: 162,
    version: snmp.Version2c
    // idBitsSize: 32
  };
  const session = snmp.createSession(ip, "public", options);
  // const session = snmp.createSession("127.0.0.1", "public");
  const oids = [
    // "1.3.6.1.4.1.9.2.1.56.0" //average cpu load for 5 sec
    // "1.3.6.1.2.1.1.3.0" // UpTime
    // "1.3.6.1.4.1.9.2.1.2.0" //reboot reason
    // "1.3.6.1.2.1.4.6.0" // 라우팅한 패킷 수
    // "1.3.6.1.2.1.7.5.1.2" //local port
    // "1.3.6.1.2.1.4.12.0"
    // "1.3.6.1.2.1.6.12.1.3.0"
    // "1.3.6.1.4.1.2021.10.1.3.1"
    // "1.3.6.1.4.1.2021.11.9.0"
    // "1.3.6.1.4.1.2021.11.52.0"
    // "1.3.6.1.4.1.2021.4.1" // memory index
    // "1.3.6.1.4.1.2021.4.6" //
    // "1.3.6.1.4.1.2021.11.9"
    // "1.3.6.1.2.1.25.3.3.1.2" // 메모리
    // "1.3.6.1.2.1.2.2.1.2.36" //iftable
    "1.3.6.1.2.1.2.1.0" // ifNumber
  ];
  session.get(oids, function(error, varbinds) {
    if (error) {
      console.error(error);
    } else {
      for (var i = 0; i < varbinds.length; i++)
        if (snmp.isVarbindError(varbinds[i]))
          console.error(snmp.varbindError(varbinds[i]));
        else
          console.log(
            varbinds[i].oid +
              " = " +
              varbinds[i].value +
              " (" +
              varbinds[i].type +
              ")"
          );

      // console.log(varbinds);
    }
    // If done, close the session
    res.send({
      varbinds: varbinds
      // test: varbinds[0].value.toString()
    });
    session.close();
  });
  session.trap(snmp.TrapType.LinkDown, function(error) {
    if (error) console.error(error);
  });
});

app.get("/snmp/table", (req, res) => {
  let ip = getUserIP(req);
  const options = {
    version: snmp.Version2c
  };
  const session = snmp.createSession(ip, "public", options);
  // const oid = "1.3.6.1.2.1.4.22";
  const oid = "1.3.6.1.2.1.4.21";
  // "1.3.6.1.2.1.2.2"  // ifTable - 연결된 물리 장치 이름 .1.2
  // "1.3.6.1.2.1.4.22" // ipNetToMediaEntry - 네트워크상 ip 목록 .1.3

  // "1.3.6.1.2.1.4.20" // ipAddr
  // "1.3.6.1.2.1.4.21" // ipRoute
  // "1.3.6.1.2.1.6.13" // tcpConn
  // "1.3.6.1.2.1.7.5"  //  udp
  // "1.3.6.1.2.1.7.7"  //  udpEndpoint
  // "1.3.6.1.2.1.80.1.3" // pingResult
  // "1.3.6.1.2.1.80.1.4" // pingPropsHistory
  // "1.3.6.1.4.1.9.9.16.1.1" // ciscoPing
  // "1.3.6.1.2.1.80.1.2", "1.3.6.1.2.1.80.1.2.1.21"

  // "1.3.6.1.4.1.2021.9" // disk
  // "1.3.6.1.2.1.25.2.3" // hrStorage
  // "1.3.6.1.2.1.25.3.3" // hrProcessor

  function responseCb(error, table) {
    if (error) {
      res.send(error.toString());
      // return error.toString();
    } else {
      Object.keys(table).map((key, index) => {
        return console.log(index, key, table[key]);
        // console.log(new Uint8Array(table[key][2]));
        // console.log(table[key][2].toString("hex")); // ascii, ("ascii",0,10), hex, utf8, binary, base64
      });
      res.send(table);
      // return table;
    }
  }

  var maxRepetitions = 20;
  console.log(session.table(oid, maxRepetitions, responseCb));
});

app.get("/snmp/column", (req, res) => {
  let ip = getUserIP(req);
  const session = snmp.createSession(ip, "public");

  // "1.3.6.1.2.1.2.2"  // ifTable
  // "1.3.6.1.2.1.6.13"
  // "1.3.6.1.2.1.4.20" // ip
  // "1.3.6.1.2.1.4.22" // ipNetToMediaEntry
  // "1.3.6.1.2.1.17.4.3" // dot1dTpFdbEntry - MAC / not work
  // "1.3.6.1.2.1.4.34" // ipAddress / not work
  // "1.3.6.1.2.1.10.46.1.4" // ipoaArpClientTable
  // "1.3.6.1.2.1.10.46.1.5" // ipoaArpSrvrTable

  const oid = "1.3.6.1.2.1.4.22";
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];
  let ifList = [];
  function sortInt(a, b) {
    if (a > b) return 1;
    else if (b > a) return -1;
    else return 0;
  }

  function responseCb(error, table) {
    if (error) {
      console.error(error.toString());
    } else {
      // This code is purely used to print rows out in index order,
      // ifIndex's are integers so we'll sort them numerically using
      // the sortInt() function above
      let indexes = [];
      for (index in table) indexes.push(parseInt(index));
      indexes.sort(sortInt);

      // Use the sorted indexes we've calculated to walk through each
      // row in order
      for (var i = 0; i < indexes.length; i++) {
        // Like indexes we sort by column, so use the same trick here,
        // some rows may not have the same columns as other rows, so
        // we calculate this per row
        let columns = [];
        for (column in table[indexes[i]]) columns.push(parseInt(column));
        columns.sort(sortInt);

        // Print index, then each column indented under the index
        console.log("row for index = " + indexes[i]);
        for (var j = 0; j < columns.length; j++) {
          console.log(
            "\tcolumn " + columns[j] + " = " + table[indexes[i]][columns[j]]
          );
          ifList.push({
            [oid + "." + columns[j] + "." + i]: table[indexes[i]][
              columns[j]
            ].toString()
          });
        }
      }
    }
    res.send(table);
    // res.send(ifList);
  }

  var maxRepetitions = 20;

  // The maxRepetitions argument is optional, and will be ignored unless using
  // SNMP verison 2c
  session.tableColumns(oid, columns, maxRepetitions, responseCb);
});

app.get("/snmp/set", (req, res) => {
  let ip = getUserIP(req);
  const session = snmp.createSession(ip, "public");
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
app.get("/snmp/walk", (req, res) => {
  let ip = getUserIP(req);
  const options = {
    version: snmp.Version2c
  };
  const session = snmp.createSession(ip, "public", options);
  const oid = "1.3.6.1.2.1.80";
  // "1.3.6.1.2.1.2.2"

  function doneCb(error) {
    if (error) console.error(error.toString());
  }
  let list = [];
  function feedCb(varbinds) {
    for (var i = 0; i < varbinds.length; i++) {
      if (snmp.isVarbindError(varbinds[i]))
        console.error(snmp.varbindError(varbinds[i]));
      else {
        console.log(varbinds[i].oid + "|" + varbinds[i].value);
        list.push(varbinds[i].oid + "|" + varbinds[i].value);
      }
    }
    // res.send(varbinds);
  }

  const maxRepetitions = 20;

  session.walk(oid, maxRepetitions, feedCb, doneCb);
  res.send(list);
});

app.get("/snmp/local", (req, res) => {
  let ip = getUserIP(req);
  const options = {
    version: snmp.Version2c
  };
  const session = snmp.createSession(ip, "public", options);
  const oid = "1.3.6.1.2.1.4.22"; //ipNetToMediaTable
  // "1.3.6.1.2.1.4.20" //ipAddrTable
  function responseCb(error, table) {
    let ipList = [];
    const reg = /^192\.168\.[0-9]*.[0-9]*/;
    if (error) {
      res.send(error.toString());
      // return error.toString();
    } else {
      Object.keys(table).map((key, index) => {
        if (table[key][3].match(reg)) {
          ipList.push(table[key]);
        }
        // console.log(table[key][3].match(reg));
        // console.log(index, key, table[key][3]);
        return console.log(index, table[key][3]);
      });
      res.send(ipList);
    }
  }
  var maxRepetitions = 20;
  console.log(session.table(oid, maxRepetitions, responseCb));
});
let tcpList = [];
app.get("/snmp/tcp", (req, res) => {
  // let ip = getUserIP(req);
  const options = {
    version: snmp.Version2c
  };
  const session = snmp.createSession(serverIp.address(), "public", options);
  const oid = "1.3.6.1.2.1.6.13"; //tcpConnTable

  function responseCb(error, table) {
    if (error) {
      console.log(error.toString());
      // res.send(tcpList);
    } else {
      Object.keys(table).map((key, index) => {
        return console.log(index, key, table[key]);
      });
      // res.send(table);
      let result = [];
      Object.keys(table).map(e => result.push(table[e]));
      tcpList = result;
      res.send(tcpList);
    }
  }

  var maxRepetitions = 20;
  console.log(session.table(oid, maxRepetitions, responseCb));
});
app.get("/snmp/device", (req, res) => {
  // let ip = getUserIP(req);
  const options = {
    version: snmp.Version2c
  };
  const session = snmp.createSession(serverIp.address(), "public", options);

  const oid = "1.3.6.1.2.1.2.2";
  // const columns = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];
  let ifList = [];
  function sortInt(a, b) {
    if (a > b) return 1;
    else if (b > a) return -1;
    else return 0;
  }

  function responseCb(error, table) {
    if (error) {
      console.error(error.toString());
      res.send([]);
    } else {
      var indexes = [];
      for (index in table) indexes.push(parseInt(index));
      indexes.sort(sortInt);

      for (var i = 0; i < indexes.length; i++) {
        var columns = [];
        for (column in table[indexes[i]]) columns.push(parseInt(column));
        columns.sort(sortInt);

        for (var j = 0; j < columns.length; j++) {
          ifList.push({
            [oid + "." + columns[j] + "." + i]: table[indexes[i]][
              columns[j]
            ].toString()
          });
        }
      }
    }
    let result = [];
    Object.keys(table).map(e => result.push(table[e]));
    res.send(result);
    // res.send(ifList);
  }

  var maxRepetitions = 20;

  session.tableColumns(oid, columns, maxRepetitions, responseCb);
});
let addr;
// const filename = path.join("./snmp", "ip.csv"); //__dirname same folder
const localAddress = socket => {
  let ipList = [];
  try {
    const options = {
      version: snmp.Version2c
    };
    const session = snmp.createSession(serverIp.address(), "public", options);
    const oid = "1.3.6.1.2.1.4.22"; //ipNetToMediaTable
    // "1.3.6.1.2.1.4.20" //ipAddrTable
    function responseCb(error, table) {
      if (error) {
        res.send(error.toString());
        // return error.toString();
      } else {
        Object.keys(table).map((key, index) => {
          // ipList.push(table[key][3]);
          let obj = { index: index, key: key, table: table[key] };
          ipList.push(obj);
          return null;
        });
        addr = ipList;
        // res.send(ipList);
      }
    }
    // console.log(addr);

    var maxRepetitions = 20;
    session.table(oid, maxRepetitions, responseCb);
    // fs.writeFileSync(filename, ipList.join(os.EOL));
    fs.writeFile("./snmp/ip.csv", JSON.stringify(addr), "utf8", function(err) {
      if (err) {
        console.log(
          "Some error occured - file either not saved or corrupted file saved."
        );
      } else {
        io.emit("localAddress", addr);
      }
    });
    // console.log(session.table(oid, maxRepetitions, responseCb));
  } catch (error) {
    console.error(`${error}`);
  }
};
setInterval(() => localAddress(), 5000);

app.get("/snmp/read", (req, res) => {
  // ip list from csv file
  fs.readFile("./snmp/ip.csv", "utf8", function(err, data) {
    if (err) {
      console.log("can not read file: ", err);
    } else {
      res.send(data);
    }
  });
});

// darksky api
let weather;
const getWeatherApi = async () => {
  try {
    const res = await axios.get(
      `https://api.darksky.net/forecast/${conf.api_key}/37.7415,127.0474?lang=ko&units=si`
    ); // Getting the data from DarkSky
    weather = res.data.currently;
    // io.emit("WeatherAPI", weather); // Emitting a new message. It will be consumed by the client
    // sockets.forEach(s => s.broadcast.emit("WeatherAPI", res.data.currently.temperature));
  } catch (error) {
    console.error(`${error}`);
  }
};
const weatherSocket = socket => {
  if (weather) {
    io.emit("WeatherAPI", weather);
  }
};

/*
let interval;
if (interval) {
  clearInterval(interval);
}
interval = 
*/
setInterval(() => getWeatherApi(), 60000);
setInterval(() => weatherSocket(), 3000);

/*
// let testApi;
setInterval(() => {
  const num = Math.random() * 10;
  io.emit("WeatherAPI", {
    temperature: (num * 2 - 10).toFixed(1),
    summary: parseInt(num * 10)
  });
}, 2000);
 */

// socket.io
let clients = [];

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
app.get('/api/list', (req, res) => {  // DB 기본 query
    conn.query("SELECT * FROM MYTABLE", (err, rows, fields) => {
        res.send(rows);
    })
    
});
app.get('/api/date', (req, res) => { 
    conn.query("SELECT NOW() as now", (err, rows, fields) => {
        res.send(rows);
    })
});
app.get('/query/:id', (req, res) => { // :id - params / ?id=?? - query 
    res.send({"id":req.query.id,"name":req.query.name, "path":req.params.id});
});

app.use('/image', express.static('./upload'));  // 이미지 저장 경로
app.post('/api/list', upload.single('image'), (req, res) =>{  // image 업로드
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
