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
	});

	describe('vote', () => {

		it('creates a tally for the voted entry', () => {
			const state = fromJS({
				vote: {
						pair: ['Trainspotting', '28 days later']
				},
				entries: List()});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later'),
					tally: Map({
						'Trainspotting': 1
					})
				}),
				entries: List()
			}));
		});

		it('adds to existing tally for the voted entry', () => {
			const state = fromJS({
				vote: {
						pair: ['Trainspotting', '28 days later'],
						tally: {
							'Trainspotting': 4,
							'28 days later': 3
						}
				},
				entries: List()});
			const nextState = vote(state, '28 days later');
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 days later'),
					tally: Map({
						'Trainspotting': 4,
						'28 days later': 4
					})
				}),
				entries: List()
			}));
			
		});
	});
});