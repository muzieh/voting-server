import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

store.subscribe(
	() => console.log(store.getState()) 
);
store.dispatch({
	type: 'SET_ENTRIES',
	entries: require('./entries.json')
});

store.dispatch({type: 'NEXT'});

