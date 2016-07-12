import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer'


describe('reducer', () => {

	it('handles SET_ENTRIES', () => {
		const initialState = Map() ;
		const action = {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']};
		const nextState = reducer(initialState, action);
		expect(nextState).to.equals(fromJS({entries: ['Trainspotting', '28 Days Later']}));
	});

	it('handles NEXT', () => {


	});

});