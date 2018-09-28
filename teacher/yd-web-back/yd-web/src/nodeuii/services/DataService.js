export default class DataService {
    getData(){
        return new Promise((resolve)=>{
            setTimeout(function(){
                resolve("IndexAction异步数据");
            },1000);
        })
    }
}