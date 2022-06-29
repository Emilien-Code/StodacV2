const http = require('http');
const app = require('./app');
const paypalCtrl = require('./controller/paypal')
require('dotenv').config()

const normalizePort = val => {
    const port = parseInt(val, 10);
    if(isNaN(port)){
        return val;
    }
    if(port >= 0){
        return port;
    }
    return false
};

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const errorHandler = error => {
    if(error.syscall !== 'listen'){
        throw error;
    }
    const adress = server.adress();
    const bind = typeof adress === 'string' ? 'pipe ' + address : 'port:' + port;
    switch (error.code){
        case 'EACCES':
            console.error(bind + ' require elevated privilège.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' already in use.');
            process.exit(1);
            break;
        default: 
            throw error;
    }
}

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const adress = server.address();
    const bind = typeof adress === 'string' ? 'pipe ' + address : 'port ' + port; 
})
if(paypalCtrl.demandeToken){
    console.log("token paypal recupe")
}
else{
    console.log("token paypal pas recupe")
}
console.log('port: ', port);
server.listen(port);