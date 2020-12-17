import React, { Component } from 'react';
import {
    View, Text, Image, StyleSheet, Dimensions,
    ScrollView, FlatList, TouchableOpacity, RefreshControl
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Swiper from 'react-native-swiper';
import { themeColor } from '../data';
import { VideoPlay } from '../videos/VideoPlay';
import { getRecommendUrl } from '../utils';

// 获取屏幕的宽高
var { width, height } = Dimensions.get('window')

class ItemView extends Component {
    render() {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                this.props.navigation.navigate('VideoPlay', {
                    param: this.props.param
                })
            }}>
                <View style={styles.videoStyle}>
                    <Image source={{ uri: this.props.videoImage }} style={styles.imgStyle} />
                    <View style={{ display: this.props.isCreate ? "none" : "flex", position: "absolute", flexDirection: "row", flex: 1, top: 88, alignItems: "center", paddingHorizontal: 7, backgroundColor: 'rgba(0,0,0,0.03)' }}>
                        <Image source={iconType(this.props.cover_left_icon_1)} style={{ height: 13, width: 13 }} />
                        <Text style={{ color: "#fff", fontSize: 9, marginLeft: 3 }}>{this.props.cover_left_text_1}</Text>
                        <Image source={iconType(this.props.cover_left_icon_2)} style={{ height: 13, width: 13, marginLeft: 10, marginBottom: null }} />
                        <Text style={{ color: "#fff", fontSize: 9, marginLeft: 3 }}>{this.props.cover_left_text_2}</Text>
                        <View style={{ flexDirection: "row-reverse", flex: 1 }}>
                            <Text style={{ color: "#fff", fontSize: 9 }}>{this.props.cover_right_text}</Text>
                        </View>
                    </View>
                    {/* 视频标题 */}
                    <Text numberOfLines={2} style={styles.videoNameStyle}>{this.props.videoName}</Text>
                    {/* 这是视频类条目即视频Tag */}
                    <View style={{ display: this.props.isAd ? "none" : "flex", flexDirection: "row", padding: 7, alignItems: "center" }}>
                        <Text numberOfLines={1}
                            style={{
                                backgroundColor: this.props.isBadeg ? null : "#FFF1ED",
                                color: this.props.isBadeg ? "#FB7299" : "#FF6633",
                                fontSize: 9,
                                alignSelf: "center",
                                textAlign: "center",
                                textAlignVertical: "center",
                                paddingVertical: 1,
                                paddingHorizontal: 3,
                                borderRadius: 2,
                                borderColor: this.props.isBadeg ? "#FB7299" : null,
                                borderWidth: this.props.isBadeg ? 0.5 : 0,
                                display: this.props.recommendReason != null || this.props.isBadeg == true ? "flex" : "none"
                            }}>{this.props.isBadeg ? this.props.item.badge_style.text : this.props.recommendReason}</Text>
                        <Text numberOfLines={1} style={{
                            flex: 1,
                            color: "#bfbfbf",
                            marginLeft: this.props.recommendReason != null || this.props.isBadeg == true ? 5 : 0,
                            fontSize: 12,
                        }}>{this.props.isDesc && this.props.item.desc_button != null ? this.props.item.desc_button.text : this.props.recommendDesc}</Text>
                        <Image source={require('../images/ellipsis.png')} style={{ height: 10, width: 10, marginLeft: 10 }} />
                    </View>
                    {/* 这是广告类条目即视频Tag */}
                    <View style={{ display: this.props.isAd ? "flex" : "none", flexDirection: "row", padding: 7, alignItems: "center" }}>
                        <Text numberOfLines={1}
                            style={{
                                backgroundColor: this.props.isCreate ? "#F4F4F4" : null,
                                color: this.props.isGuangGao || this.props.isCreate ? "#999999" : "#FB7299",
                                fontSize: 9,
                                alignSelf: "center",
                                textAlign: "center",
                                textAlignVertical: "center",
                                paddingVertical: 1,
                                paddingHorizontal: 3,
                                borderRadius: 2,
                                borderColor: this.props.isGuangGao || this.props.isCreate ? "#999999" : "#FB7299",
                                borderWidth: this.props.isCreate ? 0 : 0.5
                            }}>{this.props.ad_info != null ? this.props.item.ad_info.extra.card.ad_tag_style.text : null}</Text>
                        <Text numberOfLines={1} style={{
                            flex: 1,
                            color: "#bfbfbf",
                            marginLeft: 5,
                            fontSize: 12,
                        }}>{this.props.ad_info != null ? this.props.item.ad_info.creative_content.description : null}</Text>
                        <Image source={require('../images/ellipsis.png')} style={{ height: 10, width: 10, marginLeft: 10 }} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

// 是否刷新了
var isRefresh = false
export class RecommendScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoArr: [],
            bannerArr: []
        }
    }
    // 推荐页轮播
    renderBanner = () => {
        if (!isRefresh && this.state.bannerArr != null) {
            return (
                <ScrollView style={{ paddingHorizontal: 3, marginTop: 6, maxHeight: 170 }}>
                    <Swiper
                        style={styles.swiper}
                        key={this.state.bannerArr.length}
                        autoplay
                        showsButtons={false} height={170} autoplayTimeout={3}
                        horizontal={true} dotStyle={styles.dotStyle} loop={true} removeClippedSubviews={true}
                        activeDotStyle={styles.activeDotStyle} paginationStyle={styles.paginationStyle}>
                        {this.state.bannerArr.map((item, index) =>
                            <View key={index}>
                                <Image source={{ uri: item.image }} style={styles.bannerStyle} resizeMode="stretch" />
                                <Text style={styles.bannerTitleStyle}>{item.title}</Text>
                            </View>
                        )}
                    </Swiper>
                </ScrollView>
            )
        } else {
            return null
        }
    }
    // 推荐页视频
    renderRecommendItem = ({ item }) => {
        var isItem = item != null ? item : null
        // 判断是不是广告类
        var isAD = item.ad_info != null && item.ad_info.extra ? true : false
        // 判断是不是广告类条目的广告 = isAD == true && item.ad_info.extra.card.ad_tag_style.text == "广告" ? true : false
        var isGuangGao
        // 判断是不是广告类条目的创作推广 = isAD == true && item.ad_info.extra.card.ad_tag_style.text == "创作推广" ? true : false
        var isCreate
        if (isAD == true) {
            isGuangGao = item.ad_info.extra.card.ad_tag_style.text == "广告" ? true : false
            isCreate = item.ad_info.extra.card.ad_tag_style.text == "创作推广" ? true : false
        } else {
            isGuangGao = false
            isCreate = false
        }
        // 判断是不是视频类条目的推荐视频、已关注
        var isRecm = item.rcmd_reason != null ? true : false
        // 判断是不是视频类条目的番剧、文章、直播
        var isBadeg = item.badge != null ? true : false
        // 判断是否有推荐描述
        var isRcDesc = item.desc != null ? true : false
        // 判断是不是在线观看视频
        var isInline = item.like_button != null ? true : false
        return (
            <ItemView
                navigation={this.props.navigation}
                param={item.param}
                item={isItem}
                isAd={isAD}
                isBadeg={isAD == true || isBadeg == false ? false : true}
                ad_info={isAD ? item.ad_info : null}
                isDesc={isAD == true || isRecm == true || isInline == true ? false : true}
                isGuangGao={isAD == false || isGuangGao == false ? false : true}
                // 创作推广
                isCreate={isAD == false || isCreate == false ? false : true}
                videoImage={isAD ? item.ad_info.creative_content.image_url : item.cover}
                videoName={isAD ? item.ad_info.creative_content.title : item.title}
                recommendReason={isAD == true || isRecm == false ? null : item.rcmd_reason}
                recommendDesc={isAD == true || isRcDesc == false ? null : item.desc}
                cover_left_icon_1={isAD ? null : item.cover_left_icon_1}
                cover_left_icon_2={isAD ? null : item.cover_left_icon_2}
                // 播放量
                cover_left_text_1={isAD ? null : item.cover_left_text_1}
                // 弹幕数
                cover_left_text_2={isAD ? null : item.cover_left_text_2}
                // 视频时长
                cover_right_text={isAD ? null : item.cover_right_text}
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, padding: 3 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={this.renderBanner}
                        initialNumToRender={8}
                        numColumns={2}
                        data={this.state.videoArr}
                        renderItem={this.renderRecommendItem}
                        // 下拉刷新
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={() => {
                                    this.init()
                                    isRefresh = true
                                }}
                                colors={[themeColor]}
                            />
                        }
                        // 上拉加载
                        onEndReached={this._onEndReached.bind(this)}
                        onEndReachedThreshold={0.3}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
        )
    }

    // 获取推荐页数据
    async getRecommend() {
        console.log("当前时间戳秒板"+new Date().getTime())
        let response = await fetch(getRecommendUrl())
        let responseJson = await response.json();
        let recommend = responseJson.data.items;
        return recommend;
    }

    // await必须写在async方法里
    async init() {
        let recommend = await this.getRecommend()
        let bannerArr = recommend[0].banner_item // 轮播数据
        recommend.splice(0, 1) //视频数据
        // 如果页面没被刷新过，才需要设置轮播数据
        if (!isRefresh) {
            this.setState({
                bannerArr: bannerArr
            })
        }
        this.setState({
            videoArr: recommend,
        });
    }

    // 上拉加载
    async _onEndReached() {
        let recommend = await this.getRecommend()
        recommend.splice(0, 1) //视频数据
        // 将新数组的数据添加到原来的数组上
        this.setState({
            videoArr: this.state.videoArr.concat(recommend)
        })
    }

    componentDidMount() {
        // 初始化页面
        this.init();
    }
}

