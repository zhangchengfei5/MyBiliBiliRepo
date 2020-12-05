import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import moment from 'moment';
import { themeColor, videoData, tag } from '../data';

class ItemView extends Component {
    render() {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { }}>
                <View style={{ flex: 1, marginTop: 5 }}>
                    {/* 推荐视频列表 */}
                    <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                        <Image style={{ width: 100, height: 60, alignSelf: "center", borderRadius: 10, resizeMode: "stretch" }} source={{ uri: this.props.videoImg }} />
                        {/* 视频or番剧信息（标题、播放量等） */}
                        <View style={{ paddingHorizontal: 10, flex: 1 }}>
                            <Text numberOfLines={2} style={{ fontSize: 13, color: "#000", flex: 1 }}>{this.props.videoTitle}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={{ width: 15, height: 15 }} source={require('../images/up_video.png')} />
                                <Text style={style.videoIntroText}>{this.props.upName}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={{ width: 15, height: 15 }} source={require('../images/bdn_v.png')} />
                                <Text style={style.videoIntroText}>{this.props.broadcastnum}</Text>
                                <Image style={{ width: 15, height: 15, marginLeft: 10 }} source={require('../images/ban_v.png')} />
                                <Text style={style.videoIntroText}>{this.props.barragenum}</Text>
                                <View style={{ flexDirection: "row-reverse", flex: 1 }}>
                                    <Image style={{ width: 10, height: 10 }} source={require('../images/ellipsis_v.png')} />
                                </View>
                            </View>
                        </View>
                        {/* 视频or番剧的评分等 */}
                        {/* <View>
                            <Text style={{ color: "#F3B545", fontSize: 18 }}>
                                8.7<Text style={{ color: "#F3B545", fontSize: 11 }}>分</Text>
                            </Text>
                        </View> */}
                    </View>
                    {/* 分割线 */}
                    <View style={{ width: "100%", height: 1, backgroundColor: "#f4f4f4" }}></View>
                </View>
            </TouchableOpacity>
        )
    }
}

var profileUrl = ""

