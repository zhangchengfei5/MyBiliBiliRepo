import React, { Component } from 'react';
import {
    View, Text, Image, StyleSheet, Dimensions,
    ScrollView, FlatList, TouchableOpacity, PixelRatio
} from 'react-native';
import Swiper from 'react-native-swiper';
import { recommendList } from '../data';
import { TabBarItem } from 'react-native-tab-view';
// 获取屏幕的宽高
var { width, height } = Dimensions.get('window')
var that;

class ItemView extends Component {
    render() {
        return (
            <TouchableOpacity style={{flex:1}} onPress={()=>{}}>
                <View style={styles.videoStyle}>
                    {/* this.props.ad_info != null ? this.props.item.ad_info.creative_content.image_url : this.props.videoImage */}
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
                    {/* this.props.ad_info != null ? this.props.item.ad_info.creative_content.title : this.props.videoName */}
                    <Text numberOfLines={2} style={styles.videoNameStyle}>{this.props.videoName}</Text>
                    {/* 这是视频类条目 */}
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
                        }}>{this.props.isDesc && this.props.item.desc_button.text != null ? this.props.item.desc_button.text : this.props.recommendDesc}</Text>
                        <Image source={require('../images/ellipsis.png')} style={{ height: 10, width: 10, marginLeft: 10 }} />
                    </View>
                    {/* 这是广告类条目 */}
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

export class RecommendScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoArr: [],
            bannerArr: []
        }
    }
    renderBanner=()=>{
        return(
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
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, padding: 3 }}>
                    <FlatList
                        ListHeaderComponent={this.renderBanner}
                        initialNumToRender={8}
                        numColumns={2}
                        data={this.state.videoArr}
                        renderItem={({ item }) => {
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
                                    item={isItem}
                                    isAd={isAD}
                                    isBadeg={isAD == true || isBadeg == false ? false : true}
                                    ad_info={isAD ? item.ad_info : null}
                                    isDesc={isAD == true || isRecm == true || isInline == true ? false : true}
                                    isGuangGao={isAD == false || isGuangGao == false ? false : true}
                                    isCreate={isAD == false || isCreate == false ? false : true}
                                    videoImage={isAD ? item.ad_info.creative_content.image_url : item.cover}
                                    videoName={isAD ? item.ad_info.creative_content.title : item.title}
                                    recommendReason={isAD == true || isRecm == false ? null : item.rcmd_reason}
                                    recommendDesc={isAD == true || isRcDesc == false ? null : item.desc}
                                    cover_left_icon_1={isAD ? null : item.cover_left_icon_1}
                                    cover_left_icon_2={isAD ? null : item.cover_left_icon_2}
                                    cover_left_text_1={isAD ? null : item.cover_left_text_1}
                                    cover_left_text_2={isAD ? null : item.cover_left_text_2}
                                    cover_right_text={isAD ? null : item.cover_right_text}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
        )
    }

    // 获取推荐页数据
    async getRecommend() {
        let response = await fetch('https://app.bilibili.com/x/v2/feed/index?access_key=f2f953baf17e769395be64cd260e7aa1&ad_extra=333A9F71DEB09C75C14655088F113F6F32E2D5C5D744E16C88EB6110456307B0B297ABA9B792546DED0CD675EE9FFA6F7F67E8D08B7466B9E3A710321E56D991728FECA4E14BC478E07D78508F8C3258B41C41DF0389B3DE0EB0446C2239F68628F8C1796724B4D58D480CC4087291775D583E7EBA812040F5A2DA175C7A72063435F733086C75F60C21A41B8E57623DFA1EE05C15829538238B18DF17DB2A5A521F51505D2A3842D66239CC0179FA2361A849BF2362BDEEC9C51858EB187E2739B18EC6000D4BEFA479C9CAAAA97A537728A275EFF65531F4A86A4BD9F057BA2FA01D907DB88562C51FFD5EB911FD993CBC57491DA13E308C0A9559C2EB95E9079DE32635D51F2D8139296BCB91A18A9EC96BB1E1D0FEABA5B8D64EC2CB610E242A35C0C1129AA781C03DC7015EB1E147028AF79B3A7275C97A9A4E8D8C99151D59D1C086341FEC6102194A0DE091E4C322E6CA2344A42BECA95492A8B6F1D8ACF2AAEDD70AD7D5F3F2D9755AFCC4A42B0D58E3496E6AEC230F2B5C8127F1FBA43B7C77D31667D3E1CE42A0A2FD8F8238FD10F9636236D5F3B4C4899DC0448E5CAA0A0E3F10BDD8A35A7CB34BDDAC34A0392E884C028986652D7383B47815C0CE2340CD3231DE8F3B290118D68D67ABC4D338CAA73CF5465E07E0519ADA6ED065810D608B0E7A6E3CD1BEA2E075B9B47D9D2C5B952E782F61F7AD0AC1F92DC4748EB8251E258A7BF330F6A48F190089&appkey=1d8b6e7d45233436&autoplay_card=2&build=6100500&c_locale=zh_CN&channel=bili&column=2&device_name=MI%209&device_type=0&flush=0&fnval=16&fnver=0&force_host=0&fourk=0&guidance=0&https_url_req=0&idx=0&login_event=2&mobi_app=android&network=wifi&open_event=cold&platform=android&pull=true&qn=32&recsys_mode=0&s_locale=zh_CN&splash_id=&statistics=%7B%22appId%22%3A1%2C%22platform%22%3A3%2C%22version%22%3A%226.10.0%22%2C%22abtest%22%3A%22%22%7D&ts=1603940345&sign=17e765fce9f93983880980e0aebf7311')
        let responseJson = await response.json();
        let recommend = responseJson.data.items;
        return recommend;
    }

    // await必须写在async方法里
    async init() {
        let recommend = await this.getRecommend()
        let bannerArr = recommend[0].banner_item
        recommend.splice(0, 1)
        this.setState({
            videoArr: recommend,
            bannerArr: bannerArr
        });
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