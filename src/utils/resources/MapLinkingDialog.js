/**
 * 
 * 外链地图判断
 */
import {View, Text, Linking, ActionSheetIOS, Alert, Platform } from 'react-native';

function openDialog(urls) {
	if (Platform.OS === 'ios') {
		urls = urls.ios;
		return Promise.all(urls.map(element => Linking.canOpenURL(element[1])))
		.then((results) => {
			//console.log('results', results)
			return urls.filter((element, index) => results[index]);
		}).then(choices => {
			// 系统内没有任何地图, 推荐下载一个
			if (choices.length < 1) {
			return ActionSheetIOS.showActionSheetWithOptions({
				options: ['Download GaoDe Map', 'Download BaiDu Map', 'Cancel'],
				cancelButtonIndex: 2,
				title: 'Choose Map',
			}, buttonIndex => {
				if (buttonIndex === 0) {
				Linking.openURL('https://itunes.apple.com/cn/app/gao-tu-zhuan-ye-shou-ji-tu/id461703208?mt=8');
				} else if (buttonIndex === 1) {
				Linking.openURL('https://itunes.apple.com/cn/app/bai-du-tu-shou-ji-tu-lu-xian/id452186370?mt=8');
				}
			});
			}

			return ActionSheetIOS.showActionSheetWithOptions({
			options: [...(choices.map(element => element[0])), 'Cancel'],
			cancelButtonIndex: choices.length,
			title: 'Choose Map',
			}, buttonIndex => {
			if (buttonIndex < choices.length) {
				Linking.openURL(choices[buttonIndex][1]);
			}
			});
		});
	} else if (Platform.OS === 'android') {
		urls = urls.android;
		return Promise.all(urls.map(element => Linking.canOpenURL(element[1])))
		.then((results) => {
			return urls.filter((element, index) => results[index]).map(url => ({
					text: url[0],
					onPress: () => {
						Linking.openURL(url[1]);
					},
			}));
		}).then(choices => {
			// 系统内没有任何地图, 推荐下载一个
			if (choices.length < 1) {
			return Alert.alert('Choose Map', "You don't have a map yet.", [
				{ text: 'Download GaoDe Map', onPress: () => Linking.openURL('http://mobile.amap.com') },
				{ text: 'Download BaiDu Map', onPress: () => Linking.openURL('http://map.baidu.com') },
				{ text: 'Cancel' }
			]);
			}

			return Alert.alert('Choose Map', 'Select a map to open it.', [...choices, { text: 'Cancel' }]);
		});
	}
}

