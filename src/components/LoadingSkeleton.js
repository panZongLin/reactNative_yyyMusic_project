import React from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    Text, 
	StyleSheet,
} from 'react-native';
import {uw, uh, us, height} from '@/utils/fitConfig';


const LoadingSkeleton = (props)=> {
    const {
        skeletonVisible
    } = props;

    if(skeletonVisible) {
        return (
            <View style={staticStyles.skeletonWrap}>
                <Text>正在加载中...</Text>
            </View>
        )
    }
    return null;
}

LoadingSkeleton.defaultProps = {
    skeletonVisible: false
}

LoadingSkeleton.propTypes = ({
    skeletonVisible: PropTypes.bool,
})

const staticStyles = StyleSheet.create({
    skeletonWrap: {
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default React.memo(LoadingSkeleton);