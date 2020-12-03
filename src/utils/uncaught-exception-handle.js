/**
 * 
 * 应用崩溃提示
 */
import { Alert } from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

function jsExceptionHandler(error, isFatal) {

	if (isFatal) {
		Alert.alert(
			'We are sorry',
			`
				the app something wrong, if it affects your use, please restart
			`,
		);
	}
}

function nativeExceptionHandler(errorString) {

}

export default () => {
	setJSExceptionHandler(jsExceptionHandler, false /* Not allow in dev mode. */);
	setNativeExceptionHandler(nativeExceptionHandler);
};
