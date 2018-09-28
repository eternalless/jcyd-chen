var express = require('express');
var app = express();
var swig = require('swig');
var mysql = require('mysql');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.use(express.static('public'))


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

connection.connect();

app.get('/', function (req, res) {
  res.render('index');
});
app.get('/register', function (req, res) {

  var post = [req.query.username, req.query.password]
  var sql = 'insert into user (username,password) values(?,?)'
  var query = connection.query(sql, post, function (err, result, fields) {
    if (err) {
      console.log(err);
      console.log('插入失败');
      return
    } else {
      console.log('插入成功')
      res.json({
        success: 'ok',
        data: '插入成功'
      })
    }

  });
})

//错误处理
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.error('记录日志', err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({error: 'Something blew up!'});
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  res.end('error哈哈哈');
}

app.listen(3001, function () {
  console.log('connect success')
});
