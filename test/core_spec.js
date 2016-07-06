import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

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
			const state = fromJS({entries: ['Trainspotting', '28 days later', 'Sunshine']})
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({ pair: List.of('Trainspotting', '28 days later')}),
				entries: List.of('Sunshine')
			}));
		});
	});

	describe('vote', () => {

	});
});