/**
 *
 * 适配文件
 */
import {Dimensions, StatusBar, Platform, PixelRatio} from 'react-native'


const designWidth = 375, designHeight = 668;

//手机屏幕的宽高
export const width = Dimensions.get('window').width;
//手机屏幕的高度
export const height = Dimensions.get('window').height;

//字体缩放比
const fontScale = PixelRatio.getFontScale();
//设备像素密度
const pixelRatio = PixelRatio.get();


//宽度比例
export const uw = width / designWidth
//高度比例
export const uh = height / designHeight
//字体缩放比例
export function us(size) {
    var scaleWidth = width / designWidth;
    var scaleHeight = height / designHeight;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round(size*scale/fontScale + 0.5);
    return size;
}



//判断是否为iphoneX，11
const X_WIDTH = 375, X_HEIGHT = 812;
const X11PRO_WIDTH = 414, X11PRO_HEIGHT = 896;
export function isIphoneXAndUp() {
    return Platform.OS == 'ios' && (
            height == X_HEIGHT && width == X_WIDTH
            || height == X11PRO_HEIGHT && width == X11PRO_WIDTH
        )
}

//状态栏的高度
export function getStatusBarHeight() {
    if (Platform.OS == 'android') return StatusBar.currentHeight;
    if (isIphoneXAndUp()) {
        if(height == X_HEIGHT && width == X_WIDTH) {
            return 44
        }
        if(height == X11PRO_HEIGHT && width == X11PRO_WIDTH) {
            return 44
        }
        return 44
    }
    return 20
}