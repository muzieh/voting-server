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
	

	describe('checking type', () => {
		it('5 is number', () => {
			const num = 4;
			expect(num).to.be.a('number');
		});

		it('function a function', () => {
			var f = (a) => { return a; };
			expect(f).to.be.a('function');
		});

		it('date is a function', () => {
			var d = new Date();
			expect(d).to.be.a('date');
		});

		it('null is a null', () => {
			var d = null;
			expect(d).to.be.a('null');
		});

		it('undefined is a undefined', () => {
			expect(undefined).to.be.a('undefined');
		});
	});

});