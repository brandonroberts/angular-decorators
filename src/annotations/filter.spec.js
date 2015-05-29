import {Filter} from './filter';
import {Module} from '../module/module';
import {sinon} from '../util/tests';

describe('@Filter Annotation', function(){
	it('should decorate a class with $provider meta information', function(){
		@Filter
		class TestFilter{ }

		TestFilter.should.have.property('$provider');
		TestFilter.$provider.should.have.property('name', 'TestFilter');
		TestFilter.$provider.should.have.property('type', 'filter');
	});

	describe('Parser', function(){
		let parser, module;

		beforeEach(function(){
			module = { filter : sinon.spy() };
			parser = Module.getParser('filter');
		});

		it('should register itself with Module', function(){
			parser.should.be.defined;
		});

		it('should use the static create method on a class as the factory function', function(){
			let called = false;

			@Filter
			class ExampleFilter{
				static create(){
					called = true;
				}
			}

			parser(ExampleFilter, module);
			let filterProvider = module.filter.args[0][1];

			filterProvider();

			called.should.be.true;
		});

		it('should generate a filter function for a class', function(){
			@Filter
			class ExampleFilter{
				constructor(){
					return function(test) {
					  return test + 'filtered';
					};
				}
			}

			parser(ExampleFilter, module);

			let filterName = module.filter.args[0][0];
			let filterProvider = module.filter.args[0][1];
			filterName.should.equal('ExampleFilter');
			filterProvider.should.be.defined;

			let filter = filterProvider();
			filter.should.be.defined;

			filter('test').should.eql('testfiltered');
		});
	});
});