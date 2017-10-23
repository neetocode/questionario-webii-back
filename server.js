require('dotenv').config();
import setupApp from './src/setupApp'
import http from 'http'


const port = normalizePort(process.env.PORT || '3000');

console.log('iniciando setup');

setupApp()
	.then(app => {
		console.log('setup ok');
		const server = http.createServer(app)

		app.set('port', port)

		server.listen(port)
		server.on('error', onError)
		server.on('listening', () => {
			const addr = server.address();
			const bind = typeof addr === 'string'
				? 'pipe ' + addr
				: 'port ' + addr.port;
			console.log('Listening on ' + bind);
		})
	})
	.catch((error) => {
		console.log(error)
		console.log(JSON.stringify(error))
		process.exit(1)
	})

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}