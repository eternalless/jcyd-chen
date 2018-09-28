'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _awilix = require('awilix');

var _awilixKoa = require('awilix-koa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
// 创建IOC容器
const container = (0, _awilix.createContainer)();
// 每一次请求都是new一次类
app.use((0, _awilixKoa.scopePerRequest)(container));
// 装载service
container.loadModules([__dirname + '/services/*.js'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
});

_log4js2.default.configure({
  appenders: { cheese: { type: 'file', filename: __dirname + '/logs/chen.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = _log4js2.default.getLogger('cheese');
_errorHandler2.default.error(app, logger);
// 自动注册所有的路由
app.use((0, _awilixKoa.loadControllers)(__dirname + '/controllers/*.js', { cwd: __dirname }));
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
app.listen(_config2.default.port, () => {
  console.log(`success listening on ${_config2.default.port}`);
});