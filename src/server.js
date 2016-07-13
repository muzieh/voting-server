import Server from 'socket.io';

export default function startServer(store) {
	const io = new Server().attach(8095);

	console.log('starting server....');
	console.log(io);

	store.subscribe(
		() => io.emit('state', store.getState().toJS())
	);
	
	io.on('connection', (socket) => {
		socket.emit('state', store.getState().toJS());
		socket.on('action', () => {
			console.log(args);
			store.dispatch.bind(store)

		});
		console.log('someone has connected');
	});
}