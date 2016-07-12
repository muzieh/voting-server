
import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore() {
	const store = createStore(reducer);
	return store;
}