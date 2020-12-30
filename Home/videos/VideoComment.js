import React, { Component, PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import { themeColor, videoData, dealTime, dealNum, getStrLength } from '../data';

// 评论信息的最大字符串
var maxLength = 6 * 20
var kongGe = "  "

class ItemView extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            zk: false
        }
    }

    _footItem = () => {
        if (this.props.rcount > 3) {
            return (
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { }}>
                    <Text style={styles.discussName}>共{this.props.rcount}条回复 ></Text>
                </TouchableOpacity>
            )
        }
        return null
    }

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 10, display: this.props.topComment ? "flex" : "none" }}>
                {/* 评论区 */}
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ marginRight: 13 }} onPress={() => { }}>
                        <Image style={{ width: 30, height: 30, borderRadius: 360, resizeMode: "stretch" }} source={{ uri: this.props.headImg }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        {/* 用户信息 */}
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: this.props.vipType == 2 ? themeColor : "#b6b6b6", fontSize: 12 }}>{this.props.uname}</Text>
                            <Image style={{ width: 20, height: 10, marginHorizontal: 5 }} source={levelIcon(this.props.level)} />
                            <Image style={{ width: 18, height: 10, display: this.props.mid == videoData[3] ? "flex" : "none" }} source={require('../images/author.png')} />
                        </View>
                        {/* 发言时间 */}
                        <Text style={{ color: "#b6b6b6", fontSize: 9, marginTop: 3 }}>{dealTime(this.props.ctime)}</Text>
                        {/* 发言文字 */}
                        <View style={{ flexDirection: "row", marginTop: 8, position: "relative" }}>
                            {/* RN0.54以上，安卓手机爆出的问题，在display: none 和 position: absolute同时使用的时候，display:none无效。 */}
                            <Text style={[styles.text_Top, { position: this.props.isTop ? "absolute" : "relative", display: this.props.isTop ? "flex" : "none" }]}>置顶</Text>
                            <Text numberOfLines={this.state.zk ? 40 : 6} style={{ fontSize: 14 }}>{this.props.isTop ? kongGe.repeat(getStrLength("置顶") + 1) : null}{this.props.message}</Text>
                        </View>
                        {/* 文字过多点击展开查看全文 */}
                        <TouchableOpacity style={{ display: getStrLength(this.props.message) > maxLength ? "flex" : "none", marginTop: 10 }}
                            onPress={() => {
                                this.setState({
                                    zk: !this.state.zk
                                })
                            }}>
                            <Text style={{ color: "#4d92cc", fontSize: 12 }}>{this.state.zk ? "收起" : "展开"}</Text>
                        </TouchableOpacity>
                        {/* 点赞、点踩、转发、讨论等操作 */}
                        <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                            {/* 点赞 */}
                            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { }}>
                                <Image style={{ width: 12, height: 12 }} source={require('../images/like_v.png')} />
                                <Text style={{ color: "#757575", fontSize: 9, marginLeft: 2 }}>{dealNum(this.props.like)}</Text>
                            </TouchableOpacity>
                            {/* 点踩 */}
                            <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => { }}>
                                <Image style={{ width: 12, height: 12 }} source={require('../images/dislike_v.png')} />
                            </TouchableOpacity>
                            {/* 转发分享 */}
                            <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => { }}>
                                <Image style={{ width: 14, height: 14 }} source={require('../images/share_v.png')} />
                            </TouchableOpacity>
                            {/* 讨论发言 */}
                            <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => { }}>
                                <Image style={{ width: 14, height: 14 }} source={require('../images/discuss_v.png')} />
                            </TouchableOpacity>
                            {/* 举报or加入黑名单 */}
                            <TouchableOpacity style={{ flex: 1, flexDirection: "row-reverse" }} onPress={() => { }}>
                                <Image style={{ width: 10, height: 10 }} source={require('../images/ellipsis.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ display: this.props.up_like ? "flex" : "none", backgroundColor: "#f4f4f4", padding: 3, width: 60, alignItems: "center", marginTop: 10, borderRadius: 2 }}>
                            <Text style={{ color: "#757575", fontSize: 8 }}>UP主觉得很赞</Text>
                        </View>
                        {/* 评论的评论 */}
                        <FlatList
                            style={{ display: this.props.replies != null ? "flex" : "none", backgroundColor: "#f4f4f4", paddingHorizontal: 10, paddingBottom: 10, marginTop: 10 }}
                            ListFooterComponent={this._footItem}
                            data={this.props.replies}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ position: "relative", flexDirection: "row", marginTop: 10 }}>
                                        <TouchableOpacity style={{ position: "absolute", top: 1 }} onPress={() => { }}>
                                            <Text style={{ fontSize: 12, color: "#4d92cc" }}>{item.member.uname}</Text>
                                        </TouchableOpacity>
                                        <Text numberOfLines={2} style={{ fontSize: 12, paddingVertical: 0, lineHeight: 18 }}>
                                            {kongGe.repeat(getStrLength(item.member.uname) + 1)}{item.content.members.length > 0 ? "" : ": "}{item.content.message}
                                        </Text>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

