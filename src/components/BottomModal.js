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

const BottomModal = (props)=> {
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

BottomModal.defaultProps = {
    visible: false,
    closeModal: ()=> {},
    height: 150,
    title: '选择您的操作',
    titlePosition: 'flex-start', 
    content: <View></View>
}

BottomModal.propTypes = ({
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
        justifyContent: 'flex-end', 
        alignItems: 'center',
    },
    container: {
        width: width, 
        backgroundColor: '#fff',
        borderTopLeftRadius: uh*15,
        borderTopRightRadius: uh*15,
    },
    titleView: {
        height: uh*50,
        justifyContent: 'center',
        paddingLeft: uh*15,
        borderBottomWidth: uh*1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: us(13),
        color: '#666'
    }
})

export default React.memo(BottomModal);