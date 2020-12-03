/**
 * 
 * 齿轮日期选择组件
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {range} from 'lodash';
import {
    View, Text, StyleSheet, 
    Animated, Dimensions, StatusBar,
    Platform, TouchableOpacity, default as Easing, 
} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker'
import {uw, uh, us} from '../utils/fitConfig';

const { width, height } = Dimensions.get('window');
const PickerItem = Picker.Item;


export default class WheelDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMonthItem : this.props.opations[0].selectedItem,
            itemMonthList: this.props.opations[0].itemList,

            selectedDayItem : this.props.opations[1].selectedItem,
            itemDayList: this.props.opations[1].itemList,

            selectedYearItem : this.props.opations[2].selectedItem,
            itemYearList: this.props.opations[2].itemList,

            contentBottom: new Animated.Value(uh*-250) 
        }
    }
    static navigationOptions = {
        header: null
    };

    static defaultProps = {
        pickerModalVisible: false,
        togglePickerModal: ()=>{},
        confirmPicker: ()=>{},
        opations: [
            {
                selectedItem: 4,
                itemList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
            {
                selectedItem: 20,
                itemList: range(31).map((item)=> `${item}`)
            },
            {
                selectedItem: 99,
                itemList: range(100).map((item)=> {
                    const year = new Date().getFullYear();
                    return `${year-(100-item)+1}`
                })
            }
        ]
    }

    componentDidMount() {
        if(this.props.pickerModalVisible===true) {
            this.startAnimation()
        }
    } 

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.pickerModalVisible===true && this.props.pickerModalVisible ==false) {
            this.startAnimation()
        }
    }

    onPickerSelect (index, target) {      
        if(target==='month') {
            this.setState({selectedMonthItem: index})
        }else if(target==='day'){
            this.setState({selectedDayItem: index})           
        }else {
            this.setState({selectedYearItem: index})
        }
    }

    handerConfirmPicker() {
        const {selectedMonthItem, itemMonthList, selectedDayItem, itemDayList, selectedYearItem, itemYearList} = this.state;
        let month = itemMonthList[selectedMonthItem];
        let day = itemDayList[selectedDayItem];
        let year = itemYearList[selectedYearItem];

        this.props.confirmPicker(year, month, day);
    }

    startAnimation ()  {
        Animated.sequence([
            Animated.timing(
                this.state.contentBottom,
                {
                    toValue: uh*0,
                    duration: 500,
                    easing: Easing.linear
                }
            )
        ]).start() 
    };


    render() {
        const styles = StyleSheet.create({  
            content: {
                width: '100%',
                height: uh*250,
                position: 'absolute',
                left: 0,             
                backgroundColor: '#fff',
                borderTopLeftRadius: uh*10,
                borderTopRightRadius: uh*10,               
            },
            leftV: {
                width: width/2,
                height: uh*50,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopWidth: uh*1,
                borderTopColor: '#ccc',
                borderRightWidth: uh*1,
                borderRightColor: '#ccc'
            }
        })

        return (
            <Fragment>
                {this.props.pickerModalVisible &&
                    <View style={{...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <Animated.View style={[styles.content, {bottom: this.state.contentBottom}]}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center'}}>
                                <Picker 
                                    style={{width: '45%', height: uh*200}}
                                    selectedValue={this.state.selectedMonthItem}
                                    itemStyle={{color:"#3a3a3a", fontSize: Platform.OS==='ios' ? us(24) : us(18)}}
                                    onValueChange={(index) => this.onPickerSelect(index, 'month')}
                                >
                                    {this.state.itemMonthList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"month"+value}/>
                                    ))}
                                </Picker>
                                <Picker 
                                    style={{width: '25%', height: uh*200}}
                                    selectedValue={this.state.selectedDayItem}
                                    itemStyle={{color:"#3a3a3a", fontSize: us(24)}}
                                    onValueChange={(index) => this.onPickerSelect(index, 'day')}
                                >
                                    {this.state.itemDayList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"day"+value}/>
                                    ))}
                                </Picker>
                                <Picker 
                                    style={{width: '30%', height: uh*200}}
                                    selectedValue={this.state.selectedYearItem}
                                    itemStyle={{color:"#3a3a3a", fontSize: us(24)}}
                                    onValueChange={(index) => this.onPickerSelect(index, 'year')}
                                >
                                    {this.state.itemYearList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"year"+value}/>
                                    ))}
                                </Picker>
                            </View>                         
                            <View style={{flexDirection: 'row', width: '100%', height: uh*50}}>
                                <TouchableOpacity 
                                    activeOpacity={1} 
                                    onPress={()=>this.props.togglePickerModal(false)}
                                >
                                    <View style={styles.leftV}>
                                        <Text style={{color: '#999', fontSize: us(16)}}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>  
                                <TouchableOpacity 
                                    activeOpacity={1} 
                                    onPress={this.handerConfirmPicker}
                                >
                                    <View style={{...styles.leftV, borderRightWidth: 0}}>
                                        <Text style={{color: '#60BD6E', fontSize: us(16)}}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>                       
                            </View>
                        </Animated.View>
                    </View> 
                }
            </Fragment>          
        )
    }
}


const propTypes = {
    pickerModalVisible: PropTypes.bool,
    togglePickerModal: PropTypes.func,
    confirmPicker: PropTypes.func,
    opations: PropTypes.array
};
WheelDatePicker.propTypes = propTypes;
