import React from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    Text, 
	StyleSheet,
	TouchableHighlight   
} from 'react-native';
import {

} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {uw, uh, us} from '@/utils/fitConfig';


const SearchResult = (props)=> {
    const {
        searchResult,
        playSong 
    } = props;

    return (
        <View style={staticStyles.container}>
            <View style={staticStyles.resultTitle}>
                <Text>单曲</Text>
                <TouchableHighlight                        
                    style={{borderRadius: uh*20}}
                    underlayColor={'#ccc'}
                    onPress={playSong}
                >
                    <View style={staticStyles.playBtn}>
                        <AntDesign name="caretright" style={{marginLeft: uw*8}} />
                        <Text style={{marginLeft: uw*2}} >播放</Text>
                    </View>
                </TouchableHighlight>                   
            </View>
            {searchResult && searchResult.songs && searchResult.songs.map((item, idx)=> {
                return (
                    <TouchableHighlight
                        key={item.id}                        
                        underlayColor={'rgba(0,0,0,0.1)'}
                        onPress={playSong}
                    >
                        <View style={{...staticStyles.resultTitle, height: uh*60}}>
                            <View style={staticStyles.songInfo}>
                                <Text>{item.name}</Text>
                                <Text style={{color: '#666', fontSize: us(13)}}>
                                    {item.artists.map((n, i)=> {
                                        return (
                                            <Text key={i}>{n.name} / </Text>
                                        )
                                    })} 
                                    - {item.album.name}
                                </Text>
                            </View>
                            <View style={staticStyles.playBtn2}>
                                <AntDesign name="caretright" color="#ccc" />
                            </View>                   
                        </View>
                    </TouchableHighlight>
                    
                )
            })}  
            <View style={staticStyles.total}>
                <TouchableHighlight                        
                    underlayColor={'rgba(0,0,0,0.1)'}
                    onPressOut={()=>{}}
                >
                    <Text style={{color: '#666'}}>
                        查看更多 {searchResult.songCount} 首单曲 {'>'}
                    </Text>
                </TouchableHighlight>                   
            </View>             
        </View>
    )
	
}

SearchResult.defaultProps = {
    searchResult: {},
    playSong: ()=> {}
}

SearchResult.propTypes = ({
    searchResult: PropTypes.object,
    playSong: PropTypes.func
})

const staticStyles = StyleSheet.create({
    container: {
        margin: uw*20,
        width: uw*335,
        backgroundColor: '#fff',
        borderRadius: uh*10
    },
    resultTitle: {
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
    songInfo: {
        maxWidth: uw*270,
        height: uh*50,
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    playBtn2: {
        width: uw*20,
        height: uh*20,
        borderWidth: uh*1,
        borderColor: '#ccc',
        borderRadius: uh*20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    total: {
        height: uh*40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: uh*20,
        marginRight: uh*20,
    }
})

export default React.memo(SearchResult);