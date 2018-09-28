const index={
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, index!';
    }

}
const hello={
    method: 'GET',
    path: '/hello/{name}',
    handler: (request, h) => {

        return 'Hello, index!'+encodeURIComponent(request.params.name);
    }

}
module.exports=[index,hello]