import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, ToastAndroid, DeviceEventEmitter } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { LivingScreen } from '../first/LivingScreen';
import { RecommendStack } from '../first/RecommendScreen';
import { HotScreen } from '../first/HotScreen';
import { AnimationScreen } from '../first/AnimationScreen';

// 获取屏幕的宽高
var { width } = Dimensions.get('window')
var FirstLabel = ["直播", "推荐", "热门", "追番"];

export class FirstScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            searchHide: false
        }
    }
    // render()后执行此方法
    componentDidMount() {
        // 设置监听
        this.subscription = DeviceEventEmitter.addListener('showBar', (message) =>
            this.setState({ searchHide: message }))
    }

    // 卸载后执行此方法
    componentWillUnmount() {
        // 移除监听
        this.subscription.remove();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={{ display: this.state.searchHide ? "none" : "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 30, marginTop: 3, paddingHorizontal: 5 }}>
                    <TouchableOpacity onPress={() => { ToastAndroid.show("请先登录", ToastAndroid.SHORT) }}>
                        <Image source={require('../images/headimage.jpg')} style={{ width: 30, height: 30, borderRadius: 15, marginTop: 3 }} />
                    </TouchableOpacity>
                    <View style={{
                        backgroundColor: '#dcdcdc', borderRadius: 12, marginHorizontal: 8, flexDirection: "row",
                        marginTop: 3, flex: 1
                    }}>
                        <Image source={require('../images/bdf.png')} style={{ width: 20, height: 20, alignSelf: "center" }} />
                        <TextInput style={{ fontSize: 13, padding: 3, maxHeight: 24, flex: 1 }}
                            onChangeText={(text) => {
                                this.setState({
                                    search: text
                                })
                            }} />
                    </View>
                    <TouchableOpacity onPress={() => { }}>
                        <Image source={require('../images/game.png')} style={{ width: 24, height: 24, marginTop: 3, marginRight: 8 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Image source={require('../images/mail.png')} style={{ width: 22, height: 22, marginTop: 3 }} />
                    </TouchableOpacity>
                </View>
                <FirstTab />
            </View>
        )
    }
}

const FirstTab = createAppContainer(
    createMaterialTopTabNavigator(
        {
            Living: {
                screen: LivingScreen,
                navigationOptions: {
                    tabBarLabel: ({ focused }) => renderTabBarLabel(0, focused)
                }
            },
            Recommend: {
                screen: RecommendStack,
                navigationOptions: {
                    tabBarLabel: ({ focused }) => renderTabBarLabel(1, focused)
                }
            },
            Hot: {
                screen: HotScreen,
                navigationOptions: {
                    tabBarLabel: ({ focused }) => renderTabBarLabel(2, focused)
                }
            },
            Animation: {
                screen: AnimationScreen,
                navigationOptions: {
                    tabBarLabel: ({ focused }) => renderTabBarLabel(3, focused)
                }
            },
        },
        {
            initialRouteName: "Recommend",
            tabBarOptions: {
                scrollEnabled: true,
                style: {
                    backgroundColor: "transparent",
                    height: 40,
                },
                tabStyle: {
                    width: width / 4,
                },
                indicatorStyle: {
                    backgroundColor: "#E67F9F",
                }
            }
        }
    )
)

FirstTab.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};

function renderTabBarLabel(page, focused) {
    return <Text style={{
        color: focused ? "#E67F9F" : "#8a8a8a",
        fontSize: 15,
        alignSelf: "center",
        fontWeight: focused ? "bold" : "normal"
    }}>
        {FirstLabel[page]}
    </Text>
}