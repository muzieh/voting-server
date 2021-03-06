import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

	describe('setEntries', () => {

		it('add entries to the state', () => {
			const state = Map();
			const entries = List.of('Trainspotting', '28 days later');
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 days later')
			}));
		});

		it('can be converted from array', () => {
			const state = Map();
			const entries = ['Trainspotting', '28 days later'];
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 days later')
			}));
		});

	});

	describe('next pair', () => {

		it('get next pair', () => {
			const state = fromJS({entries: ['Trainspotting', '28 days later', 'Sunshine']});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later')
				}),
				entries: List.of('Sunshine')
			}));
		});

		it('puts winner of current vote back to entries', () => {

			const state = fromJS({
				vote: {
						pair: ['Trainspotting', '28 days later'],
						tally: {
							'Trainspotting': 4,
							'28 days later': 3
						}
				},
				entries: ['Sunshine', 'Blade Runner']
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Blade Runner')
				}),
				entries: List.of('Trainspotting')
			}));
		});

		it('puts both movies to entries in case of tie vote', () => {

			const state = fromJS({
				vote: {
						pair: ['Trainspotting', '28 days later'],
						tally: {
							'Trainspotting': 4,
							'28 days later': 4
						}
				},
				entries: ['Sunshine', 'Blade Runner']
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Blade Runner')
				}),
				entries: List.of('Trainspotting', '28 days later')
			}));
		});

		it('puts both pair movies back to pair if entries are empty and tie vote', () => {

			const state = fromJS({
				vote: {
						pair: ['Trainspotting', '28 days later'],
						tally: {
							'Trainspotting': 4,
							'28 days later': 4
						}
				},
				entries: []
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later')
				}),
				entries: List()
			}));
		});

		it('mark the winer if only one movie left after voting', () => {

			const state = fromJS({
				vote: {
						pair: ['Trainspotting', '28 days later'],
						tally: {
							'Trainspotting': 4,
							'28 days later': 2
						}
				},
				entries: []
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				winner: 'Trainspotting',
			}));
		});

		it('mark the winer if only one movie in entries', () => {

			const state = fromJS({
				entries: ['Trainspotting']
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				winner: 'Trainspotting',
			}));
		});

	});

	describe('vote', () => {

		it('creates a tally for the voted entry', () => {
			const state = fromJS({
				 pair: ['Trainspotting', '28 days later']
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
				pair: List.of('Trainspotting', '28 days later'),
				tally: Map({
					'Trainspotting': 1
				})
			}));
		});

		it('adds to existing tally for the voted entry', () => {
			const state = fromJS({
				pair: ['Trainspotting', '28 days later'],
				tally: {
					'Trainspotting': 4,
					'28 days later': 3
				}
			});
			const nextState = vote(state, '28 days later');
			expect(nextState).to.equal(fromJS({
				pair: ['Trainspotting', '28 days later'],
				tally: {
					'Trainspotting': 4,
					'28 days later': 4
				}
			}));
			
		});
	});
});