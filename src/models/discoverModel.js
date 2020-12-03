import {
	getBannerQuest
} from '@/services/discoverService';

export default {
	namespace: 'discoverModel',
	state: {		
		bannerList: []
	},
	effects: {
		*getBanner({payload}, { put, call, select }) {
			const result = yield call(getBannerQuest, payload);
			yield put({
				type: 'updateState',
				payload: {bannerList: result.banners}
			})
        }
	},
	reducers: {
		'updateState'(state, {payload}) {
			return {...state, ...payload}
		},
	}
};
