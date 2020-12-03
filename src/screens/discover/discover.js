import React, {useState} from 'react';
import {connect} from 'react-redux';
import { 
    View,
	Text, 
	StyleSheet,
	ScrollView,
	RefreshControl,
	TouchableOpacity   
} from 'react-native';
import {
	SearchBar
} from 'react-native-elements';
import Header from '@/components/Header';
import {uw, uh, us} from '@/utils/fitConfig';

import SwiperBanner from './components/swiperBanner';


const DiscoverScreen = (props)=> {
	const {
		navigation,
		discoverModel,
		dispatchGetBanner
	} = props;
	console.log('discoverModel', props)
	const [refreshing, setRefreshing] = useState(false);

	const goToSearchPage = ()=> {
		navigation.push('BannerPage');
	}

	const scrollViewRefresh = ()=> {
		setRefreshing(true);
		setTimeout(()=> setRefreshing(false), 1200);

		dispatchGetBanner({type: 0});
	}

	return (
		<View style={staticStyles.container}>
			<Header 
				msgNumber={10}
				leftMenuPress={()=> navigation.openDrawer()} 
				backgroundColor={'#f2f2f2'}
				centerComponent={
					<SearchBar
						placeholder="等什么君"
						style={{fontSize: us(12)}}
						onFocus={goToSearchPage}
						containerStyle={staticStyles.containerStyle}
						inputContainerStyle={staticStyles.inputContainerStyle}
					/>
				}
			/>
			<ScrollView 
				style={staticStyles.scrollView}
				refreshControl={
					<RefreshControl 
						refreshing={refreshing} 
						onRefresh={scrollViewRefresh} 
						colors={['#f00']}
						tintColor={'#f00'}
					/>
				}
			>
				<SwiperBanner 
					bannerList={discoverModel.bannerList}
				/>
			</ScrollView>
		</View>
	)
}

const staticStyles = StyleSheet.create({
    container: {
		flex: 1,
	},
	containerStyle: {
		width: uw*280,
		height: uh*30,
		borderTopWidth: 0,
		borderBottomWidth: 0,
		padding: 0,
		backgroundColor: '#fff',
		borderRadius: uh*20,
		
	},
	inputContainerStyle: {
		width: uw*280,
		height: uh*30,
		borderRadius: uh*20, 		
		backgroundColor: '#fff',
	},
	scrollView: {
		flex: 1,
	}
})

function mapStateToProps(state) {
    return {
        discoverModel: state.discoverModel,
    }
}
function mapDispatchToProps(dispatch) {
    return {
		dispatchGetBanner: (params) => dispatch({ type: 'discoverModel/getBanner', payload: params}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverScreen);