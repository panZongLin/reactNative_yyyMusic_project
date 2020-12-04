import React from 'react';
import {connect} from 'react-redux';
import { 
    View,
    Text, 
    StyleSheet,
    ScrollView,
	TouchableOpacity   
} from 'react-native';
import {Button} from 'react-native-elements';
import UserTitle from './pieces/title';
import {uw, uh, us} from '@/utils/fitConfig';


const DrawerContent = (props)=> {
    console.log('DrawerContent', props, global)
    const {
        navigation,
        dispatchSubmitLoginOut
    } = props;

    const submitLoginOut = ()=> {
        dispatchSubmitLoginOut();
    }

	return (
		<View style={staticStyles.container}>
            <UserTitle 
                goToLoginPage={()=> navigation.push('LoginPage')}
            />
            <ScrollView 
                style={staticStyles.scrollView}
            >
                <View style={staticStyles.buttonWrap}>
                    <Button
                        title="退出登录/关闭"
                        buttonStyle={staticStyles.buttonStyle}
                        titleStyle={staticStyles.titleStyle}
                        onPress={submitLoginOut}
                    />
                </View>
            </ScrollView>
		</View>
	)
}

const staticStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    buttonWrap: {
        width: uw*300,
        marginTop: uh*20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        width: uw*260, 
        height: uh*40,
        backgroundColor: '#fff',
        borderRadius: uh*10
    },
    titleStyle: {
       fontSize: us(16),
       color: '#f00',     
    }
})

function mapStateToProps(state) {
    return {
        //main: state.main,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchSubmitLoginOut: (params) => dispatch({ type: 'userModel/submitLoginOut', payload: params}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);