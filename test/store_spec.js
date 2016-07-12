import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store'; 

describe('store', () => {

	it('is store initialized with proper reducer', () => {
		var store = makeStore();
		expect(store.getState()).to.equal(Map());
	});

	it('can launch action on store', () => {
		var store = makeStore();
		store.dispatch({type:'SET_ENTRIES', entries:['Trainspoting', 'Sunshine']});
		var state = store.getState();
		expect(state).to.equal(fromJS({entries:['Trainspoting', 'Sunshine']}));
	});

});
