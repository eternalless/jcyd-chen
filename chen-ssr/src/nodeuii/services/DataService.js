export default class DataService {
    getData(){
        return new Promise((resolve) => {
            setTimeout(function () {
                resolve('异步数据')
            }, 1000)
        })
    }
}
