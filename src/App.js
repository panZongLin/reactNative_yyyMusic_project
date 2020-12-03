import 'react-native-gesture-handler'; //更好的手势响应
import React from 'react';
import { create } from 'dva-core';
import { Provider } from 'react-redux';
import {
    View, 
    StatusBar, 
    TextInput, 
    UIManager, 
    Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {
    request, 
    requestMultiple, 
    check, 
    checkMultiple, 
    PERMISSIONS
} from 'react-native-permissions';
//<SafeAreaProvider>
//  <SafeAreaView style={{flex: 1}}>
import { 
    SafeAreaProvider, 
    SafeAreaView 
} from 'react-native-safe-area-context'; //使用这个组件包裹的话 StatusBar的沉浸式状态栏会失效

import routerConfig from '@/configs/router'; //路由配置
import modelOption from '@/models/modelOption'; //数据管理

import '@/utils/storage'; //本地储存
import toolFn from '@/utils/toolFunction';  //工具函数
import {uw, uh, us, isIphoneXAndUp} from '@/utils/fitConfig'; //适配文件
import registerUncaughtExceptionHandlers from '@/utils/uncaught-exception-handle';  //逻辑崩溃提示


//DVA实例初始化并导出
const dvaApp = create(); 
modelOption.forEach((obj) => {  
    dvaApp.model(obj);
});
dvaApp.start();      
export const dvaAppStore = dvaApp._store;


//Stack.Navigator  
const Stack = createStackNavigator();
const defaultNavigationOptions = { // Navigator自带标题栏的配置
    headerStyle: {
        backgroundColor: '#fff',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
        fontSize: us(14),
        textAlign: 'center'
    },
}


class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={}
        this.prepareApp();
    }

    UNSAFE_componentWillMount() {
        this.requestMultiple();
    }

    //请求权限(ios未配置)
    async requestMultiple() {
        if(Platform.OS === 'android') { 
            await requestMultiple([
                PERMISSIONS.ANDROID.CAMERA, 
                PERMISSIONS.ANDROID.CALL_PHONE
            ]);  
            checkMultiple([
                PERMISSIONS.ANDROID.CAMERA, 
                PERMISSIONS.ANDROID.CALL_PHONE
            ])
                .then((result) => {
                    //console.log('PERMISSIONS result', result)
                })
                .catch((error) => {
                    //console.log('PERMISSIONS error', error)
                });     
        }else {
            //...
        }
    }

    componentDidMount() {    
        //在这可以作获取广告页的图片等操作之后再关闭启动页      
        //关闭启动页(ios未配置)
        setTimeout(()=>{
            SplashScreen.hide();
        }, 1000) 
    }

    //一些起始配置
    prepareApp() { 
        registerUncaughtExceptionHandlers();        

        // Set some default props to commonly used UI components.
        StatusBar.setBackgroundColor('rgba(0,0,0,0)');
        StatusBar.setTranslucent(true);
        TextInput.defaultProps.padding = 0;

        // https://reactnative.cn/docs/animations#layoutanimation-api
        // 在Android上使用 LayoutAnimation，那么目前还需要在UIManager中启用
        if (toolFn.isAndroid()) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

    } 

    render() {
        return (                                              
            <Provider store={dvaApp._store}> 
                <StatusBar barStyle="dark-content" />                       
                <NavigationContainer>
                    <Stack.Navigator                                
                        initialRouteName="BannerPage"
                        screenOptions={defaultNavigationOptions}                              
                        headerMode="none" //隐藏 Navigator自带标题栏
                    >
                        {routerConfig && routerConfig.map((item, index)=> {
                            return(
                                <Stack.Screen 
                                    key={item.name} 
                                    name={item.name} 
                                    component={item.component} 
                                />
                            )
                        })}
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>          
        );
    }
}

export default App;
