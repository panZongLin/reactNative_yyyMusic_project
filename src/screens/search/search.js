import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {connect} from 'react-redux';
import { 
    View,
    Text, 
    Image,
    StyleSheet,
    ScrollView,
    Keyboard,
	TouchableHighlight   
} from 'react-native';
import {
    Input,
    Header
} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import RenderSearchSuggest from './pieces/searchSuggest';
import RenderSearchResult from './pieces/searchResult';
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
    const [suggestList, setSuggestList] = useState([]);
    const [searchResult, setSearchResult] = useState({});

    useEffect(() => {
        request({
            url: '/search/hot/detail',
            method: 'get'
        })
        .then((res)=> {
            setSkeletonVisible(false);
            if(res && res.code===200) {
                setHotSearchList(res.data);
            }
        })
    }, [])

    useLayoutEffect(()=>{
        setTimeout(()=> inputRef.current.focus(), 100);
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
                value={searchValue}
                containerStyle={staticStyles.containerStyle}
                inputContainerStyle={staticStyles.inputContainerStyle}
                inputStyle={{fontSize: us(14)}}
                onChangeText={inputChangeText}
                rightIcon={searchValue !=='' &&
                    <AntDesign 
                        name="close"
                        size={28}
                        color="#666" 
                        onPress={()=> {
                            inputChangeText('');
                            inputRef.current.clear();
                            inputRef.current.focus();
                        }}
                    />
                }
            />
        )
    }

    const inputChangeText = (v)=> {
        setSearchValue(v);
        setSuggestList([]);
        setSearchResult({});
        if(v !=='') {
            request({
                url: `/search/suggest?keywords=${v}&type=mobile`,
                method: 'get'
            })
            .then((res)=> {
                if(res && res.code===200) {
                    setSuggestList(res.result.allMatch);
                }
            })
        }       
    }

    const RenderHotSearchList = ()=> {
        return (
            <View>  
                <View style={staticStyles.hotTitle}>
                    <Text>热搜榜</Text>
                    <TouchableHighlight                        
                        style={{borderRadius: uh*20}}
                        underlayColor={'#ccc'}
                        onPressOut={playSong}
                    >
                        <View style={staticStyles.playBtn}>
                            <AntDesign name="caretright" style={{marginLeft: uw*8}} />
                            <Text style={{marginLeft: uw*2}} >播放</Text>
                        </View>
                    </TouchableHighlight>                   
                </View>         
                <View style={staticStyles.hotItemWrap}>
                    {hotSearchList.length !==0 && hotSearchList.map((item, idx)=> {
                        const idxSty = {color: idx<=2 ? '#f00': '#ccc'};
                        const wordSty = {
                            marginRight: uw*5,
                            marginLeft: idx<9 ? uw*12 : uw*4,                      
                            fontWeight: idx<=2 ? 'bold' : 'normal'
                        }
                        return (
                            <TouchableHighlight 
                                key={item.searchWord}                            
                                underlayColor={'#ccc'}
                                //不知道跟哪个依赖冲突还是别的原因，onPress触发不了
                                onPressOut={()=> confirmSearch(item.searchWord)} 
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
            </View>
        )        
    }

    const confirmSearch = (v)=> {
        setSkeletonVisible(true);
        inputRef.current.blur();
        setSearchValue(v);
        setSuggestList([]);
        request({
            url: `/search?keywords=${v}&type=1`,
            method: 'get'
        })
        .then((res)=> {
            setSkeletonVisible(false);
            if(res && res.code===200) {
                setSearchResult(res.result);
            }
        })
    }

    const playSong = ()=> {

    }

	return (
        <View style={{
            ...staticStyles.container,
            backgroundColor: Object.keys(searchResult).length===0 ? '#fff' : '#f2f2f2'
        }}>
            <Header
                backgroundColor={Object.keys(searchResult).length===0 ? '#fff' : '#f2f2f2'}
                leftComponent={leftComponent()}
                centerComponent={centerComponent()}
                centerContainerStyle={{flex: 9, alignItems: 'flex-start'}}
                rightContainerStyle={{flex: 0}}
            />
            <ScrollView style={{flex: 1}}>
                <LoadingSkeleton 
                    visible={skeletonVisible}
                />               
                {Object.keys(searchResult).length===0 
                    ? RenderHotSearchList()
                    : <RenderSearchResult 
                        searchResult={searchResult}
                        playSong={playSong}
                      />
                }                             
            </ScrollView>
            <RenderSearchSuggest 
                searchValue={searchValue}
                suggestList={suggestList}
                confirmSearch={confirmSearch}
            />                 
        </View>		
	)
}

const staticStyles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: uw*60,
        height: uh*28,
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
        height: uh*40,
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