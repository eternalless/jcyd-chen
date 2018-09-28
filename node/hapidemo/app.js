'use strict';

const Hapi=require('hapi');
const routes=require('./routes')
// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});



for(let api of routes){
    server.route(api)
}

// Add the route
// server.route({
//     method:'GET',
//     path:'/hello',
//     handler:function(request,h) {
//
//         return'hello world';
//     }
// });

// Start the server
async function start() {
    //注册插件
    await server.register(require('inert'));
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response']
        }
    });
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();