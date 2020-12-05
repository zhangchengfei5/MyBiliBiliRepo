import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { themeColor } from '../data';

export class VideoComment extends Component {
    render() {
        console.log(getStrLength('月明初上浪东楼') + "字符串长度")
        return (
            <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
                {/* 展示评论的顺序，按时间 or 热度 */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13 }}>热门评论</Text>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} onPress={() => { }}>
                        <Image style={{ width: 10, height: 11, marginRight: 3, marginLeft: 2 }} source={require('../images/concernlist.png')} />
                        <Text style={{ color: "#b6b6b6", fontSize: 12, textAlign: "center", marginBottom: 2 }}>按热度</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, paddingVertical: 10 }}>
                    {/* 评论区 */}
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ marginRight: 13 }} onPress={() => { }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../images/headimage.jpg')} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            {/* 用户信息 */}
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ color: themeColor, fontSize: 12 }}>总之就是非常可爱</Text>
                                <Image style={{ width: 20, height: 10, marginHorizontal: 5 }} source={require('../images/level5.png')} />
                                <Image style={{ width: 18, height: 10 }} source={require('../images/author.png')} />
                            </View>
                            {/* 发言时间 */}
                            <Text style={{ color: "#b6b6b6", fontSize: 9, marginTop: 3 }}>11-26</Text>
                            {/* 发言文字 */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                <Text style={styles.text_Top}>置顶</Text>
                                <Text style={{ fontSize: 14 }}>本次放送官方第七话</Text>
                            </View>
                            {/* 点赞、点踩、转发、讨论等操作 */}
                            <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                                {/* 点赞 */}
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { }}>
                                    <Image style={{ width: 12, height: 12 }} source={require('../images/like_v.png')} />
                                    <Text style={{ color: "#757575", fontSize: 9, marginLeft: 2 }}>1470</Text>
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
                            {/* 评论的评论 */}
                            <View style={{ backgroundColor: "#f4f4f4", paddingHorizontal: 10, paddingBottom: 10, marginTop: 10 }}>
                                <View style={{ position:"relative",flexDirection: "row", marginTop: 10,borderWidth: 1, borderColor: "#bfa", }}>
                                    <TouchableOpacity style={{  position:"absolute",borderWidth: 1, borderColor: "#bfa",top:0,left:0 }} onPress={() => { }}>
                                        <Text style={{ fontSize: 12, color: "#4d92cc" }}>月明初上浪东楼</Text>
                                    </TouchableOpacity>
                                    <Text numberOfLines={2} style={{ marginLeft:getStrLength("月明初上浪东楼")*6.2,fontSize: 12, paddingVertical: 0,borderWidth: 1, borderColor: "#bfa", }}>
                                        : 再给我两分钟，让我把记忆结成冰，别融化了眼泪，你妆都花了要我怎么记得，记得你叫我忘了吧，记得你叫我忘了吧啊~，你说你会哭，不是因为在乎
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Text style={styles.discussName}>不喝奶茶喝果茶</Text>
                                    </TouchableOpacity>
                                    <Text numberOfLines={2} style={{ fontSize: 12 }}>: 看不见你的笑我怎么睡得着</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Text style={styles.discussName}>昨日青空</Text>
                                    </TouchableOpacity>
                                    <Text numberOfLines={2} style={{ fontSize: 12 }}>: 难过是因为闷了很久，是因为想了太多</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {/* 分割线 */}
            </View>
        )
    }
}

// 获取当前字符串的长度
function getStrLength(str) {
    // 引用正则表达式
    var cArr = str.match(/[^\x00-\xff]/ig);
    return str.length + (cArr == null ? 0 : cArr.length);
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
        marginRight: 3
    },
    // 评论用户的名字
    discussName: {
        fontSize: 12,
        color: "#4d92cc"
    }
})