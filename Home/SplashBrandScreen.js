import React, { Component } from 'react'
import { View, Image, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { SplashAdScreen } from './SplashAdScreen';
import { TabBarNavigator } from './MainScreen';
import { dataAd } from './data';

export class SplashBrandScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topImg: null,
            bottomImg: null,
            mode: "half",
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Image source={{ uri: this.state.topImg }} style={[{ flex: 1, resizeMode: "stretch" }, { width: this.state.mode == "half" ? "90%" : "100%" }]} />
                <Image source={{ uri: this.state.bottomImg }} style={this.state.mode == "half" ? { width: 140, height: 70, marginVertical: 10 } : { width: 90, height: 45, position: "absolute", bottom: 20, left: 10 }} />
            </View>
        )
    }

    // 获取加载页数据
    async getSplashBrand() {
        let response = await fetch('https://app.bilibili.com/x/v2/splash/brand/list?access_key=f2f953baf17e769395be64cd260e7aa1&appkey=1d8b6e7d45233436&build=6100500&c_locale=zh_CN&channel=bili&device=phone&mobi_app=android&network=wifi&platform=android&s_locale=zh_CN&screen_height=1920&screen_width=1080&statistics=%7B%22appId%22%3A1%2C%22platform%22%3A3%2C%22version%22%3A%226.10.0%22%2C%22abtest%22%3A%22%22%7D&ts=1604537072&sign=55f5e32cdfb62cd37288fe2bed015aa3')
        let responseJson = await response.json();
        let splash_brand = responseJson.data.list;
        return splash_brand;
    }

    async getSplashAd() {
        let response = await fetch('https://app.bilibili.com/x/v2/splash/list?access_key=f2f953baf17e769395be64cd260e7aa1&ad_extra=333A9F71DEB09C75C14655088F113F6F32E2D5C5D744E16C88EB6110456307B0B297ABA9B792546DED0CD675EE9FFA6F7F67E8D08B7466B9E3A710321E56D991728FECA4E14BC478E07D78508F8C3258B41C41DF0389B3DE0EB0446C2239F68628F8C1796724B4D58D480CC4087291775D583E7EBA812040F5A2DA175C7A72063435F733086C75F60C21A41B8E57623DFA1EE05C15829538238B18DF17DB2A5A521F51505D2A3842D66239CC0179FA2361A849BF2362BDEEC9C51858EB187E2739B18EC6000D4BEFA479C9CAAAA97A537728A275EFF65531F4A86A4BD9F057BA2FA01D907DB88562C51FFD5EB911FD993CBC57491DA13E308C0A9559C2EB95E9079DE32635D51F2D8139296BCB91A18A9EC96BB1E1D0FEABA5B8D64EC2CB610E242A35C0C1129AA781C03DC7015EB1E147028AF79B3A7275C97A9A4E8D8C99151D59D1C086341FEC6102194A0DE091E4C322E6CA2344A42BECA95492A8B6F1D8ACF2AAEDD70AD7D5F3F2D9755AFCC4A42B0D58E3496E6AEC230F2B5C8127F1FBA43B7C77D31667D3E1CE42A0A2FD8F8238FD10F9636236D5F3B4C4899DC0448E5CAA0A0E3F10BDD8A35A7CB34BDDAC34A0392E884C028986652D7383B47815C0CE2340CD3231DE8F3B290118D68D67ABC4D338CAA73CF5465E07E0519ADA6ED065810D608B0E7A6E3CD1BEA2E075B9B47D9D2C5B952E782F61F7AD0AC1F92DC4748EB8251E258A7BF330F6A48F190089&appkey=1d8b6e7d45233436&birth=0220&build=6100500&c_locale=zh_CN&channel=bili&height=1920&mobi_app=android&network=wifi&platform=android&s_locale=zh_CN&statistics=%7B%22appId%22%3A1%2C%22platform%22%3A3%2C%22version%22%3A%226.10.0%22%2C%22abtest%22%3A%22%22%7D&ts=1604537072&width=1080&sign=fb40bb5dcd9b3ed2ff66d7b565517539')
        let responseJson = await response.json();
        let splash_ad = responseJson.data.list;
        return splash_ad;
    }

    // await必须写在async方法里
    async init() {
        let splash_brand = await this.getSplashBrand()
        let showIndex = parseInt(Math.random() * splash_brand.length)
        this.setState({
            topImg: splash_brand[showIndex].thumb,
            bottomImg: splash_brand[showIndex].logo_url,
            mode: splash_brand[showIndex].mode
        });

        let splash_ad = await this.getSplashAd()
        let showIndex_ad = parseInt(Math.random() * splash_ad.length)
        dataAd.push(splash_ad[showIndex_ad].thumb) // 图片
        dataAd.push(splash_ad[showIndex_ad].is_ad) // 是否为广告
        dataAd.push(splash_ad[showIndex_ad].duration) // 广告时长
        dataAd.push(splash_ad[showIndex_ad].card_type) // 样式类型
        dataAd.push(splash_ad[showIndex_ad].video_url) // 视频地址
        dataAd.push(splash_ad[showIndex_ad].video_width)// 视频的宽度
        dataAd.push(splash_ad[showIndex_ad].video_height)// 视频的高度
        dataAd.push(splash_ad[showIndex_ad].uri_title) // 广告标题
        dataAd.push(splash_ad[showIndex_ad].type) // 类型
    }

    async componentDidMount() {
        // 初始化页面
        await this.init();
        // 延时跳转
        this.timer = setTimeout(() => {
            this.timer && clearTimeout(this.timer);
            this.props.navigation.navigate("SplashAd",{navigation:this.props.navigation})
        }, 2000)
    }
}

export default Stark = 
    createAppContainer(
        createStackNavigator(
            {
                SplashBrand:{screen:SplashBrandScreen},
                SplashAd:{screen:SplashAdScreen},
                Main:{screen:TabBarNavigator}
            },
            {
                defaultNavigationOptions:{
                    headerShown:false
                }
            }
        )
    );

// const Stack = createStackNavigator();

// export default class SplashScreen extends Component {
//     render() {
//         return (
//             <NavigationContainer>
//                 <Stack.Navigator initialRouteName="SplashBrand" headerMode="none" options={{ headerShown: false }}>
//                     <Stack.Screen name="SplashBrand" component={SplashBrandScreen} />
//                     <Stack.Screen name="SplashAd" component={SplashAdScreen} />
//                     <Stack.Screen name="Main" component={TabBarNavigator} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         )
//     }
// }