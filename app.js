var express = require('express');
var app = express();
var http = require('http').Server(app);

var mysql = require('mysql');

var connection = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '/Applications/MAMP/tmp/mysql/mysql.sock',
        database: 'election2017'
    })
};

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/election.html');
});

app.get('/api/candidat', function (req, res) {

    var _c = connection(),
        _q = 'SELECT * FROM candidat';

    _q += typeof req.query.id !== 'undefined' ? ' WHERE id=' + req.query.id : '';

    _c.connect();
    _c.query(_q, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });

    _c.end();

});

app.get('/', function (req, res) {

    var _c = connection(),
        _q = 'SELECT vote FROM vote LEFT JOIN voting ON vote.lastname = voting.lastname';

    _c.connect();
    _c.query(_q, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });

    _c.end();

});

app.post('/api/votant', function (req, res) {

    var _body = req.body;

    var _c = connection(),
        _q = "INSERT INTO voting (firstname, lastname, age) VALUES ('" + _body.firstname + "', '" + _body.lastname + "', '" + _body.age + "')";

    _c.connect();
    _c.query(_q, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });

    _c.end();

});

app.post('/api/vote', function (req, res) {

    var _body = req.body;

    var _c = connection(),
        _q = "INSERT INTO vote (lastname, vote) VALUES ('" + _body.lastname + "', '" + _body.vote + "')";

    _c.connect();
    _c.query(_q, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });

    _c.end();

});

app.get('/api/vote', function (req, res) {

    var _c = connection(),
        _q = 'SELECT * FROM vote';

    _q += typeof req.query.id !== 'undefined' ? ' WHERE id=' + req.query.id : '';

    _c.connect();
    _c.query(_q, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });

    _c.end();

});

app.get('/api/votant', function (req, res) {

    var _c = connection(),
        _q = 'SELECT * FROM voting';

    _q += typeof req.query.id !== 'undefined' ? ' WHERE id=' + req.query.id : '';

    _c.connect();
    _c.query(_q, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });

    _c.end();

});




http.listen(1337, function () {
    console.log('listening on *:1337');
});