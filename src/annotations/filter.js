import {Module} from '../module/module';
import annotate from '../util/annotate';

const type = 'filter';

export const Filter = t => {
	annotate(t, '$provider', { name: t.name, type: type });
};


Module.registerProvider(type, (provider, module) => {
	let create = provider.create || function(...params){
		return new provider(...params);
	};

	function filter(...params){
		return create(...params);
	}
	
	module.filter(provider.$provider.name, filter);
});