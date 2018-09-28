// var message={
//     init:function (argument) {
//         var that=this;
//         console.log('message init')
//         this.render();
//         this.bind();
//     },
//     render:function () {
//         var that=this;
//         that.btn=$('#btn')
//     },
//     bind:function () {
//         var that=this;
//         that.btn.on('click',$.proxy(that._go,this))
//     },
//     _go:function (e) {
//         console.log(e.target);
//     }
// }
// module.exports=message
class Message{
    constructor(x){
        this.x=x;
    }
    init(){
        console.log('message init')
        console.log(this.x)
    }
}
var message =new Message(2)

module.exports=message