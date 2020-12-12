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


const SearchSuggest = (props)=> {
    const {
        searchValue,
        suggestList,
        confirmSearch
    } = props;

    if(suggestList.length !==0) {
        return (
            <View style={staticStyles.container}>
                <TouchableHighlight underlayColor="#ccc" onPress={()=> confirmSearch(searchValue)}>
                    <View style={staticStyles.itemWrap}>
                        <Text style={staticStyles.keyw}>
                            搜索 “{searchValue}”
                        </Text>
                    </View>
                </TouchableHighlight>
                {suggestList.length !==0 && suggestList.map((item, idx)=> {
                    return (
                        <TouchableHighlight 
                            key={item.keyword} 
                            underlayColor="#ccc"                           
                            onPress={()=> confirmSearch(item.keyword)}
                        >
                            <View style={staticStyles.itemWrap}>
                                <AntDesign 
                                    name="search1" 
                                    size={20} 
                                    color="#666" 
                                    style={{marginLeft: uw*20}} 
                                />
                                <Text style={{
                                    ...staticStyles.keyw, 
                                    color: '#666',
                                    marginLeft: uw*10
                                }}>
                                    {item.keyword}
                                </Text>
                            </View>
                        </TouchableHighlight> 
                    )
                })}                                     
            </View>
        )
    }
    return <View></View>	
}

SearchSuggest.defaultProps = {
    searchValue: '',
    suggestList: [],
    confirmSearch: ()=> {}
}

SearchSuggest.propTypes = ({
    searchValue: PropTypes.string,
    suggestList: PropTypes.array,
    confirmSearch: PropTypes.func 
})

const staticStyles = StyleSheet.create({
    container: {
        marginLeft: uw*20,
        marginRight: uw*20,
        position: "absolute",
        left: uh*0,
        top: uh*80,
        width: uw*335,
        maxHeight: uh*550,
        backgroundColor: '#fff',
        borderWidth: uh*1,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: uh*2
    },
    itemWrap: {
        height: uh*50,
        borderBottomWidth: uh*1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    keyw: {
        marginLeft: uw*20,
        color: '#4b7ee4'
    }
})

export default React.memo(SearchSuggest);