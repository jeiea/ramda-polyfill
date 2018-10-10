import assert from 'assert';
import R, {ramdaPolyfill, polyfillSpecific} from '../index';
/*// for commonjs,
var R = require('../index');
var ramdaPolyfill = R.ramdaPolyfill;
var polyfillSpecific = R.polyfillSpecific;
R = R.default; //*/

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
      console.log('asdf')
      assert([1, 2, 3].reduceR.flipR([], (acc, e) => acc * 10 + e) === 123);
    });
    it('Test zipWith, takeWhile (common prefix)', () => {
      let u1 = 'https://webpack.github.io/';
      let u2 = 'https://webpack.js.org/';
      let cl = u2.zipWithR(R.equals, u1).takeWhileR(e => e).length;
      assert.equal(u1.slice(0, cl), 'https://webpack.');
    });
  });

  describe('Other facilities', () => {
    it('Test self injection', () => {
      assert({}.ramdaPolyfillR !== undefined);
      assert({}.polyfillSpecificR !== undefined);
    });
    it('Toggle all features', () => {
      let a = {};
      ramdaPolyfill(false);
      Object.keys(a).forEach(k => assert(!k.endsWith('R')));
      ramdaPolyfill(); // toggle
      let proto = Object.getPrototypeOf(a)
      let descs = Object.getOwnPropertyDescriptors(proto);
      let getrs = Object.keys(descs);
      let names = Object.keys(R);
      names.forEach(k => assert(getrs.indexOf(k + 'R') !== -1 || k === '__', k));
    });
    it('Toggle some features', () => {
      let obj = {};
      let rel = [];
      let norel = [];

      function toggle() {
        rel.push(obj['sortByR'] === undefined);
        norel.push(obj['addR'] === undefined);
        polyfillSpecific('sortBy');
      }
      for (let i = 0; i < 3; i++) toggle();

      assert(rel[0] !== rel[1] && rel[1] !== rel[2]);
      assert(norel[0] === norel[1] && norel[1] === norel[2]);

      polyfillSpecific('sortBy');
    });
  });

});
