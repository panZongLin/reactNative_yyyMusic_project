import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {connect} from 'react-redux';
import { 
    View,
    Text, 
    Image,
    StyleSheet,
    ScrollView,
	TouchableHighlight   
} from 'react-native';
import {
    Input,
    Header
} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import {uw, uh, us, width} from '@/utils/fitConfig';
import request from '@/utils/request';


const SearchPage = (props)=> {
    const {
        navigation
    } = props;
    const inputRef = useRef('');
    const [skeletonVisible,  setSkeletonVisible] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [hotSearchList, setHotSearchList] = useState([]);

    useEffect(() => {
        request({
            url: '/search/hot/detail',
            method: 'get'
        })
        .then((res)=> {
            setSkeletonVisible(false);
            if(res.code===200) {
                setHotSearchList(res.data);
            }
        })
    }, [])

    useLayoutEffect(()=>{
        setTimeout(()=> inputRef.current.focus(), 100)
    }, [])

    const leftComponent = ()=> {
        return (
            <AntDesign 
                name="arrowleft"
                size={28}
                color="#666" 
                onPress={()=> navigation.goBack()}
            />
        )
    }

    const centerComponent = ()=> {
        return (
            <Input
                ref={inputRef}
                placeholder='风的季节'
                containerStyle={staticStyles.containerStyle}
                inputContainerStyle={staticStyles.inputContainerStyle}
                onChangeText={inputChangeText}
                rightIcon={searchValue !=='' &&
                    <AntDesign 
                        name="close"
                        size={28}
                        color="#666" 
                        onPress={()=> {
                            inputChangeText('');
                            inputRef.current.clear();
                        }}
                    />
                }
            />
        )
    }

    const inputChangeText = (v)=> {
        setSearchValue(v);
    }

    const renderHotSearchList = ()=> {
        return (
            <View style={staticStyles.hotItemWrap}>
                {hotSearchList.length !==0 && hotSearchList.map((item, idx)=> {
                    const idxSty = {fontSize: us(13), color: idx<=2 ? '#f00': '#ccc'};
                    const wordSty = {
                        fontSize: us(13),
                        marginRight: uw*5,
                        marginLeft: idx<9 ? uw*12 : uw*4,                      
                        fontWeight: idx<=2 ? 'bold' : 'normal'
                    }
                    return (
                        <TouchableHighlight 
                            key={item.searchWord} 
                            onPress={()=>{}} 
                            underlayColor={'#ccc'}
                        >
                            <View style={staticStyles.hotItem}>
                                <Text style={idxSty}>{idx+1}</Text>
                                <Text style={wordSty}>{item.searchWord}</Text>
                                <Image 
                                    source={{uri: item.iconUrl}}
                                    style={{width: uw*30, height: uh*15}}                                   
                                />
                            </View>
                        </TouchableHighlight>
                    )
                })}                
            </View>
        )        
    }

	return (
        <View style={staticStyles.container}>
            <Header
                backgroundColor="#fff"
                leftComponent={leftComponent()}
                centerComponent={centerComponent()}
                centerContainerStyle={{flex: 9, alignItems: 'flex-start'}}
                rightContainerStyle={{flex: 0}}
            />
            <ScrollView style={{flex: 1}}>
                <LoadingSkeleton 
                    visible={skeletonVisible}
                />
                <View style={staticStyles.hotTitle}>
                    <Text style={{fontSize: us(14)}}>
                        热搜榜
                    </Text>
                    <TouchableHighlight 
                        onPress={()=>{}}
                        style={{borderRadius: uh*20}}
                        underlayColor={'#ccc'}
                    >
                        <View style={staticStyles.playBtn}>
                            <AntDesign 
                                name="caretright"
                                style={{marginLeft: uw*8}} 
                            />
                            <Text style={{marginLeft: uw*2}} >
                                播放
                            </Text>
                        </View>
                    </TouchableHighlight>                   
                </View>
                {renderHotSearchList()}                
            </ScrollView>           
        </View>		
	)
}

const staticStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerStyle: {
        width: uw*320,
        height: uh*38,
    },
    inputContainerStyle: {
        height: uh*38,
    },
    hotTitle: {
        height: uh*50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: uh*20,
        marginRight: uh*20,
        borderBottomWidth: uh*1,
        borderBottomColor: '#ccc'
    },
    playBtn: {
        width: uw*55,
        height: uh*25,
        borderWidth: uh*1,
        borderColor: '#ccc',
        borderRadius: uh*20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    hotItemWrap: {
        marginLeft: uh*20,
        marginRight: uh*20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    hotItem: {
        width: uw*167,
        height: uh*35,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

function mapStateToProps(state) {
    return {
        //discoverModel: state.discoverModel,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        //dispatchUpdateState: (params) => dispatch({ type: 'discoverModel/updateState', payload: params}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);