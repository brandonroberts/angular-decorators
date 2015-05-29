'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _filter = require('./filter');

var _moduleModule = require('../module/module');

var _utilTests = require('../util/tests');

describe('@Filter Annotation', function () {
	it('should decorate a class with $provider meta information', function () {
		var TestFilter = (function () {
			function TestFilter() {
				_classCallCheck(this, _TestFilter);
			}

			var _TestFilter = TestFilter;
			TestFilter = (0, _filter.Filter)(TestFilter) || TestFilter;
			return TestFilter;
		})();

		TestFilter.should.have.property('$provider');
		TestFilter.$provider.should.have.property('name', 'TestFilter');
		TestFilter.$provider.should.have.property('type', 'filter');
	});

	describe('Parser', function () {
		var parser = undefined,
		    module = undefined;

		beforeEach(function () {
			module = { filter: _utilTests.sinon.spy() };
			parser = _moduleModule.Module.getParser('filter');
		});

		it('should register itself with Module', function () {
			parser.should.be.defined;
		});

		it('should use the static create method on a class as the factory function', function () {
			var called = false;

			var ExampleFilter = (function () {
				function ExampleFilter() {
					_classCallCheck(this, _ExampleFilter);
				}

				var _ExampleFilter = ExampleFilter;

				_createClass(_ExampleFilter, null, [{
					key: 'create',
					value: function create() {
						called = true;
					}
				}]);

				ExampleFilter = (0, _filter.Filter)(ExampleFilter) || ExampleFilter;
				return ExampleFilter;
			})();

			parser(ExampleFilter, module);
			var filterProvider = module.filter.args[0][1];

			filterProvider();

			called.should.be['true'];
		});

		it('should generate a filter function for a class', function () {
			var ExampleFilter = (function () {
				function ExampleFilter() {
					_classCallCheck(this, _ExampleFilter2);

					return function (test) {
						return test + 'filtered';
					};
				}

				var _ExampleFilter2 = ExampleFilter;
				ExampleFilter = (0, _filter.Filter)(ExampleFilter) || ExampleFilter;
				return ExampleFilter;
			})();

			parser(ExampleFilter, module);

			var filterName = module.filter.args[0][0];
			var filterProvider = module.filter.args[0][1];
			filterName.should.equal('ExampleFilter');
			filterProvider.should.be.defined;

			var filter = filterProvider();
			filter.should.be.defined;

			filter('test').should.eql('testfiltered');
		});
	});
});