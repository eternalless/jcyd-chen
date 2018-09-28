import Koa from 'koa'
import serve from 'koa-static'
import co from 'co'
import config from './config'
import errorHandler from './middlewares/errorHandler'
import log4js from 'log4js'
import { asClass, asValue, createContainer,Lifetime} from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa'
const app = new Koa()
// 创建IOC容器
const container = createContainer()
// 每一次请求都是new一次类
app.use(scopePerRequest(container))
// 装载service
container.loadModules([__dirname+'/services/*.js'],{
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
})


log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname + '/logs/chen.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
errorHandler.error(app, logger)
// 自动注册所有的路由
app.use(loadControllers(__dirname + '/controllers/*.js', { cwd: __dirname }))
app.use(serve(config.staticDir))
app.listen(config.port, () => {
    console.log(`success listening on ${config.port}`)
})