
export default {
	namespace: 'main',
	state: {		
		test: 12345
	},
	effects: {
		*someEffects({payload}, { put, call, select }) {
        }
	},
	reducers: {
		'updateState'(state, {payload}) {
			return {...state, ...payload}
		},
	}
};
