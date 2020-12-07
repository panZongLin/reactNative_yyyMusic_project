import React from 'react';
import PropTypes from 'prop-types';
import { 
    View,
	Text, 
    StatusBar, 
    StyleSheet
} from 'react-native';
import Modal from 'react-native-modal';
import {uw, uh, us, width} from '@/utils/fitConfig';

const CenterModal = (props)=> {
    const {
        visible,
        closeModal,
        height,
        title,
        titlePosition,
        content
    } = props;

    return (
        <Modal 
            isVisible={visible} 
            onBackdropPress={closeModal}
            onSwipeComplete={closeModal}
            swipeDirection="down"
            style={{margin: 0}}
        >
            <View style={staticStyles.mask}>
                <StatusBar hidden={true} />
                <View style={{
                    ...staticStyles.container,
                    height: uh*height
                }}>
                    <View style={{
                        ...staticStyles.titleView,
                        alignItems: titlePosition
                    }}>
                        <Text style={staticStyles.title}>
                            {title}
                        </Text>                        
                    </View>
                    
                    {content}
                </View>
            </View>
        </Modal>
    )
}

CenterModal.defaultProps = {
    visible: false,
    closeModal: ()=> {},
    height: 100,
    title: '确认您的操作',
    titlePosition: 'flex-start', 
    content: <View></View>
}

CenterModal.propTypes = ({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    height: PropTypes.number,
    title: PropTypes.string,
    titlePosition: PropTypes.string,
    content: PropTypes.node
})

const staticStyles = StyleSheet.create({
    mask: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    container: {
        width: uw*300, 
        backgroundColor: '#fff',
        borderRadius: uh*10,
    },
    titleView: {
        height: uh*50,
        justifyContent: 'center',
        paddingLeft: uh*15,
    },
    title: {
        fontSize: us(13),
        color: '#666'
    }
})

export default React.memo(CenterModal);