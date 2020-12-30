import React, { Component } from 'react';
import { View, Text, Image, DeviceEventEmitter, TextInput, TouchableOpacity, Dimensions, BackHandler, StatusBar, TouchableWithoutFeedback, Animated } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import Slider from '@react-native-community/slider';
import moment from 'moment';
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { VideoIntro } from './VideoIntro';
import { VideoComment } from './VideoComment';
import { themeColor, videoData, dealNum } from '../data';
import { getVideoDetilUrl } from '../utils';

// 获取屏幕的宽度
var { width, height } = Dimensions.get('window')
// 加评论总数，数据为：data.stat.reply
var VideoLabel = ["简介", "评论"];
var CmtNum = "";
// 视频尺寸大小
var videoSize = [
    // 0：横拍，非全屏
    { w: width, h: width * 1080 / 1920 },
    // 1：竖拍，非全屏
    { w: width, h: height * 0.65 },
    // 2：横拍，全屏
    { w: height, h: width },
    // 3：竖拍，全屏
    { w: width, h: height }
]

export class VideoPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barrage: "",
            on: true,
            // 用于获取视频的URL
            video: [],
            // 视频是否加载完毕
            isVideoLoad: false,
            // 视频标题
            title: null,
            // 视频状态：1 加载完毕前 2 加载完毕 播放完毕前 3 播放完毕后
            videoStatus: 1,
            isPaused: false,
            // 是否全屏
            isFullScreen: false,
            // 视频播放器尺寸
            videoWidth: videoSize[0].w,
            videoHight: videoSize[0].h,
            // 视频尺寸类型
            videoSizeType: 0,
            // 视频尺寸
            dimensions: null,
            // 滑块值
            sliderValue: 0,
            // 滑块是否正在被移动
            sliding: false,
            // 视频总时长
            duration: 0,
            // 当前播放时刻
            currentTime: 0,
            // 控制控制按钮是否显示
            boxShow: false,
            // 水平方向位移动画
            translateX: new Animated.Value(0),
            // 动画Text 宽度尺寸
            atWidth: width * 0.6,
            profile: []
        }
    }

    // 获取视频详情页的简介数据
    async getProfile() {
        let response = await fetch(videoData[2])
        let responseJson = await response.json();
        let profile = responseJson.data;
        return profile;
    }

    // 获取视频Url
    async getVideo() {
        // const cid = this.props.navigation.state.params.cid
        let response = await fetch("https://api.bilibili.com/x/player/playurl?cid=" + videoData[1] + "&avid=" + videoData[0] + "&platform=html5&otype=json&qn=16&type=mp4&html5=1")
        let responseJson = await response.json();
        let video = responseJson.data;
        return video;
    }

    // await必须写在async方法里
    async init() {
        let video = await this.getVideo()
        let profile = await this.getProfile()
        this.setState({
            // 视频尺寸，1920/1080:横拍 720/1280:竖拍
            dimensions: profile.dimension,
            // 视频标题
            title: profile.title + "     ",
            video: video,
            profile: profile
        });
    }

    textAnimated = (index) => {
        index++;
        Animated.timing(this.state.translateX, {
            useNativeDriver: false,
            toValue: -2 * index, //向左移动2
            duration: 100, // 动画时间
        }).start(() => {    //每一个动画结束后的回调
            // 全屏状态且视频没有播放完的情况下继续动画
            if (this.state.isFullScreen && this.state.videoStatus == 2) {
                this.textAnimated(index); // 继续动画
                // Animated.Text 宽度+2
                this.setState({ atWidth: this.state.atWidth + 2 })
                // title追加一个字符
                this.setState({ title: this.state.title + this.state.title.substring(index - 1, index) })
            }
            // 动画结束后一切回到原始状态
            else {
                index = 0
                this.state.translateX.setValue(0)
                this.setState({
                    atWidth: width * 0.6,
                    title: this.state.profile.title + "     "
                })
            }
        })
    }

    async componentDidMount() {
        await this.init()
        // 发送消息给首页
        DeviceEventEmitter.emit('showBar', true)
        // 监听返回键
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed = () => {
            this.onBackPress()
            return true
        });

        // 根据横竖拍确定Video显示尺寸 0为横拍 1为竖拍
        var videoSizeType = this.state.dimensions.width / this.state.dimensions.height > 1 ? 0 : 1
        this.setState({
            videoWidth: videoSize[videoSizeType].w,
            videoHight: videoSize[videoSizeType].h,
            videoSizeType: videoSizeType
        })
    }

    componentWillUnmount() {
        // 组件卸载时还原竖屏
        Orientation.lockToPortrait()
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed = () => { return false })
        // 还原导航和搜索栏
        DeviceEventEmitter.emit('showBar', false)
    }

    onBackPress = () => {
        // 若是全屏则还原，否则返回上个页面
        if (this.state.isFullScreen) {
            this.setState({ isFullScreen: false })
            // 还原竖屏
            Orientation.lockToPortrait()
            // 还原尺寸
            this.setState({
                videoHight: videoSize[this.state.videoSizeType].h,
                videoWidth: videoSize[this.state.videoSizeType].w
            })
        } else {
            this.props.navigation.goBack()
        }
    }

    render() {
        // 获取上个页面传递过来的参数，并打印查看
        const cover = this.props.navigation.state.params.cover
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true} />
                {/* 封面图片 */}
                <Image style={{ display: this.state.videoStatus == 1 ? "flex" : "none", height: this.state.videoHight, width: this.state.videoWidth, resizeMode: "stretch" }} source={{ uri: cover }} />
                <TouchableWithoutFeedback onPress={() => {
                    this.setState({ boxShow: !this.state.boxShow })
                }}>
                    <Video
                        ref={(ref) => {
                            this.player = ref
                        }}
                        style={{ display: this.state.videoStatus == 2 ? "flex" : "none", height: this.state.videoHight, width: this.state.videoWidth }}
                        source={{ uri: this.state.video.durl != null ? this.state.video.durl[0].url : "http://upos-sz-mirrorhw.bilivideo.com/upgcxcode/06/47/266144706/266144706-1-16.mp4?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1608697931&gen=playurl&os=hwbv&oi=1032994756&trid=6d9ab90c5f864dcdac71247aa973ba92h&platform=html5&upsig=8140e5c289c1b9c1924989d508495bd3&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=24371937&logo=80000000" }}
                        paused={this.state.isPaused} // 默认为false不暂停播放，true为暂停播放
                        rate={1.0} // 视频播放速度 1为以正常速度播放 0为暂停播放
                        volume={3}
                        resizeMode="contain"
                        onLoad={(data) => {
                            this.setState({
                                videoStatus: 2,
                                duration: Math.ceil(data.duration)
                            })
                        }}
                        onProgress={(data) => {
                            let currentTime = Math.ceil(data.currentTime)
                            if (!this.state.sliding) {
                                // 当前时间/视频总时间=当前进度值/100(最大进度值)
                                this.setState({
                                    // 当前时间/视频总时间*100(最大进度值)=当前进度值
                                    sliderValue: currentTime * 100 / this.state.duration,
                                    currentTime: currentTime
                                })
                            }
                            if (currentTime == this.state.duration) {
                                // 设置视频暂停播放，视频状态为播放完毕
                                this.setState({
                                    isPaused: true,
                                    videoStatus: 3,
                                    boxShow: false
                                })
                                // 进度回到0
                                this.player.seek(0)
                            }
                        }}
                        onEnd={()=>{
                            console.log("视频结束");
                        }}
                    />
                </TouchableWithoutFeedback>
                {/* 重播 */}
                <View style={{ display: this.state.videoStatus == 3 ? "flex" : "none", width: this.state.videoWidth, height: this.state.videoHight, alignItems: "center", justifyContent: "center", backgroundColor: "#000" }}>
                    <TouchableOpacity onPress={() => {
                        // 把状态调为加载后，播放完毕前
                        this.setState({
                            videoStatus: 2,
                            isPaused: false
                        })
                        this.textAnimated(0)
                    }}>
                        <Image source={require('../images/relive.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                {/* 视频返回键 */}
                <View style={{ opacity: this.state.boxShow ? 1 : 0, position: "absolute", flexDirection: "row", backgroundColor: 'rgba(0,0,0,0.1)', width: "100%", height: 40, alignItems: "flex-end", paddingHorizontal: 5 }}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.onBackPress()
                    }}>
                        <Image source={require('../images/back.png')} style={{ height: 15, width: 8.5, marginBottom: 2 }} />
                    </TouchableWithoutFeedback>
                    {/* 视频标题 */}
                    <View style={{ overflow: "hidden", marginLeft: 10, alignItems: "center" }}>
                        <Animated.Text style={{
                            width: this.state.atWidth,
                            height: 20,
                            overflow: "hidden",
                            display: this.state.isFullScreen && this.state.videoStatus == 2 ? "flex" : "none",
                            color: "#fff",
                            transform: [{
                                translateX: this.state.translateX,
                            }]
                        }}>
                            {this.state.title}
                        </Animated.Text>
                    </View>
                </View>
                {/* 播放/暂停、全屏、进度条显示 */}
                <View style={{ opacity: this.state.boxShow ? 1 : 0, position: "absolute", flexDirection: "row", top: this.state.videoHight - 30, backgroundColor: 'rgba(0,0,0,0.2)', width: "100%", height: 30, alignItems: "center", paddingHorizontal: 5 }}>
                    {/* 暂停/播放 */}
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({
                            isPaused: !this.state.isPaused
                        })
                    }}>
                        <Image source={this.state.isPaused ? require('../images/broadcast.png') : require('../images/pause.png')} style={{ width: 20, height: 20 }} />
                    </TouchableWithoutFeedback>
                    {/* 进度条 */}
                    <Slider style={{ flex: 1, height: 20 }}
                        value={this.state.sliderValue}
                        maximumValue={100}
                        minimumValue={0}
                        minimumTrackTintColor={themeColor}
                        maximumTrackTintColor="#ccc"
                        thumbImage={require('../images/slidervalue.png')}
                        // 在用户拖动滑块时不断调用该函数
                        onValueChange={(value) => {
                            this.setState({
                                currentTime: Math.ceil(value * this.state.duration / 100),
                                sliding: true
                            })
                        }}
                        // 当用户释放滑块时调用
                        onSlidingComplete={() => {
                            // 将视频跳转到指定进度
                            this.player.seek(this.state.currentTime)
                            setTimeout(() => {
                                this.setState({
                                    sliding: false
                                })
                            }, 250)
                        }}
                    />
                    {/* 当前时间/视频总时间 */}
                    <Text style={{ color: "#ddd", fontSize: 10, marginRight: 10 }}>{moment(this.state.currentTime * 1000).format("mm:ss") + " / "}{moment(this.state.duration * 1000).format("mm:ss")}</Text>
                    {/* 是否全屏显示 */}
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isFullScreen: true
                        })
                        if (this.state.videoSizeType == 0) {
                            // 设为横屏
                            Orientation.lockToLandscape()
                        }
                        // 设为全屏
                        this.setState({
                            videoWidth: videoSize[this.state.videoSizeType + 2].w,
                            videoHight: videoSize[this.state.videoSizeType + 2].h,
                        })
                        // 开启视频标题动画
                        if (this.state.profile.title.length > 13) {
                            setTimeout(() => {
                                this.textAnimated(0)
                            }, 1000)
                        }
                    }}>
                        <Image source={require('../images/fullscreen.png')} style={{ display: this.state.isFullScreen ? "none" : "flex", width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, borderTopColor: "#8a8a8a", borderTopWidth: 0.2 }}>
                    {/* 简介和评论页面 */}
                    <VideoTab />
                    {/* 弹幕输入及开关 */}
                    <View style={{
                        width: 130,
                        height: 28,
                        flexDirection: "row",
                        backgroundColor: "#F4F4F4",
                        borderRadius: 30,
                        position: "absolute",
                        right: 10,
                        top: 4
                    }}>
                        {/* 弹幕的输入 */}
                        <TextInput style={{ width: 90, height: 28, paddingVertical: 0, fontSize: 12, textAlign: "center", color: "#999" }}
                            onChange={(text) => {
                                this.setState({
                                    barrage: text
                                })
                            }}
                            maxLength={25}
                            // 提示文字信息
                            placeholder="点我发弹幕"
                        />
                        {/* 弹幕的开关 */}
                        <TouchableOpacity style={{
                            width: 40,
                            height: 28,
                            backgroundColor: "#fff",
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 15,
                            borderRightWidth: 0.8,
                            borderRightColor: "#F4F4F4"
                        }}
                            onPress={() => {
                                // 判断此时弹幕的开关状态
                                if (this.state.on) {
                                    this.setState({
                                        on: false
                                    })
                                } else {
                                    this.setState({
                                        on: true
                                    })
                                }
                            }}>
                            <View style={{
                                width: 40,
                                height: 28,
                                borderTopRightRadius: 15,
                                borderBottomRightRadius: 15,
                                backgroundColor: "#7c7c7c",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Image style={{ width: 22, height: 22 }} source={this.state.on ? require('../images/barrageon.png') : require('../images//barrageoff.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const VideoTab = createAppContainer(
    createMaterialTopTabNavigator(
        {
            VideoIntro: {
                screen: VideoIntro,
                navigationOptions: {
                    tabBarLabel: ({ focused }) => renderTabBarLabel(0, focused)
                }
            },
            VideoComment: {
                screen: VideoComment,
                navigationOptions: {
                    tabBarLabel: ({ focused }) => renderTabBarLabel(1, focused)
                }
            }
        },
        {
            initialRouteName: "VideoIntro",
            tabBarOptions: {
                scrollEnabled: true,
                style: {
                    backgroundColor: "#fff",
                    height: 36,
                    paddingHorizontal: 5
                },
                tabStyle: {
                    width: width / 3.5,
                    paddingHorizontal: 5
                },
                indicatorStyle: {
                    backgroundColor: "#E67F9F",
                    width: 30,
                    marginLeft: 42
                }
            },
        }
    )
)

// 获取总评论的数量
async function getCommentNum() {
    var profileUrl = getVideoDetilUrl(videoData[0])
    videoData[2] = profileUrl
    let response = await fetch(profileUrl)
    let responseJson = await response.json();
    let commentNum = responseJson.data.stat.reply;
    return commentNum;
}
// await必须写在async方法里
async function Numinit() {
    let commentNum = await getCommentNum()
    CmtNum = " " + commentNum;
    return CmtNum
}

function renderTabBarLabel(page, focused) {
    Numinit()
    return <View style={{ flexDirection: "row" }}>
        <Text style={{
            color: focused ? themeColor : "#8a8a8a",
            fontSize: 14,
            alignSelf: "center",
            fontWeight: focused ? "bold" : "normal",
            marginBottom: 9
        }}>
            {VideoLabel[page]}
        </Text>
        <Text style={{
            display: page == 1 ? "flex" : "none",
            color: focused ? themeColor : "#8a8a8a",
            fontSize: 9,
            marginTop: 5,
            marginBottom: 9
        }}>
            {" " + dealNum(CmtNum)}
        </Text>
    </View>

}