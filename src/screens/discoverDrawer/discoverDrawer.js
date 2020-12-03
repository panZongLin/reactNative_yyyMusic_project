import React from 'react';
import {connect} from 'react-redux';
import { 
    View,
    Text, 
	StyleSheet,
	TouchableOpacity   
} from 'react-native';
import {uw, uh, us} from '@/utils/fitConfig';


const DrawerContent = (props)=> {
    //console.log('DrawerContent', props)
	return (
		<View style={staticStyles.container}>
			<Text>DrawerContent</Text>
		</View>
	)
}

const staticStyles = StyleSheet.create({
    container: {
		flex: 1,
	},
})

function mapStateToProps(state) {
    return {
        //main: state.main,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        //dispatchUpdateState: (params) => dispatch({ type: 'main/updateState', payload: params}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);