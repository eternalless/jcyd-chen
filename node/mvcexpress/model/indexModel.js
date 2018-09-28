var request =require('request')
var cheerio =require('cheerio')
var indexModel={
    getData:function (cb) {
        request('https://www.baidu.com/', function (error, response, body) {
            const $ = cheerio.load(body)
            console.log($('#su').val())
            cb($('#su').val())
        });
    }
}
module.exports=indexModel