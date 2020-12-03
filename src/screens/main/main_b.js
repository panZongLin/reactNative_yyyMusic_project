import React from 'react';
import {connect} from 'react-redux';
import { Text, View } from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';


function DrawerScreen1() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>DrawerScreen1!</Text>
		</View>
	);
}
function DrawerScreen2() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>DrawerScreen2!</Text>
		</View>
	);
}

//Drawer.Navigator
const Drawer = createDrawerNavigator();
function HomeScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text onPress={()=> {throw new Error('抛出一个错误！')}}>Home!</Text>
		</View>
	);
}
function SettingsScreen() {
	return (
		<Drawer.Navigator drawerPosition="right">
			<Drawer.Screen name="DrawerScreen1" component={DrawerScreen1} />
			<Drawer.Screen name="DrawerScreen2" component={DrawerScreen2} />
		</Drawer.Navigator>
	);
}

//Tab.Navigator
const Tab = createBottomTabNavigator();
const defaultNavigationOptions = ({ route }) => ({
	tabBarIcon: ({focused, color, size}) => {
		let iconName;
		if(route.name === 'Home') {
			iconName = focused ? 'pinwheel' : 'pinwheel-outline';
		}else {
			iconName = focused ? 'cards' : 'cards-outline';
		}

		return <MCIcons name={iconName} size={size} color={color} />;
	},
})


class Main extends React.Component {

	render() {
		const {navigation, route, main, dispatchUpdateState} = this.props;

		return(
			<Tab.Navigator
				screenOptions={defaultNavigationOptions}
				tabBarOptions={{
					activeTintColor: 'tomato',
					inactiveTintColor: 'gray',
				}}
			>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
			
		)
	}
}


function mapStateToProps(state) {
    return {
        main: state.main,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchUpdateState: (params) => dispatch({ type: 'main/updateState', payload: params}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);