"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const errorHandler = {
    error(app, logger) {
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                // console.log(error);
                logger.error(error);
                //服务器接口 
                //单独把log4js 接入到 集群服务器
                //邮件 短信和电话 rtx 
                ctx.status = error.status || 500;
                ctx.body = "请求出错(⊙︿⊙)";
            }
        });
        app.use(async (ctx, next) => {
            await next();
            if (404 != ctx.status) return;
            ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>';
        });
    }
};
exports.default = errorHandler;