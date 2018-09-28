const Koa = require('koa');
const app = new Koa();
const router = require('koa-simple-router')
const serve = require('koa-static');
const path = require('path')
const co = require('co');
const render = require('koa-swig');
// app.keys = ['im a newer secret', 'i like turtle'];
app.use(serve(path.join(__dirname,'./public')));

// response
// app.use(async ctx => {
//     console.log('3')
//     ctx.body = 'Hello World';
//     ctx.cookies.set('name', 'tobi', { signed: true });
//     console.log(ctx.request.url)
// });
// app.on('error', err => {
//     console.error('server error', err)
// });

app.context.render = co.wrap(render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));

app.use(router(_ => {
    _.get('/', (ctx, next) => {
        ctx.body = 'hello,it is 3000'
    })
    // app.use(async ctx => ctx.body = await ctx.render('index'));
    _.get('/name', async(ctx, next) => {
      ctx.body=await ctx.render('index')
    })
}))





app.listen(3000, () => {
    console.log('success')
});
