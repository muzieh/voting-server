import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });

  });

   describe('A List', () => {

		function addMovie(currentState, movie) {
			return currentState.push(movie);
		}

		it('is immutable', () => {
			let state = List.of('Trainspotting', '28 days later');
			let nextState = addMovie(state, 'Sunshine');

			expect(nextState).to.equal(List.of('Trainspotting', '28 days later', 'Sunshine'));
			expect(state).to.equal(List.of('Trainspotting', '28 days later'));

		});	
 	});

	describe('a Tree', () => {

		function addMovie(currentState, movie) {
			return currentState.update('movies', movies => movies.push(movie));
		}

		it('is immutable', () => {
			let state = Map({
				movies: List.of('Trainspotting', '28 days later')
			});

			let newState = addMovie(state, 'Sunshine');

			expect(newState).to.equal(Map({
				movies: List.of('Trainspotting', '28 days later', 'Sunshine')
			}));

			expect(state).to.equal(Map({
				movies: List.of('Trainspotting', '28 days later')
			}));


		});

	});

	describe('build immutable from js', () => {
		it('simple List', () => {
			const immutableList = fromJS([1,2,3,4]);
			expect(immutableList).to.equal(List.of(1,2,3,4));
		});

		it('simple Map', () => {
			const immutableMap = fromJS({key: 32});
			expect(immutableMap).to.equal(Map({key: 32}));
		});

		it('nested List and Map', () => {
			const immutableTree = fromJS({key: [1,2,4]});
			expect(immutableTree).to.equal(Map({
				key: List.of(1,2,4)
			}))
		});

	});


});