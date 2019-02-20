// const count = require("./count");
// const events = require("events");
// const util = require("util");
// const fs = require("fs");
// const http = require("http");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.listen(5500);

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/contact', (req, res) => {
    res.render('contact', {
        qs: req.query
    });
});
app.post('/contact', urlencodedParser, (req, res) => {
    console.log(req.body);
    res.render('contact-success', {
        data: req.body
    });
});

app.get('/profile/:name,id=:id', (req, res) => {
    var data = {
        age: 29,
        job: 'ninja',
        hobbies: ['eating', 'fighting', 'coding', 'masturbating']
    }
    res.render('profile', {
        id: req.params.id,
        name: req.params.name,
        data: data
    });
});








































// var myReadStream = fs.createReadStream(__dirname + '/readme.txt', );

// var myWriteStream = fs.createWriteStream(__dirname + '/ writeme2.txt')

// myReadStream.pipe(myWriteStream);


// //*********** create server  *****/
// const server = http.createServer((req, res) => {
//     console.log(`request was made: ${req.url}`);
//     if (req.url === '/home' || req.url === '/') {
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         });
//         fs.createReadStream(__dirname + '/index.html').pipe(res);
//     } else if (req.url === '/contact') {
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         });
//         fs.createReadStream(__dirname + '/contact.html').pipe(res);
//     } else if (req.url === '/api/homos') {
//         var homos = [{
//             name: 'atef',
//             age: 21
//         }, {
//             name: 'marwan',
//             age: 21
//         }, {
//             name: 'kimo',
//             age: 21
//         }, {
//             name: 'tika',
//             age: 35
//         }]
//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         });
//         res.end(JSON.stringify(homos));
//     } else {
//         res.writeHead(404, {
//             'Content-Type': 'text/html'
//         });
//         fs.createReadStream(__dirname + '/404.html').pipe(res);
//     }
// });

// server.listen(5500, "127.0.0.1");
// console.log(`yo dawgs,now listening to port 4000`);



















//***** make directory

// fs.mkdirSync('zeez');
// fs.mkdir('zeez', (err) => {
//     if (err) throw err;
//     fs.readFile('readme.txt', 'utf8', (er, data) => {
//         fs.writeFile('./zeez/writeme.txt', data, (e) => {
//             if (e) throw e;
//         })
//     })
// });

//***** remove directory

// fs.rmdirSync('zeez');
// fs.rmdir('zeez', (err) => {
//     if (err) throw err;
// });

//******* delete file
// fs.unlink('./zeez/writeme.txt', (eerr) => {
//     fs.rmdir('zeez', (eeerr) => {
//         if (eeerr) throw eeerr;
//     })
// });

// Syncrohnus approche

// var readme = fs.readFileSync('readme.txt', 'utf8');
// fs.writeFileSync('writeme.txt', readme + ' zeez');
// var writeme = fs.readFileSync('writeme.txt', 'utf8')
// console.log(readme);
// console.log(writeme);

//asynchronus approche
// fs.readFile('readme.txt', 'utf8', (err, data) => {
//     console.log('zeez');
//     fs.writeFile('zeez.txt', data, () => {
//         return;
//     });

// })