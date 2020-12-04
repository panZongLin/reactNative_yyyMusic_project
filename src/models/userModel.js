import {
    submitLoginQuest,
    submitLoginOutQuest
} from '@/services/userService';

export default {
	namespace: 'userModel',
	state: {		

	},
	effects: {
		*submitLogin({payload}, { put, call, select }) {
			const result = yield call(submitLoginQuest, payload);
            //console.log('submitLogin result', result)
            if(result.code===200) {
                global.storage.save({
                    key: 'userInfo', 
                    data: {...result},		  					
                    expires: null,  
                })
                global.navigation.replace('Main');
                global.navigation.closeDrawer();
            }           
        },
        *submitLoginOut({payload}, { put, call, select }) {
            const result = yield call(submitLoginOutQuest, payload);
            //console.log('submitLoginOut result', result)
            if(result.code===200) {
                global.storage.remove({key: 'userInfo'});
                global.navigation.closeDrawer();
            }           
        },
	},
	reducers: {
		'updateState'(state, {payload}) {
			return {...state, ...payload}
		},
	}
};
