import {List, Map} from 'immutable';

export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}

export function next(state) {
	const vote = state.get('vote');
	const entries = state.get('entries').concat(getWinner(vote));
	if( entries.size === 1) {
		return state.remove('vote').remove('entries').set('winner', entries.first());
		/*
		return Map({
			winner: entries.first(),
			entries: List()
		});
		*/
	}
	return state.merge({
		vote: Map({pair: entries.take(2)}),
		entries: entries.skip(2)
	});
}

export function vote(state, entry) {
	return state.updateIn(['vote', 'tally', entry], 0, tally => tally + 1);
}

function getWinner(vote) {
	if(!vote) return [];
	const [a, b] = vote.get('pair');

	const aVote = vote.getIn(['tally', a], 0)
	const bVote = vote.getIn(['tally', b], 0)
	if(aVote > bVote) return a;
	else if(aVote < bVote) return b;
	else return [a,b]
	
}
