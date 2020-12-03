/**
 * 
 * 页面崩溃提示
 */
import React from 'react';
import {View, Text} from 'react-native';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
    componentDidCatch(error, info) {
        alert('1111')
        this.setState({
            error
        });

        // 设置崩溃以后显示的UI
        // 上传错误日志
    }
    render() {
        if (this.state.error) { 
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'red'}}>
                        {this.state.error && this.state.error.toString()}
                    </Text>
                </View>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;