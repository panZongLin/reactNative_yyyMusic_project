import React from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    Text,
	StyleSheet,
	Image  
} from 'react-native';
import Swiper from 'react-native-swiper';
import {uw, uh, us, width} from '@/utils/fitConfig';



const SwiperBanner = (props)=> {
    const {
        bannerList,
        bannerItemClick,
    } = props;

    if(bannerList.length !==0) {
        return (
            <Swiper style={{height: uh*130}} autoplay autoplayTimeout={5}>
                {bannerList.map((item, idx)=> {
                    return ( 
                        <View key={item.encodeId} style={staticStyles.container}>
                            <Image                            
                                style={staticStyles.imageBackground}
                                source={{uri: item.imageUrl}}
                            />
                        </View>                            
                    )
                })}
            </Swiper>
        )
    }	
    return <View></View>
}

SwiperBanner.defaultProps = {
    bannerList: [],
    bannerItemClick: ()=> {},
}

SwiperBanner.propTypes = ({
    bannerList: PropTypes.array,
    bannerItemClick: PropTypes.func,
})

const staticStyles = StyleSheet.create({
    container: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackground: {
        width: uw*330,
        height: uh*120,
        marginTop: uh*5,
        borderRadius: uh*10
    }
})

export default React.memo(SwiperBanner);