import React, {useState} from 'react';
import { 
} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '@/screens/discoverDrawer';
import Discover from './discover';
import {uw, uh, us} from '@/utils/fitConfig';


const Drawer = createDrawerNavigator();
const DrawerRoot = (props)=> {

	return (
		<Drawer.Navigator 
			edgeWidth={uw*100}
            drawerPosition="left" 
            drawerContent={(props)=> <DrawerContent {...props} />} 
            drawerStyle={{width: uw*280}}
        >
			<Drawer.Screen name="DiscoverScreen" component={Discover} />
		</Drawer.Navigator>		
	)
}

export default DrawerRoot;