export class VideoIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConcern: false,
            isOpen: false,
            isOpenTag: false,
            profile_part0: [],
            profile_part1: [],
            profile_part2: [],
            profile_part3: [],
            tag: [],
            sanlian: [0, 0, 0, 0, 0],
            isSanLian: false,
            isShowCircle: false
        }
    }

    // 获取视频详情页的简介数据
    async getProfile() {
        let response = await fetch(videoData[0])
        let responseJson = await response.json();
        let profile = responseJson.data;
        return profile;
    }

    // await必须写在async方法里
    // 取异步fun()返回值要await
    async init() {
        let profile = await this.getProfile()
        // 0是up name,1是up 头像,2是 up 粉丝,3是 title,4是评论数,5是简介
        var profile_part0 = [profile.owner.name, profile.owner.face, profile.owner_ext.fans, profile.title, profile.stat.reply, profile.desc]
        // 0 播放量，1 弹幕数量,2 发布日期,3 BV号,4 copyright
        var profile_part1 = [profile.stat.view, profile.stat.danmaku, profile.pubdate, profile.bvid, profile.copyright]
        // 0 点赞数，1 点踩数，2 投币数，3 收藏数，4 分享数
        var profile_part2 = [profile.stat.like, profile.dislike, profile.stat.coin, profile.stat.favorite, profile.stat.share]
        // 推荐视频数据
        var profile_part3 = profile.relates
        // Tag
        var tag = profile.tag
        this.setState({
            profile_part0: profile_part0,
            profile_part1: profile_part1,
            profile_part2: profile_part2,
            profile_part3: profile_part3,
            tag: tag
        })
    }

    // render()后执行此方法
    // 不能render()中setState，所以要有下面一步
    componentDidMount() {
        // 初始化页面
        this.init();
    }

    // 视频详情信息
    renderIntro = () => {
        var data = [
            { icon: require('../images/like0.png'), icon_h: require('../images/like1.png'), text: dealNum(this.state.profile_part2[0] + this.state.sanlian[0]) },
            { icon: require('../images/dislike0.png'), icon_h: require('../images/dislike1.png'), text: "不喜欢" },
            { icon: require('../images/coin0.png'), icon_h: require('../images/coin1.png'), text: dealNum(this.state.profile_part2[2] + this.state.sanlian[2]) },
            { icon: require('../images/collect0.png'), icon_h: require('../images/collect1.png'), text: dealNum(this.state.profile_part2[3] + this.state.sanlian[3]) },
            { icon: require('../images/share0.png'), icon_h: require('../images/share1.png'), text: dealNum(this.state.profile_part2[4] + this.state.sanlian[4]) },
        ]
        return (
            <View>
                {/* Up主信息 */}
                <View style={style.upIntro}>
                    <TouchableOpacity onPress={() => { }}>
                        <Image style={{ width: 30, height: 30, borderRadius: 3600, resizeMode: "stretch" }} source={{ uri: this.state.profile_part0[1] }} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 8, flex: 1 }}>
                        <Text style={{ fontSize: 12, color: themeColor }}>{this.state.profile_part0[0]}</Text>
                        <Text style={{ fontSize: 10, color: "#919191", marginTop: 3 }}>{dealNum(this.state.profile_part0[2]) + "粉丝"}</Text>
                    </View>
                    {/* 点击关注和取消关注 */}
                    <TouchableOpacity style={{
                        flexDirection: "row",
                        width: 60,
                        height: 22,
                        borderRadius: 4,
                        backgroundColor: this.state.isConcern ? "#e7e7e7" : themeColor,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                        onPress={() => {
                            if (!this.state.isConcern) {
                                this.setState({
                                    isConcern: true
                                })
                            } else {
                                this.setState({
                                    isConcern: false
                                })
                            }
                        }}>
                        <Image style={[this.state.isConcern ? { width: 9, height: 9 } : { width: 11, height: 11 }, { marginRight: 3, marginLeft: 2 }]} source={this.state.isConcern ? require('../images/concernlist.png') : require('../images/concern_add.png')} />
                        <Text style={{
                            fontSize: 13,
                            color: this.state.isConcern ? "#9a9a9a" : "#fff",
                            maxHeight: 22,
                            marginRight: 2
                        }}>{this.state.isConcern ? "已关注" : "关注"}</Text>
                    </TouchableOpacity>
                </View>
                {/* 视频标题和简介等 */}
                <View style={{ width: "100%" }}>
                    <View style={{
                        flexDirection: "row",
                        paddingVertical: 5
                    }}>
                        <Text numberOfLines={this.state.isOpen ? 5 : 1} style={{ flex: 1, fontSize: 14, color: "#000", marginRight: 10 }}>{this.state.profile_part0[3]}</Text>
                        {/* 展开或缩放简介 */}
                        <TouchableOpacity
                            style={{ top: 6 }}
                            onPress={() => {
                                if (!this.state.isOpen) {
                                    this.setState({
                                        isOpen: true
                                    })
                                } else {
                                    this.setState({
                                        isOpen: false
                                    })
                                }
                            }}>
                            <Image style={{ width: 15, height: 9 }} source={this.state.isOpen ? require('../images/shrink.png') : require('../images/open.png')} />
                        </TouchableOpacity>
                    </View>
                    {/* 视频数据 */}
                    <View style={{
                        flexDirection: "row",
                        paddingVertical: 5,
                        alignItems: "center"
                    }}>
                        <Image style={{ width: 15, height: 15 }} source={require('../images/bdn_v.png')} />
                        <Text style={style.videoIntroText}>{dealNum(this.state.profile_part1[0])}</Text>
                        <Image style={{ width: 15, height: 15, marginLeft: 10 }} source={require('../images/ban_v.png')} />
                        <Text style={style.videoIntroText}>{dealNum(this.state.profile_part1[1])}</Text>
                        <Text style={[style.videoIntroText, { marginLeft: 10 }]}>{dealTime(this.state.profile_part1[2])}</Text>
                        <Text style={[style.videoIntroText, { marginLeft: 10 }]}>{this.state.profile_part1[3]}</Text>
                    </View>
                    {/* 视频简介 */}
                    <View style={{ display: this.state.isOpen ? "flex" : "none" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={{ width: 15, height: 15 }} source={require('../images/ban.png')} />
                            <Text style={style.videoIntroText}>未经作者授权禁止转载</Text>
                        </View>
                        <Text style={{ color: "#b6b6b6", fontSize: 11, marginTop: 6 }}>{this.state.profile_part0[5]}</Text>
                    </View>
                    {/* 点赞、投币、收藏等按钮 */}
                    <View style={{ flexDirection: "row", marginTop: 10, paddingVertical: 10, width: "100%" }}>
                        {data.map((item, index) => {
                            var iconSource
                            if (index == 0)
                                iconSource = this.state.isSanLian ? item.icon_h : item.icon
                            else
                                iconSource = this.state.isShowCircle ? item.icon_h : item.icon
                            return (
                                <View key={index} style={{ flex: 1, alignItems: "center" }}>
                                    <TouchableOpacity style={{ alignItems: "center" }}
                                        // 点赞、投币、收藏等数量+1
                                        onPress={() => {
                                            if (this.state.sanlian[index] < 1) {
                                                var arr0 = this.state.sanlian
                                                arr0[index] = this.state.sanlian[index] + 1
                                                this.setState({ sanlian: arr0 })
                                            } else {
                                                var arr1 = this.state.sanlian
                                                arr1[index] = this.state.sanlian[index] - 1
                                                this.setState({ sanlian: arr1 })
                                            }
                                        }}
                                        onLongPress={() => {
                                            if (index == 0) {
                                                this.setState({ isSanLian: true })
                                            }
                                        }}
                                        activeOpacity={1}
                                    >
                                        {/* <Svg style={{ marginTop: -26, position: "relative", top: 25, opacity: index == 2 || index == 3 ? 1 : 0 }} width={30} height={30}>
                                            <Circle cx={15} cy={15} r={11} stroke={themeColor} strokeWidth={1} />
                                        </Svg> */}
                                        <Image style={{ width: 20, height: 20 }} source={this.state.sanlian[index] == 1 ? item.icon_h : item.icon} />
                                        <Text style={style.likeText}>{item.text}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </View>
                {/* 分割线 */}
                <View style={{ width: "100%", height: 1, backgroundColor: "#f4f4f4" }}></View>
                {/* 视频Tag */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap", overflow: "hidden" }}>
                        {this.state.tag.map((item, index) =>
                            <TouchableOpacity key={index} style={[style.tag_btn, index > 2 ? { display: this.state.isOpenTag ? "flex" : "none" } : { display: "flex" }]} onPress={() => { }}>
                                <Text numberOfLines={1} style={{ fontSize: 11, color: item.tag_type == "common" ? "#000" : themeColor }}>{item.tag_name}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ flexDirection: "row", alignSelf: "flex-start", marginTop: 14 }}>
                        <Text style={{ display: this.state.isOpenTag ? "none" : "flex", fontSize: 11, color: "#b6b6b6", marginRight: 10 }}>更多{this.state.tag.length - 3}个</Text>
                        {/* 展开或缩放简介 */}
                        <TouchableOpacity
                            style={{ top: 4 }}
                            onPress={() => {
                                if (!this.state.isOpenTag) {
                                    this.setState({
                                        isOpenTag: true
                                    })
                                } else {
                                    this.setState({
                                        isOpenTag: false
                                    })
                                }
                            }}>
                            <Image style={{ width: 15, height: 9 }} source={this.state.isOpenTag ? require('../images/shrink.png') : require('../images/open.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        console.log(videoData[0])
        return (
            <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 }}>
                {/* 推荐视频列表 */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this.renderIntro}
                    data={this.state.profile_part3}
                    // data={[
                    //     { videoName: "串烧周杰伦46首歌曲!来寻找属于你的回忆 | 吉他弹唱", videoImage: require('../images/video1.png'), recommendReason: "8千点赞", broadcastnum: "1.2万", barragenum: "753", videoTime: "3:24", key: "0" },
                    //     { videoName: "【钢琴】 当商场里响起secret base ～君がくれたもの～", videoImage: require('../images/video2.png'), recommendReason: "已关注", broadcastnum: "43.2万", barragenum: "3542", videoTime: "6:53", key: "1" },
                    //     { videoName: "厨师长教你：“红烧鸡腿肉”的家常做法，只需要电饭锅就行", videoImage: require('../images/video3.png'), recommendReason: "3万点赞", broadcastnum: "97.8万", barragenum: "1.8万", videoTime: "13:13", key: "2" },
                    //     { videoName: "减肥成为全校最帅，只为向初恋复仇", videoImage: require('../images/video4.png'), recommendReason: "番剧", broadcastnum: "463.6万", barragenum: "3.4万", videoTime: "", key: "3" },
                    //     { videoName: "感谢陪伴|21计算机考研|雨声|13小时", videoImage: require('../images/video5.png'), recommendReason: "直播", broadcastnum: "12.3万", barragenum: "2.7万", videoTime: "做到了吗-", key: "4" },
                    //     { videoName: "【Animenz】unravel   钢琴版", videoImage: require('../images/video6.png'), recommendReason: "已关注", broadcastnum: "1051.6万", barragenum: "23万", videoTime: "3:52", key: "5" }
                    // ]}
                    renderItem={({ item }) => {
                        return (
                            <ItemView
                                videoImg={item.pic}
                                videoTitle={item.title}
                                upName={item.owner.name}
                                broadcastnum={item.stat.view}
                                barragenum={item.stat.danmaku}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                {/* </View> */}
            </View>
        )
    }
}

var dealNum = (num) => {
    // 保留小数点后一位
    var numWan = (num / 10000).toFixed(1)
    // 处理32.0的情况
    var arr = numWan.toString().split(".")
    var wan = arr[1] == 0 ? parseInt(num / 10000) : (num / 10000).toFixed(1)
    return (num / 10000 >= 1 ? wan + "万" : num)
}

var dealTime = (time) => {
    console.log(time)
    var diff_m = moment().diff(moment(time * 1000), "minutes")
    var diff_h = moment().diff(moment(time * 1000), "hours")
    var diff_d = moment().diff(moment(time * 1000), "days")
    // 昨天零点的时间戳
    var yestoday = moment().startOf("day") - 1000 * 60 * 60 * 24
    console.log(diff_d)
    var t = ""
    if (diff_m < 60) {
        t = diff_m + "分钟前"
    } else if (diff_h < 24) {
        t = diff_h + "小时前"
    } else if (time * 1000 >= yestoday) {
        t = "昨天"
    } else {
        t = moment(time * 1000).format("MM-DD")
    }
    return t
}

const style = StyleSheet.create({
    // UP主信息
    upIntro: {
        flexDirection: "row",
        paddingVertical: 10,
        alignItems: "center",
        // borderWidth: 1, borderColor: "#bfa",
    },
    // 视频简介等文字
    videoIntroText: {
        marginLeft: 5,
        color: "#b6b6b6",
        fontSize: 11
    },
    // 点赞、投币等按钮下方的文字
    likeText: {
        color: "#b6b6b6",
        fontSize: 9,
        marginTop: 5,
        // marginLeft: -3
    },
    tag_btn: {
        backgroundColor: "#f4f4f4",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginTop: 10,
        marginRight: 10
    }
})