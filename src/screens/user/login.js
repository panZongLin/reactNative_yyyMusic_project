import React, {useState} from 'react';
import {connect} from 'react-redux';
import { 
    View,
    Text, 
    Image,
    StyleSheet,
    StatusBar,
	TouchableOpacity   
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Logo from '@/assets/logo.png';
import {uw, uh, us, width} from '@/utils/fitConfig';


const LoginPage = (props)=> {
    const {
        navigation,
        dispatchSubmitLogin
    } = props;
    const [phone, setPhone] = useState('');
    const [passWord, setPassWord] = useState('');

    const submitLogin = ()=> {
        if(phone==='') {
            navigation.replace('Main');
            global.navigation.closeDrawer(); 
            return;
        }

        dispatchSubmitLogin({
            phone,
            password: passWord
        })
    }

	return (
        <KeyboardAwareScrollView style={{backgroundColor: '#f00'}}>
            <View style={staticStyles.container}>
                <StatusBar barStyle="light-content" />
                <View style={staticStyles.logo}>
                    <Image source={Logo} />               
                </View>  
                <View style={staticStyles.login}>
                    <Input
                        placeholder='phone'
                        keyboardType='number-pad'
                        maxLength={11}
                        leftIcon={
                            <AntDesign name='phone' size={24} color='#f00' />
                        }
                        containerStyle={staticStyles.containerStyle}
                        inputContainerStyle={staticStyles.inputContainerStyle}
                        onChangeText={(v)=> setPhone(v)}
                    />
                    <Input
                        placeholder='password'
                        leftIcon={
                            <AntDesign name='lock' size={24} color='#f00' />
                        }
                        containerStyle={{...staticStyles.containerStyle, marginTop: 0}}
                        inputContainerStyle={staticStyles.inputContainerStyle}
                        onChangeText={(v)=> setPassWord(v)}
                    />
                    <View style={{width: uw*250, alignItems: 'flex-end'}}>
                        <Button
                            title="登录/体验"
                            buttonStyle={staticStyles.buttonStyle}
                            titleStyle={staticStyles.titleStyle}
                            onPress={submitLogin}
                        />
                    </View>               
                </View>         
            </View>
        </KeyboardAwareScrollView>		
	)
}

const staticStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f00'
    },
    logo: {
        width: width,
        height: uh*200,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    login: {
        flex: 1,
        alignItems: 'center'
    },
    containerStyle: {
        width: uw*250,
        height: uh*35,
        borderRadius: uh*20,
        backgroundColor: '#fff',
        marginTop: uh*150, 
        marginBottom: uh*15     
    },
    inputContainerStyle: {     
        height: uh*30,
        marginTop: uh*2,
        borderTopWidth: 0,
		borderBottomWidth: 0,  
    },
    buttonStyle: {
        width: uw*100, 
        height: uh*35,
        marginTop: uh*30,
        backgroundColor: '#fff',
        borderTopRightRadius: uh*20, 
        borderBottomRightRadius: uh*20
    },
    titleStyle: {
       fontSize: us(14),
       color: '#f00' ,
       //letterSpacing: uw*10,      
    }
})

function mapStateToProps(state) {
    return {
        //userModel: state.userModel,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchSubmitLogin: (params) => dispatch({ type: 'userModel/submitLogin', payload: params}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);