import {setEntries} from './core';
import {Map} from 'immutable';

export default function reducer(state, action) {
	if(!state) return Map();
	switch(action.type) {
		case 'SET_ENTRIES':
			return setEntries(state, action.entries);
			break;
		default:
			return state;

	}
}