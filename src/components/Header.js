import React from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    Text, 
	StyleSheet,
	TouchableOpacity   
} from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements';
import {uw, uh, us} from '@/utils/fitConfig';



const leftComponent = (props)=> {
    return (
        <TouchableOpacity activeOpacity={1} onPress={props.leftMenuPress}>
            <Icon name='menu'color='#000' size={28} />
            {props.msgNumber !==0 &&
                <Badge 
                    status="error"
                    value={props.msgNumber}                      
                    containerStyle={{position: 'absolute', top: -2, right: -4 }}
                />
            }
        </TouchableOpacity>
    )
}

const rightComponent = (props)=> {
    return (
        <View>
            <Icon name='rowing' color='#000' size={28} />         
        </View>
    )
}

const HeaderComponent = (props)=> {
    const {
        msgNumber,
        leftMenuPress,
        backgroundColor,
        centerComponent
    } = props;

	return (
		<Header
            backgroundColor={backgroundColor}
            leftComponent={()=> leftComponent({msgNumber, leftMenuPress})}
            centerComponent={centerComponent}
            rightComponent={()=> rightComponent()}
        />
	)
}

HeaderComponent.defaultProps = {
    msgNumber: 0,
    leftMenuPress: ()=> {},
    rightMenuPress: ()=> {},
    backgroundColor: '#f2f2f2',
    centerComponent: <Text style={{fontSize: us(15)}}>默认标题</Text>
}

HeaderComponent.propTypes = ({
    msgNumber: PropTypes.number,
    leftMenuPress: PropTypes.func,
    rightMenuPress: PropTypes.func,
    backgroundColor: PropTypes.string,
    centerComponent: PropTypes.node
})

const staticStyles = StyleSheet.create({
    
})

export default React.memo(HeaderComponent);