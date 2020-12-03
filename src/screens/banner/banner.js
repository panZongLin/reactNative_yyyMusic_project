import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { 
    View,
    Text,  
    Image,
    StyleSheet,
    StatusBar   
} from 'react-native';
import {uw, uh, us} from '@/utils/fitConfig';
import toolFn from '@/utils/toolFunction';
import defaultJpg from '@/assets/banner.jpeg';

let Il = null;

const BannerPage = (props)=> {
    const {
        navigation, 
        dispatchGetBanner,
    } = props;
    const [time, setTime] = useState(4);

    useEffect(()=> {
        Il = setInterval(()=> {
            setTime((t)=> {
                if(t<=1) {
                    jumpToMain()
                }
                return t-1;
            })
        }, 1000)
        return ()=> {
            clearInterval(Il); 
        }      
    }, [])

    useEffect(()=> {
        dispatchGetBanner({type: 0});
    }, [])
    
    const jumpToMain = ()=> {
        clearInterval(Il); 
        //使用.replace替换组件，使得该组件卸载从而执行return，手机后退键也不会退到此页面
        //使用setTimeout使得最后一次return t-1不会报错                   
        setTimeout(()=> navigation.replace('Main'), 0)
    }

    return (
        <View style={staticStyles.container}>
            <StatusBar hidden={true} />
            <Image 
                source={defaultJpg}
                style={staticStyles.imageWrap}
                //onPress={()=> toolFn.showShortToast('点击了广告图片')}               
            />
            <Text style={staticStyles.time} onPress={jumpToMain}>
                跳过 {time}
            </Text>
            <Text style={staticStyles.title}>
                — 网易云音乐 · 音乐的力量 —
            </Text>
        </View>
    )
}

const staticStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //width: Dimensions.get('window').width,
        width: null,
        height: null,
        backgroundColor:'rgba(0,0,0,0)',
    },
    time: {
        position: "absolute",
        right:  uw*30,
        top: uh*30,
        width: uw*50,
        height: uh*30,
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: '#fff',
        textAlign: "center",
        lineHeight: uh*30,
        borderRadius: uh*10
    },
    title: {
        position: "absolute",
        left:  '50%',
        bottom: uh*50,
        marginLeft: uw*-100,
        width: uw*200,
        height: uh*30, 
        fontSize: us(14),       
        color: '#fff',
        textAlign: "center",
        lineHeight: uh*30
    }
})

function mapStateToProps(state) {
    return {
        //discoverModel: state.discoverModel,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchGetBanner: (params) => dispatch({ type: 'discoverModel/getBanner', payload: params}),
        dispatchUpdateState: (params) => dispatch({ type: 'discoverModel/updateState', payload: params}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BannerPage);