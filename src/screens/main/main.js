import React from 'react';
import {connect} from 'react-redux';
import { 
    View,
	Text, 
	Image,
	StyleSheet,
	TouchableOpacity   
} from 'react-native';
//yarn add @react-native-community/viewpager@4.0.0
//yarn add @react-native-scrollable-tab-view@1.0.0
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Discover from '@/screens/discover';
import {uw, uh, us} from '@/utils/fitConfig';


function OtherScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text onPress={()=> {throw new Error('抛出一个错误！')}}>OtherScreen!</Text>
		</View>
	);
}

const TabBar = (props)=> {
	const {tabs, activeTab, goToPage} = props;
	const Icons = [
		{default: require('@/assets/tabBar/tab1.png'), active: require('@/assets/tabBar/tab1Active.png')},
		{default: require('@/assets/tabBar/tab2.png'), active: require('@/assets/tabBar/tab2Active.png')},
		{default: require('@/assets/tabBar/tab3.png'), active: require('@/assets/tabBar/tab3Active.png')},
		{default: require('@/assets/tabBar/tab4.png'), active: require('@/assets/tabBar/tab4Active.png')},
		{default: require('@/assets/tabBar/tab5.png'), active: require('@/assets/tabBar/tab5Active.png')},
	];

	return (
		<View style={staticStyles.tabBarWrap}>
			{tabs && tabs.length !==0 && tabs.map((item, idx)=> {
				return (
					<TouchableOpacity key={item} onPress={()=> goToPage(idx)}>
						<View style={staticStyles.tabBar}>
							<Image 
								style={staticStyles.barIcon}
								source={Icons[idx][activeTab===idx ? 'active' : 'default']}
							/>
							<Text style={{
								marginTop: uh*2, 
								fontSize: us(10),
								color: activeTab===idx ? '#f00' : '#ccc'
							}}>
								{item}
							</Text>
						</View>
					</TouchableOpacity>					
				)
			})}
		</View>
	)
}
const ScrollableTabViewOptions = {
	tabBarPosition: 'bottom',
	renderTabBar: TabBar
}


const Main = ()=> {

	return (
		<ScrollableTabView {...ScrollableTabViewOptions}>
			<View tabLabel={'发现'} style={staticStyles.container}>
				<Discover />
			</View>
			<View tabLabel={'博客'} style={staticStyles.container}>
				{OtherScreen()}
			</View>
			<View tabLabel={'我的'} style={staticStyles.container}>
				{OtherScreen()}
			</View>
			<View tabLabel={'K歌'} style={staticStyles.container}>
				{OtherScreen()}
			</View>
			<View tabLabel={'云村'} style={staticStyles.container}>
				{OtherScreen()}
			</View>
		</ScrollableTabView>		
	)
}


const staticStyles = StyleSheet.create({
    container: {
		flex: 1,
	},
	tabBarWrap: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	tabBar: {
		padding: uh*2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	barIcon: {
		width: uw*28,
		height: uh*28
	}
})

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