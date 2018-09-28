var express = require('express');
var request = require('request');
const cheerio = require('cheerio')
var app = express();

app.get('/', function (req, res) {
    request('https://www.baidu.com/', function (error, response, body) {
       if(!error && response.statusCode==200){
           const $ = cheerio.load(body)
           res.json({
               data:$('#u1 a').length
           })
       }
    });
});

app.listen(3000, function () {
    console.log('success');
});