export default {
	options: { appName: 'MapLinking' },

	setOptions(opts) {
		this.options = { ...this.options, ...opts };
	},

	/**
	 * 在地图上标注指定位置
	 *
	 * @param location 位置, {lat:40, lng: 118, type: 'gcj02'}
	 * @param title    标题
	 * @param content  内容
	 */
	markLocation(location, title, content) {
		return openDialog({
		android: [
			[
			'GaoDe Map',
			`androidamap://viewMap?sourceApplication=${this.options.appName}&poiname=${title}&lat=${location.lat}&lon=${location.lng}&dev=${location.type === 'gcj02' ? '0' : '1'}`,
			],
			[
			'BaiDu Map',
			`bdapp://map/marker?location=${location.lat},${location.lng}&coord_type=${location.type === 'gcj02' ? 'gcj02' : 'wgs84'}&title=${title}&content=${content}&src=${this.options.appName}`,
			]
		],
		ios: [
			[
			'GaoDe Map',
			`iosamap://viewMap?sourceApplication=${this.options.appName}&poiname=${title}&lat=${location.lat}&lon=${location.lng}&dev=${location.type === 'gcj02' ? '0' : '1'}`,
			],
			[
			'BaiDu Map',
			`baidumap://map/marker?location=${location.lat},${location.lng}&coord_type=${location.type === 'gcj02' ? 'gcj02' : 'wgs84'}&title=${title}&content=${content}&src=${this.options.appName}`,
			],
			[
			'Apple Map',
			`http://maps.apple.com/?ll=${location.lat},${location.lng}&q=${title}`,
			],
		],
		});
	},

	/**
	 * 规划线路
	 *
	 * @param srcLocation  起始位置: {lat:40, lng: 118, title: '起点'}
	 * @param distLocation 目的位置: {lat:40, lng: 118, type: 'gcj02', title: '终点'}
	 * @param mode         交通方式: drive - 驾车, bus - 公交, walk - 步行
	 */
	planRoute(srcLocation, distLocation, mode) {
		return openDialog({
		android: [
			// [
			// 'Google Maps',
			// `https://www.google.com/maps/dir/?api=1&origin=${srcLocation.lat},${srcLocation.lng}&destination=${distLocation.lat},${distLocation.lng}&travelmode=${mode === 'drive' ? 'driving' : (mode === 'bus' ? 'transit' : 'walking')}`,
			// ],
			[
			'GaoDe Maps',
			`androidamap://route?sourceApplication=${this.options.appName}&slat=${srcLocation && srcLocation.lat}&slon=${srcLocation && srcLocation.lng}&sname=${srcLocation && srcLocation.title}&dlat=${distLocation.lat}&dlon=${distLocation.lng}&dname=${distLocation.title}&dev=${distLocation.type === 'gcj02' ? '0' : '1'}&m=0&t=${mode === 'drive' ? '2' : (mode === 'bus' ? '1' : '4')}`,
			],
			[
			'BaiDu Maps',
			`bdapp://map/direction?origin=${srcLocation ? (srcLocation.lat + ',' + srcLocation.lng) : ''}&destination=${distLocation.lat},${distLocation.lng}&mode=${mode === 'drive' ? 'driving' : (mode === 'bus' ? 'transit' : 'walking')}&coord_type=${distLocation.type === 'gcj02' ? 'gcj02' : 'wgs84'}&src=${this.options.appName}`,
			]
		],
		ios: [
			[
			'GaoDe Maps',
			`iosamap://path?sourceApplication=${this.options.appName}&slat=${srcLocation && srcLocation.lat}&slon=${srcLocation && srcLocation.lng}&sname=${srcLocation && srcLocation.title}&dlat=${distLocation.lat}&dlon=${distLocation.lng}&dname=${distLocation.title}&dev=${distLocation.type === 'gcj02' ? '0' : '1'}&m=0&t=${mode === 'drive' ? '2' : (mode === 'bus' ? '1' : '4')}`,
			],
			[
			'BaiDu Maps',
			`baidumap://map/direction?origin=${srcLocation ? (srcLocation.lat + ',' + srcLocation.lng) : ''}&destination=${distLocation.lat},${distLocation.lng}&mode=${mode === 'drive' ? 'driving' : (mode === 'bus' ? 'transit' : 'walking')}&coord_type=${distLocation.type === 'gcj02' ? 'gcj02' : 'wgs84'}&src=${this.options.appName}`,
			],
			[
			'Apple Maps',
			`http://maps.apple.com/?ll=${distLocation.lat},${distLocation.lng}&q=${distLocation.title}&dirflg=${mode === 'drive' ? 'd' : (mode === 'bus' ? 'r' : 'w')}`,
			],
			// [
			// 'Google Maps',
			// `comgooglemaps://?saddr=${srcLocation ? (srcLocation.lat + ',' + srcLocation.lng) : ''}&daddr=${distLocation.lat},${distLocation.lng}&directionsmode=${mode === 'drive' ? 'driving' : (mode === 'bus' ? 'transit' : 'walking')},`
			// ]
		],
		});
	},

	/**
	 * 启动导航
	 *
	 * @param distLocation 目的位置: {lat:40, lng: 118, type: 'gcj02', title: '终点'}
	 */
	navigate(distLocation) {
		return openDialog({
		android: [
			[
			'GaoDe Maps',
			`androidamap://navi?sourceApplication=${this.options.appName}&poiname=${distLocation.title}&lat=${distLocation.lat}&lon=${distLocation.lng}&dev=${distLocation.type === 'gcj02' ? '0' : '1'}`,
			],
			[
			'BaiDu Maps',
			`bdapp://map/direction?origin=&destination=${distLocation.lat},${distLocation.lng}&mode=driving&coord_type=${distLocation.type === 'gcj02' ? 'gcj02' : 'wgs84'}&src=${this.options.appName}`,
			]
		],
		ios: [
			[
			'GaoDe Maps',
			`iosamap://navi?sourceApplication=${this.options.appName}&poiname=${distLocation.title}&lat=${distLocation.lat}&lon=${distLocation.lng}&dev=${distLocation.type === 'gcj02' ? '0' : '1'}`,
			],
			[
			'BaiDu Maps',
			`baidumap://map/direction?origin=&destination=${distLocation.lat},${distLocation.lng}&mode=driving&coord_type=${distLocation.type === 'gcj02' ? 'gcj02' : 'wgs84'}&src=${this.options.appName}`,
			],
			[
			'Apple Maps',
			`http://maps.apple.com/?ll=${distLocation.lat + ',' + distLocation.lng}&q=${distLocation.title}&dirflg=d`,
			],
		],
		});
	},
};