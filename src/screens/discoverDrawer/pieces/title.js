import React from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    Text, 
	StyleSheet,
	TouchableOpacity   
} from 'react-native';
import {Header, Icon, Avatar} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {uw, uh, us} from '@/utils/fitConfig';
import { color } from 'react-native-reanimated';



const leftComponent = (props)=> {
    return (
        <Avatar
            rounded
            icon={{
                name: 'user', 
                type: 'font-awesome', 
                color: '#fbc5c5'
            }}
            containerStyle={{
                backgroundColor: '#e2e2e2'
            }}           
        />
    )
}

const centerComponent = ()=> {
    return (
        <Text style={staticStyles.denglu}>
            立即登录 {'>'}
        </Text>
    )
}

const rightComponent = (props)=> {
    return (
        <View>
            <AntDesign name={'flag'} size={24} color={'#000'} />         
        </View>
    )
}

const UserTitle = (props)=> {
    const {
        goToLoginPage
    } = props;

	return (
        <TouchableOpacity activeOpacity={1} onPress={goToLoginPage}>
            <Header
                backgroundColor={'#fff'}
                leftComponent={()=> leftComponent()}
                leftContainerStyle={{alignItems: 'center'}}
                centerComponent={()=> centerComponent()}
                centerContainerStyle={{alignItems: 'flex-start'}}
                rightComponent={()=> rightComponent()}
            />
        </TouchableOpacity>		
	)
}

UserTitle.defaultProps = {
    goToLoginPage: ()=>{} 
}

UserTitle.propTypes = ({
    goToLoginPage: PropTypes.func
})

const staticStyles = StyleSheet.create({
    denglu: {
        fontSize: us(14),
        color: '#000'
    }
})

export default React.memo(UserTitle);