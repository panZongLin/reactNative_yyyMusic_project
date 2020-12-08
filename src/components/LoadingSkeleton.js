import React from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    Text, 
	StyleSheet,
} from 'react-native';
import Spinkit from 'react-native-spinkit';
import {uw, uh, us, height as deviceH} from '@/utils/fitConfig';


const LoadingSkeleton = (props)=> {
    const {
        visible,
        height
    } = props;

    if(visible) {
        return (
            <View style={{
                ...staticStyles.skeletonWrap,
                height: height===deviceH ? height : uh*height
            }}>
                <Spinkit type="Wave" color="#f00" size={28} />
                <Text style={{
                    fontSize: us(13), color: '#ccc'
                }}> 
                    正在加载中...
                </Text>
            </View>
        )
    }
    return null;
}

LoadingSkeleton.defaultProps = {
    visible: false,
    height: deviceH
}

LoadingSkeleton.propTypes = ({
    visible: PropTypes.bool,
    height: PropTypes.number
})

const staticStyles = StyleSheet.create({
    skeletonWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default React.memo(LoadingSkeleton);