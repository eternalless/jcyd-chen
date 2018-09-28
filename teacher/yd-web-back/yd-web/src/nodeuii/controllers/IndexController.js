import {
    GET,
    route
} from 'awilix-koa';
export default
@route("/")
@route("/index.html")
//controller
class IndexController {
    constructor({
        dataService
    }) {
        this.dataService = dataService;
    }
    // /test/123
    //action
    // @route("/test/:id")
    @GET()
    async indexAction(ctx) {
        //ctx.query => ajax
        //ctx.params.id => /test/:id"
        const result = await this.dataService.getData();
        ctx.body = await ctx.render('index/pages/index', {
            data: result
        })
    }
}