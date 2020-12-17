import React, { Component } from 'react';
import { View, Text, Image, DeviceEventEmitter, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { VideoIntro } from './VideoIntro';
import { VideoComment } from './VideoComment';
import { themeColor, videoData } from '../data';
import { getVideoDetilUrl } from '../utils';

// 获取屏幕的宽度
var { width } = Dimensions.get('window')
// 加评论总数，数据为：data.stat.reply
var VideoLabel = ["简介", "评论"];

export class VideoPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barrage: "",
            on: true
        }
    }
    componentDidMount() {
        // 发送消息给首页
        DeviceEventEmitter.emit('searchHide', true)
    }
    render() {
        // 获取上个页面传递过来的参数，并打印查看
        const param = this.props.navigation.state.params.param
        profileUrl = getVideoDetilUrl(param)
        videoData[0] = profileUrl
        videoData[1] = param
        return (
            <View style={{ flex: 1 }}>
                <Video
                    style={{ height: "30%", width: "100%" }}
                    source={require('./1.mp4')}
                    paused={true} // 默认为false不暂停播放，true为暂停播放
                    rate={1.0} // 视频播放速度 1为以正常速度播放 0为暂停播放
                    controls={true} // 显示控制器
                    resizeMode="contain"
                />
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

function renderTabBarLabel(page, focused) {
    return <Text style={{
        color: focused ? themeColor : "#8a8a8a",
        fontSize: 14,
        alignSelf: "center",
        fontWeight: focused ? "bold" : "normal",
        marginBottom: 9
    }}>
        {VideoLabel[page]}
    </Text>
}