/**
 * 
 * 百度统计图表组件
 */
import React, { Component } from 'react';
import Echarts from 'native-echarts';



class EchartsShouldUpdate extends Component {
    //起这个组件的主要目的，是控制其何时才去刷新, 当x轴刻度和数据源都不变的情况下不刷新
    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.option.xAxis.data === this.props.option.xAxis.data &&
            nextProps.option.series[0].data === this.props.option.series[0].data
        ) {
            return false;
        }
        return true;
    }

    render() {
        const {option, height, onPress} = this.props;
        return (
            <Echarts 
                option={option} 
                height={height} 
                onPress={onPress} 
            /> 
        );
    }
}

export default EchartsShouldUpdate