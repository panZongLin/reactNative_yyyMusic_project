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



const leftComponent = (props)=> {  
    if(props.nickname !=='') {
        return (
            <Avatar
                rounded
                source={{uri: props.avatarUrl}}     
            />
        )
    }
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

const centerComponent = (nickname)=> {
    return (
        <Text style={staticStyles.denglu}>
            {nickname !=='' ? nickname : '立即登录 >'}           
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
        avatarUrl,
        nickname,
        goToLoginPage
    } = props;

	return (
        <TouchableOpacity activeOpacity={1} onPress={nickname ==='' ? goToLoginPage : ()=>{}}>
            <Header
                backgroundColor={'#fff'}
                leftComponent={()=> leftComponent({avatarUrl, nickname})}
                leftContainerStyle={{alignItems: 'center'}}
                centerComponent={()=> centerComponent(nickname)}
                centerContainerStyle={{alignItems: 'flex-start'}}
                rightComponent={()=> rightComponent()}
            />
        </TouchableOpacity>		
	)
}

UserTitle.defaultProps = {
    avatarUrl: '',
    nickname: '',
    goToLoginPage: ()=>{} 
}

UserTitle.propTypes = ({
    avatarUrl: PropTypes.string,
    nickname: PropTypes.string,
    goToLoginPage: PropTypes.func
})

const staticStyles = StyleSheet.create({
    denglu: {
        color: '#000'
    }
})

export default React.memo(UserTitle);