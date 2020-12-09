import {
    submitLoginQuest,
    submitLoginOutQuest
} from '@/services/userService';
import Tools from '@/utils/toolFunction';

export default {
	namespace: 'userModel',
	state: {		

	},
	effects: {
		*submitLogin({payload}, { put, call, select }) {
			const result = yield call(submitLoginQuest, payload);

            if(result && result.code===200) {
                global.storage.save({
                    key: 'userInfo', 
                    data: {...result},		  					
                    expires: null,  
                })
                global.navigation.replace('Main');
                global.navigation.closeDrawer();
            }else {
                Tools.showMessageToast(result.message);
            }           
        },
        *submitLoginOut({payload}, { put, call, select }) {
            const result = yield call(submitLoginOutQuest, payload);

            if(result && result.code===200) {
                global.storage.remove({key: 'userInfo'});
                global.navigation.closeDrawer();
                global.navigation.replace('LoginPage');
            }           
        },
	},
	reducers: {
		'updateState'(state, {payload}) {
			return {...state, ...payload}
		},
	}
};