function iconType(icon_id) {
    switch (icon_id) {
        case 1:
            icon = require('../images/broadcastnum.png')
            break;
        case 2:
            icon = require('../images/audience.png')
            break;
        case 3:
            icon = require('../images/barragenum.png')
            break;
        case 4:
            icon = require('../images/collectnum.png')
            break;
        // case 5:
        //     icon = require('../images/collectnum.png')
        //     break;
        case 6:
            icon = require('../images/readnum.png')
            break;
        case 7:
            icon = require('../images/discussnum.png')
            break;
        default:
            icon = null
            break;
    }
    return icon
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#dcdcdc"
    },
    swiper: {
        borderRadius: 6
    },
    bannerStyle: {
        width: "100%",
        height: 170,
        borderRadius: 3,
    },
    bannerTitleStyle: {
        width: "100%",
        height: 17,
        fontSize: 12,
        position: "absolute",
        bottom: 6,
        left: 6,
        color: "#fff",
        fontWeight: "bold",
        backgroundColor: 'rgba(0,0,0,0.03)'
    },
    dotStyle: {
        width: 4,
        height: 4,
        backgroundColor: '#fff',
        opacity: 0.6,
        borderRadius: 2,
    },
    activeDotStyle: {
        width: 4,
        height: 4,
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    paginationStyle: {
        bottom: 6,
        left: null,
        right: 8
    },
    videoStyle: {
        flex: 1,
        marginTop: 5,
        backgroundColor: "#fff",
        borderRadius: 3,
        marginHorizontal: 3
    },
    imgStyle: {
        width: "100%",
        height: 105,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        resizeMode: "stretch"
    },
    videoNameStyle: {
        paddingHorizontal: 7,
        marginTop: 7,
        color: "#4d4d4d",
        fontSize: 14,
        flex: 1,
        textAlign: "left"
    }
})

// 路由器
export const RecommendStack = createAppContainer(
    createStackNavigator(
        {
            Recommend: { screen: RecommendScreen },
            VideoPlay: { screen: VideoPlay }
        },
        {
            defaultNavigationOptions: {
                headerShown: false
            }
        }
    )
);

RecommendStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};