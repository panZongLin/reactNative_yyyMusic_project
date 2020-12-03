import React from 'react';
import {connect} from 'react-redux';
import { 
    View,
	Text, 
	StyleSheet,
	TouchableOpacity   
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '@/screens/discoverDrawer';
import {uw, uh, us} from '@/utils/fitConfig';


const Drawer = createDrawerNavigator();

const Discover = (props)=> {
	return (
		<Drawer.Navigator 
			edgeWidth={uw*150}
            drawerPosition="left" 
            drawerContent={(props)=> <DrawerContent {...props} />} 
            drawerStyle={{width: uw*280}}
        >
			<Drawer.Screen name="DiscoverScreen" component={DiscoverScreen} />
		</Drawer.Navigator>		
	)
}

const DiscoverScreen = (props)=> {
	//console.log('DiscoverScreen', props);
	return (
		<View style={staticStyles.container}>
			<Text>DiscoverScreen</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(Discover);