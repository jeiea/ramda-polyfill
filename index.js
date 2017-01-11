/**
 * ramda-polyfill.js
 * Copyright 2017 jeiea ISC
 */
'use strict';
import R from 'ramda';
export default R;
export { ramdaPolyfill, polyfillSpecific };

function defineProperty(name, val) {
  Object.defineProperty(Object.prototype, name + 'R', {
    configurable: true,
    enumerable: false,
    get: val,
  });
}

function polyfillSpecific(name, enable) {
  if (R[name] === undefined) throw `Name not found in ramda: ${name}`;
  if (R[name].length === undefined) return;
  if (enable === undefined) {
    enable = !(name + 'R' in Object.prototype);
  }
  if (!enable) {
    delete Object.prototype[name + 'R'];
    return;
  }
  let len = /^(reduceBy|reduceWhile)$/.test(name) ? 4 : R[name].length;
  let fn = len <= 1 ? function() {
    return R[name](this);
  } : function() {
    return R.curryN(Math.max(0, len - 1), R.partialRight(R[name], [this]));
  };
  if (/^(compose.?|pipe.?|call)$/.test(name)) fn = function() {
    return R.curryN(0, R.partialRight(R[name], [this]));
  };
  defineProperty(name, fn);
}

function ramdaPolyfill(enable) {
  Object.keys(R).forEach(name => polyfillSpecific(name, enable));
  defineProperty('ramdaPolyfill', () => ramdaPolyfill);
  defineProperty('polyfillSpecific', () => polyfillSpecific);
  defineProperty('_', () => R);
}

ramdaPolyfill();
