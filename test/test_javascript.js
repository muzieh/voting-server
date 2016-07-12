import {expect} from 'chai';

describe('Array', () => {
	describe('reduce', () => {


		it('sum int array with reduce', () => {
			const arr = [1,2,3,4,5];
			var result = arr.reduce((prev, curr) => {return prev + curr} , 0);
		});

	});
});



