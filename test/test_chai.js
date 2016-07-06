import {expect} from 'chai';

describe('test on chai', () => {

	describe('equal', () => {

		it('eqaul', () => {
			expect(1).to.equal(1);
		});

		it('is string', () => {
			expect('abc').to.be.a('string')
		});

	});

	describe('arrays', () => {

		it('length', () => {
			let a = ['a', 'b'];
			expect(a).to.have.length(2);
		});
	});
});