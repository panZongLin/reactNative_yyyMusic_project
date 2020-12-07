import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { 
    View,
    Text,
    Image, 
    StyleSheet,
    ScrollView,
	TouchableOpacity   
} from 'react-native';
import moment from 'moment';
import {Button} from 'react-native-elements';
import UserTitle from './pieces/title';
import BottomModal from '@/components/BottomModal';
import CenterModal from '@/components/CenterModal';
import {uw, uh, us, width} from '@/utils/fitConfig';


const DrawerContent = (props)=> {
    const {
        navigation,
        dispatchSubmitLoginOut
    } = props;
    const [itemModalVisible, setItemVisible] = useState(false);
    const [confirmModalVisible, setconfirmVisible] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    useEffect(()=>{
        global.storage.load({
            key: 'userInfo',
            autoSync: true,  
            syncInBackground: true, 
        })
        .then((res)=> {
            setUserProfile(res.profile);
        })
        .catch((err)=> {})
    }, [])

    const closeItemModal = ()=> {
        setItemVisible(false);
    }
    const ItemModalContent = ()=> {
        return (
            <View style={staticStyles.itemModalView}>
                <Button
                    title="关闭云音乐"
                    type="clear"
                    containerStyle={{width, alignItems: 'flex-start'}}
                    titleStyle={{width, textAlign: 'left', color: '#000'}}
                />
                <Button
                    title="退出云音乐登录"
                    type="clear"
                    containerStyle={{width, alignItems: 'flex-start'}}
                    titleStyle={{width, textAlign: 'left', color: '#000'}}
                    onPress={()=> {
                        setconfirmVisible(true);
                        closeItemModal();
                    }}
                />              
            </View>
        )
    }

    const closeConfirmModal = ()=> {
        setconfirmVisible(false);
    }
    const ContentModalContent = ()=> {
        const textSty = {
            fontSize: us(14), 
            color: '#f00',
            marginRight: uw*25
        }
        return (
            <View style={staticStyles.contentModalView}>
                <Text 
                    style={textSty}
                    onPress={()=> setconfirmVisible(false)}                  
                >
                    取消
                </Text>
                <Text
                    style={textSty}
                    onPress={()=> {
                        setconfirmVisible(false);
                        submitLoginOut();
                    }}                  
                >
                    退出
                </Text>
            </View>
        )
    }

    const submitLoginOut = ()=> {
        dispatchSubmitLoginOut();
    }

	return (
		<View style={staticStyles.container}>
            <UserTitle 
                avatarUrl={userProfile.avatarUrl || ''}
                nickname={userProfile.nickname || ''}
                goToLoginPage={()=> navigation.push('LoginPage')}
            />
            <ScrollView 
                style={staticStyles.scrollView}
            >
                {userProfile.backgroundUrl &&
                    <Image 
                        style={staticStyles.profileBgSty}
                        source={{uri: userProfile.backgroundUrl}}
                    />
                }              
                <View style={staticStyles.buttonWrap}>
                    {Object.keys(userProfile).length !==0 &&
                        <View style={staticStyles.profileInfoWrap}>
                            <Text style={{fontSize: us(16), marginBottom: uh*10}}>
                                基本信息
                            </Text>
                            <Text style={staticStyles.infoItem}>
                                ID:  {userProfile.userId}
                            </Text>
                            <Text style={staticStyles.infoItem}>
                                昵称:  {userProfile.nickname}
                            </Text>
                            <Text style={staticStyles.infoItem}>
                                关注:  {userProfile.follows}
                            </Text>
                            <Text style={staticStyles.infoItem}>
                                粉丝:  {userProfile.followeds}
                            </Text>
                            <Text style={staticStyles.infoItem}>
                                性别:  {userProfile.gender===1 ? '男' : '女'}
                            </Text>
                            <Text style={staticStyles.infoItem}>
                                生日:  {moment(userProfile.birthday).format('YYYY-MM-DD')}
                            </Text>
                            <Text style={staticStyles.infoItem}>
                                省市:  {userProfile.province} - {userProfile.city}
                            </Text>
                            <Text style={staticStyles.infoItem}>
                                签名:  {userProfile.signature}
                            </Text>
                        </View>
                    }                    
                </View>
                <View style={staticStyles.buttonWrap}>
                    <Button
                        title="退出登录/关闭"
                        buttonStyle={staticStyles.buttonStyle}
                        titleStyle={staticStyles.titleStyle}
                        onPress={()=> setItemVisible(true)}
                    />
                </View>
            </ScrollView>
            <BottomModal 
                visible={itemModalVisible}
                closeModal={closeItemModal}
                title={'退出登录/关闭'}
                content={ItemModalContent()}
            />
            <CenterModal 
                visible={confirmModalVisible}
                closeModal={closeConfirmModal}
                title={'确定退出当前账号吗？'}
                content={ContentModalContent()}
            />
		</View>
	)
}

const staticStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    profileBgSty: {
        width: uw*300,
        height: uh*150
    },
    profileInfoWrap: {
        width: uw*260, 
        padding: uh*20,
        marginTop: uh*-30,
        backgroundColor: '#fff',
        borderRadius: uh*10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    infoItem: {
        fontSize: us(13),
        color: '#666',
        lineHeight: uh*20
    },
    buttonWrap: {
        width: uw*300,
        marginTop: uh*20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        width: uw*260, 
        height: uh*40,       
        backgroundColor: '#fff',
        borderRadius: uh*10
    },
    titleStyle: {
       fontSize: us(16),
       color: '#f00',     
    },
    itemModalView: {
        flex: 1,
        paddingLeft: uh*15,
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    contentModalView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

function mapStateToProps(state) {
    return {
        //main: state.main,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchSubmitLoginOut: (params) => dispatch({ type: 'userModel/submitLoginOut', payload: params}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);