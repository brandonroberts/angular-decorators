'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _moduleModule = require('../module/module');

var _utilAnnotate = require('../util/annotate');

var _utilAnnotate2 = _interopRequireDefault(_utilAnnotate);

var type = 'filter';

var Filter = function Filter(t) {
	(0, _utilAnnotate2['default'])(t, '$provider', { name: t.name, type: type });
};

exports.Filter = Filter;
_moduleModule.Module.registerProvider(type, function (provider, module) {
	var create = provider.create || function () {
		for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
			params[_key] = arguments[_key];
		}

		return new (_bind.apply(provider, [null].concat(params)))();
	};

	function filter() {
		for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			params[_key2] = arguments[_key2];
		}

		return create.apply(undefined, params);
	}

	module.filter(provider.$provider.name, filter);
});