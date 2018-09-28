var indexModel=require('../model/indexModel')
var initCol={
    init:function (app) {
        app.get('/aa', function (req, res) {
            indexModel.getData(function (data) {
                res.send(data)
            })
        });
        app.get('/aaa/:id', function (req, res, next) {
            console.log('aaa',req.params)
            next()
        },function (req, res, next) {
                res.send('eeeee'+req.params.id)
            }
            );
    }
}
module.exports=initCol