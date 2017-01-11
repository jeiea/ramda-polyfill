(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ramda"));
	else if(typeof define === 'function' && define.amd)
		define(["ramda"], factory);
	else if(typeof exports === 'object')
		exports["ramda-polyfill"] = factory(require("ramda"));
	else
		root["ramda-polyfill"] = factory(root["ramda"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * ramda-polyfill.js
 * Copyright 2017 jeiea ISC
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyfillSpecific = exports.ramdaPolyfill = undefined;

var _ramda = __webpack_require__(0);

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ramda2.default;
exports.ramdaPolyfill = ramdaPolyfill;
exports.polyfillSpecific = polyfillSpecific;


function defineProperty(name, val) {
  Object.defineProperty(Object.prototype, name + 'R', {
    configurable: true,
    enumerable: false,
    get: val
  });
}

function polyfillSpecific(name, enable) {
  if (_ramda2.default[name].length === undefined) return;
  if (enable === undefined) {
    enable = !(name + 'R' in Object.prototype);
  }
  if (!enable) {
    delete Object.prototype[name + 'R'];
    return;
  }
  var len = /^(reduceBy|reduceWhile)$/.test(name) ? 4 : _ramda2.default[name].length;
  var fn = len <= 1 ? function () {
    return _ramda2.default[name](this);
  } : function () {
    return _ramda2.default.curryN(Math.max(0, len - 1), _ramda2.default.partialRight(_ramda2.default[name], [this]));
  };
  if (/^(compose.?|pipe.?|call)$/.test(name)) fn = function fn() {
    return _ramda2.default.curryN(0, _ramda2.default.partialRight(_ramda2.default[name], [this]));
  };
  defineProperty(name, fn);
}

function ramdaPolyfill(enable) {
  Object.keys(_ramda2.default).forEach(function (name) {
    return polyfillSpecific(name, enable);
  });
  defineProperty('ramdaPolyfill', function () {
    return ramdaPolyfill;
  });
  defineProperty('polyfillSpecific', function () {
    return polyfillSpecific;
  });
  defineProperty('_', function () {
    return _ramda2.default;
  });
}

ramdaPolyfill();

/***/ }
/******/ ]);
});
//# sourceMappingURL=ramda-polyfill.js.map