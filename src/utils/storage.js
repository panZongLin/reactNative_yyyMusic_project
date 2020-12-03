/**
 * 
 * 本地存储
 */
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

let storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000 * 3600 * 24,
	enableCache: true,
})

// 全局变量
global.storage = storage;