// 是否是热门评论
let isReplyHot = true
// 评论的页数
var pn = 2
export class VideoComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: [],
            isTop: false,
            topComment: [],
            isReplyHot: true,
            count: 1
        }
    }

    // 获取视频详情页的简介数据
    async getComment(isReplyHot, pn) {
        const param = videoData[0]
        // let commentUrl = 'https://api.bilibili.com/x/v2/reply/main?oid=' + param + '&type=1' 
        let sort = isReplyHot ? 1 : 0
        let commentUrl = 'https://api.bilibili.com/x/v2/reply?oid=' + param + '&type=1&sort=' + sort + "&;pn=" + pn
        let response = await fetch(commentUrl)
        console.log(commentUrl)
        let responseJson = await response.json();
        let comment = responseJson.data;
        return comment;
    }

    // 获取置顶评论
    async getTopComment() {
        const param = videoData[0]
        let topUrl = 'https://api.bilibili.com/x/v2/reply/main?oid=' + param + '&type=1'
        console.log(topUrl)
        let response = await fetch(topUrl)
        let responseJson = await response.json();
        let top = responseJson.data.top;
        return top;
    }

    // await必须写在async方法里
    // 取异步fun()返回值要await
    async init(isReplyHot) {
        let comment = await this.getComment(isReplyHot, 1)
        let topComment = await this.getTopComment()
        this.setState({
            comment: comment.replies,
            topComment: topComment,
            count: comment.page.count
        })
    }

    // 上拉加载
    async _onEndReached() {
        if (pn > Math.ceil(this.state.count / 20))
            return
        let comment = await this.getComment(isReplyHot, pn)
        // 将新数组的数据添加到原来的数组上
        this.setState({
            comment: this.state.comment.concat(comment)
        })
        pn++
    }

    // render()后执行此方法
    // 不能render()中setState，所以要有下面一步
    componentDidMount() {
        // 初始化页面
        this.init(true);
    }

    // 分割线
    _lineComponent = () => {
        return (
            <View style={{ width: "100%", height: 1, backgroundColor: "#f4f4f4" }}></View>
        )
    }

    // 置顶评论
    _renderHead = () => {
        var top_upper = this.state.topComment != null ? (this.state.topComment != null ? this.state.topComment.upper : null) : null
        // 头像
        var topHead = top_upper != null ? top_upper.member.avatar : null
        // 名字
        var topName = top_upper != null ? top_upper.member.uname : null
        // VIP的种类
        var topVipType = top_upper != null ? top_upper.member.vip.vipType : null
        // VIP的等级
        var topLevel = top_upper != null ? top_upper.member.level_info.current_level : null
        // 发布时间
        var topTime = top_upper != null ? top_upper.ctime : null
        // 置顶id
        var topMid = top_upper != null ? top_upper.mid : null
        // 置顶信息
        var topMessage = top_upper != null ? top_upper.content.message : "空"
        // 置顶点赞量
        var topLike = top_upper != null ? top_upper.like : null
        // 置顶评论的回复
        var topComment_cmt = top_upper != null ? top_upper.replies : null
        // 置顶评论的回复总数
        var topRcount = top_upper != null ? top_upper.rcount : null
        return (
            <View style={{ width: "100%" }}>
                {/* 展示评论的顺序，按时间 or 热度 */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13 }}>{this.state.isReplyHot ? "热门评论" : "最新评论"}</Text>
                    {/* TouchableWithoutFeedback只支持一个子节点，如果你希望包含多个子组件，用一个View来包装它们。 */}
                    <TouchableWithoutFeedback style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                        onPress={() => {
                            this.setState({ isReplyHot: !this.state.isReplyHot })
                            // 此时还没有刷新state
                            isReplyHot = !isReplyHot
                            this.init(isReplyHot)
                        }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image style={{ width: 10, height: 11, marginRight: 3, marginLeft: 2 }} source={require('../images/concernlist.png')} />
                            <Text style={{ color: "#b6b6b6", fontSize: 12, textAlign: "center", marginBottom: 2 }}>{this.state.isReplyHot ? "按热度" : "按时间"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <ItemView
                    // 判断置顶评论存不存在
                    topComment={this.state.topComment.upper != null ? true : false}
                    // 评论的回复共有多少条
                    rcount={topRcount}
                    // 评论的评论
                    replies={topComment_cmt}
                    // 发言时间
                    ctime={topTime}
                    // 评论的点赞数有多少
                    like={topLike}
                    // 是否为up主
                    mid={topMid}
                    // 用户的头像
                    headImg={topHead}
                    // 评论的用户名
                    uname={topName}
                    // 用户是否为年度大会员 2为年度大会员 1为大会员 0则不是大会员
                    vipType={topVipType}
                    // 用户的等级
                    level={topLevel}
                    // 评论的信息
                    message={topMessage}
                    // 是否置顶
                    isTop={true}
                />
                <View style={{ display: this.state.topComment.upper != null ? "flex" : "none", width: "100%", height: 1, backgroundColor: "#f4f4f4" }}></View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._renderHead}
                    ItemSeparatorComponent={this._lineComponent}
                    data={this.state.comment}
                    renderItem={({ item }) => {
                        return (
                            <ItemView
                                // 判断置顶评论存不存在
                                topComment={true}
                                // 评论的回复共有多少条
                                rcount={item.rcount}
                                // 评论的评论
                                replies={item.replies}
                                // 发言时间
                                ctime={item.ctime}
                                // 评论的点赞数有多少
                                like={item.like}
                                // 是否为up主
                                mid={item.mid}
                                // 用户的头像
                                headImg={item.member != null ? item.member.avatar : null}
                                // 评论的用户名
                                uname={item.member != null ? item.member.uname : null}
                                // 用户是否为年度大会员 2为年度大会员 1为大会员 0则不是大会员
                                vipType={item.member != null ? item.member.vip.vipType : null}
                                // 用户的等级
                                level={item.member != null ? item.member.level_info.current_level : null}
                                // 评论的信息
                                message={item.content != null ? item.content.message : "空"}
                                // up主有没有觉得很赞
                                up_like={item.up_action != null ? item.up_action.like : null}
                                // 是否置顶
                                isTop={false}
                            />
                        )
                    }}
                    refreshing={true}
                    // 下拉刷新
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => {
                                this.init(isReplyHot)
                            }}
                            colors={[themeColor]}
                        />
                    }
                    // 上拉加载
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={0.3}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

// // 获取当前字符串的长度
// function getStrLength(str) {
//     // 引用正则表达式
//     var cArr = str.match(/[^\x00-\xff]/ig);
//     return str.length + (cArr == null ? 0 : cArr.length);
// }

// 用户的等级图标
function levelIcon(level) {
    switch (level) {
        case 0:
            icon = require('../images/level0.png')
            break;
        case 1:
            icon = require('../images/level1.png')
            break;
        case 2:
            icon = require('../images/level2.png')
            break;
        case 3:
            icon = require('../images/level3.png')
            break;
        case 4:
            icon = require('../images/level4.png')
            break;
        case 5:
            icon = require('../images/level5.png')
            break;
        case 6:
            icon = require('../images/level6.png')
            break;
        default:
            icon = null
            break;
    }
    return icon
}

const styles = StyleSheet.create({
    // 置顶文字
    text_Top: {
        color: themeColor,
        fontSize: 10,
        borderWidth: 0.5,
        borderColor: themeColor,
        borderRadius: 1,
        paddingHorizontal: 3,
        paddingVertical: 0.5,
        top: 2
    },
    // 评论用户的名字
    discussName: {
        fontSize: 12,
        color: "#4d92cc"
    }
})