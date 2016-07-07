import {List, Map} from 'immutable';

export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}

export function next(state) {
	const entries = state.get('entries');
	var vote = state.get('vote');

	return state.merge({
		vote: Map({pair: entries.take(2)}),
		entries: entries.skip(2).concat(getWinner(vote))
	});
}

export function vote(state, entry) {
	return state.updateIn(['vote', 'tally', entry], 0, tally => tally + 1);
}

function getWinner(vote) {
	if(!vote) return [];
	
	
}
