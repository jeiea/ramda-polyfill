import assert from 'assert';
import R from '../index';

describe('ramda-polyfill test', () => {

  describe('Test facilities', () => {
    it('Test R.equals', () => {
      assert(R.equals([1, 2, 3], [1, 2, 3]));
    });
    it('Test R.equals polyfill', () => {
      assert([1, 2, 3].equalsR([1, 2, 3]));
    });
  })

  describe('Unary function', () => {
    it('Test R.F', () => {
      assert.equal([].FR, false);
    });
    it('Test R.tail', () => {
      assert([2, 3].equalsR([1, 2, 3].tailR));
    });
    it('Test R.tail chaining', () => {
      assert([1, 2, 3].tailR.tailR.equalsR([3]));
    });
  });

  describe('Practical examples', () => {
    it('Test reduce, flip', () => {
      assert([1, 2, -3].reduceR.flipR([], (acc, e) => acc * 10 + e)), 117;
    });
    it('Test zipWith, takeWhile (common prefix)', () => {
      let u1 = 'https://webpack.github.io/';
      let u2 = 'https://webpack.js.org/';
      let cl = u2.zipWithR(R.equals, u1).takeWhileR(e => e).length;
      assert.equal(u1.slice(0, cl), 'https://webpack.');
    });
  });
});
