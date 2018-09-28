import {
    GET,
    route
} from 'awilix-koa';
export default
@route("/test")
//controller
class IndexController {
    constructor({indexService}){
        this.indexService = indexService;
    }
    @GET()
    async indexAction(ctx) {
        const data = await this.indexService.getData();
        ctx.body = 111;
    }
}