import React, { Component,PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import { themeColor, videoData, dealNum, dealTime } from '../data';

class ItemView extends PureComponent {
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
                                <Text style={style.videoIntroText}>{dealNum(this.props.broadcastnum)}</Text>
                                <Image style={{ width: 15, height: 15, marginLeft: 10 }} source={require('../images/ban_v.png')} />
                                <Text style={style.videoIntroText}>{dealNum(this.props.barragenum)}</Text>
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

const circleLen = Math.ceil(2 * Math.PI * 11)

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
            tag_icon: [],
            sanlian: [0, 0, 0, 0, 0],
            isSanLian: false,
            isShowCircleEnd: false,
            offset: circleLen
        }
    }

    // 一键三连动画方法
    sanlianPress() {
        var offset = circleLen
        this.timer = setInterval(() => {
            offset = offset - 4
            this.setState({
                offset: offset
            })
            if (offset < -2) {
                // 清除定时器
                this.timer && clearInterval(this.timer);
                // 动画结束隐藏圈圈
                this.setState({ isShowCircleEnd: true })
                return
            }
        }, 10)
    }

    // 获取视频详情页的简介数据
    async getProfile() {
        let response = await fetch(videoData[2])
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
        // Tag的图标
        var tag_icon = profile.t_icon
        // 作者的id
        videoData[3] = profile.owner.mid
        this.setState({
            profile_part0: profile_part0,
            profile_part1: profile_part1,
            profile_part2: profile_part2,
            profile_part3: profile_part3,
            tag: tag,
            tag_icon: tag_icon
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
                            // 判断是否三连了
                            if (this.state.isSanLian) {
                                // 三连后的图标处理方式
                                if (index == 0)
                                    iconSource = item.icon_h
                                else if (index == 2 || index == 3)
                                    iconSource = this.state.isShowCircleEnd ? item.icon_h : item.icon
                                else
                                    iconSource = item.icon
                            } else {
                                // 三连前的图标处理方式
                                iconSource = this.state.sanlian[index] > 0 ? item.icon_h : item.icon
                            }
                            return (
                                <View key={index} style={{ flex: 1, alignItems: "center" }}>
                                    <TouchableOpacity style={{ alignItems: "center" }}
                                        // 点赞、投币、收藏等数量+1
                                        onPress={() => {
                                            // 当三连后
                                            if (this.state.isSanLian) {
                                                var arr0 = this.state.sanlian
                                                if (index == 0 || index == 2 || index == 3) {
                                                    if (arr0[index] < 1) {
                                                        arr0[index] = this.state.sanlian[index] + 1
                                                        this.setState({ sanlian: arr0 })
                                                    } else {
                                                        // 点了之后图标变灰取消三连状态
                                                        arr0[index] = this.state.sanlian[index] - 1
                                                        this.setState({ sanlian: arr0, isSanLian: false })
                                                    }
                                                } else {
                                                    if (arr0[index] < 1) {
                                                        arr0[index] = this.state.sanlian[index] + 1
                                                        this.setState({ sanlian: arr0 })
                                                    } else {
                                                        arr0[index] = this.state.sanlian[index] - 1
                                                        this.setState({ sanlian: arr0 })
                                                    }
                                                }
                                            } else {
                                                // 当还没三连
                                                var arr1 = this.state.sanlian
                                                if (this.state.sanlian[index] < 1) {
                                                    var arr1 = this.state.sanlian
                                                    arr1[index] = this.state.sanlian[index] + 1
                                                    this.setState({ sanlian: arr1 })
                                                } else {
                                                    arr1[index] = this.state.sanlian[index] - 1
                                                    this.setState({ sanlian: arr1 })
                                                }
                                            }
                                        }}
                                        // 长按一键三连
                                        onLongPress={async () => {
                                            if (!this.state.isSanLian) {
                                                if (index == 0) {
                                                    await this.sanlianPress()
                                                    var arr2 = this.state.sanlian
                                                    arr2[0] = this.state.sanlian[0] + 1
                                                    arr2[2] = this.state.sanlian[2] + 1
                                                    arr2[3] = this.state.sanlian[3] + 1
                                                    this.setState({
                                                        isSanLian: true,
                                                        sanlian: arr2
                                                    })
                                                }
                                            }
                                        }}
                                        // 取消点击时一开始的透明化
                                        activeOpacity={1}
                                    >
                                        <Svg style={{ marginTop: -26, position: "relative", top: 25, opacity: index == 2 || index == 3 ? 1 : 0 }} width={30} height={30}>
                                            <Circle
                                                cx={15} cy={15} r={11}
                                                stroke={this.state.isShowCircleEnd ? "transparent" : themeColor}
                                                strokeWidth={1}
                                                strokeDasharray={circleLen}
                                                strokeDashoffset={this.state.offset}
                                            />
                                        </Svg>
                                        <Image style={{ width: 20, height: 20 }} source={iconSource} />
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
                            <TouchableOpacity key={index} style={[style.tag_btn, index > 0 ? { display: this.state.isOpenTag ? "flex" : "none" } : { display: "flex" }]} onPress={() => { }}>
                                <Image style={{ marginRight: 3, width: 10, height: 10, display: item.tag_type == "common" ? "none" : "flex" }}
                                    source={{ uri: item.tag_type == "new" ? this.state.tag_icon.new.icon : this.state.tag_icon.act.icon }}
                                />
                                <Text numberOfLines={1} style={{ fontSize: 11, color: item.tag_type == "common" ? "#000" : themeColor }}>{item.tag_name}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ display: this.state.tag.length > 2 ? "flex" : "none", flexDirection: "row", alignSelf: "flex-start", marginTop: 14 }}>
                        <Text style={{ display: this.state.isOpenTag ? "none" : "flex", fontSize: 11, color: "#b6b6b6", marginRight: 10 }}>更多{this.state.tag.length - 1}个</Text>
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
        console.log(videoData[2])
        return (
            <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 }}>
                {/* 推荐视频列表 */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this.renderIntro}
                    data={this.state.profile_part3}
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
            </View>
        )
    }
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
    // tag按钮的样式
    tag_btn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginTop: 10,
        marginRight: 10
    }
})