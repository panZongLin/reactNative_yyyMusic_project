import React from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    Text,
	StyleSheet,
	Image  
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {uw, uh, us, width} from '@/utils/fitConfig';



const CarouselBanner = (props)=> {
    const {
        bannerList,
        bannerItemClick,
    } = props;

    const renderCarouselItem = ({item, idx})=> {
        return (
            <View key={item.encodeId} style={staticStyles.container}>
                <Image                            
                    style={staticStyles.imageBackground}
                    source={{uri: item.imageUrl}}
                />
            </View>
        )
    }

    if(bannerList.length !==0) {
        return (
            <Carousel
                data={bannerList}
                sliderWidth={width}
                sliderHeight={uh*160}
                itemWidth={uw*300}
                sliderHeight={uh*130}
                renderItem={renderCarouselItem} 
                autoplay
                autoplayDelay={0}
                autoplayInterval={5000}    
                loop          
            />
        )
    }
    return <View></View>	
}

CarouselBanner.defaultProps = {
    bannerList: [],
    bannerItemClick: ()=> {},
}

CarouselBanner.propTypes = ({
    bannerList: PropTypes.array,
    bannerItemClick: PropTypes.func,
})

const staticStyles = StyleSheet.create({
    container: {
        width: uw*300,
        height: uh*130,
    },
    imageBackground: {
        width: uw*300,
        height: uh*130,
        borderRadius: uh*10
    }
})

export default React.memo(CarouselBanner);