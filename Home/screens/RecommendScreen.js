import React, { Component } from 'react';
import {
    View, Text, Image, StyleSheet, Dimensions,
    ScrollView, FlatList, TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import { videoName, videoImage, recommendReason, recommendTitle, broadcastnum, barragenum, videoTime, recommendList } from '../data';
// 获取屏幕的宽高
var { width, height } = Dimensions.get('window')

export class RecommendScreen extends Component {
    constructor(props) {
        super(props);
    }
    _keyExtractor = (item) => item.key
    renderItem = ({ item }) => (
        <TouchableOpacity style={{ flex: 1 }}
            onPress={() => { }}>
            <Item
                videoImage={item.videoImage}
                videoName={item.videoName}
                recommendReason={item.recommendReason}
                recommendTitle={item.recommendTitle}
                broadcastnum={item.broadcastnum}
                barragenum={item.barragenum}
                videoTime={item.videoTime}
            />
        </TouchableOpacity>
    );
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, padding: 3 }}>
                    <FlatList
                        ListHeaderComponent={
                            <ScrollView style={{ paddingHorizontal: 3, marginTop: 6, maxHeight: 200 }}>
                                <Swiper
                                    style={styles.swiper}
                                    autoplay
                                    showsButtons={false} height={200} autoplayTimeout={3}
                                    horizontal={true} dotStyle={styles.dotStyle} loop={true} removeClippedSubviews={true}
                                    activeDotStyle={styles.activeDotStyle} paginationStyle={styles.paginationStyle}>
                                    <Image source={require('../images/banner1.jpg')} style={styles.bannerStyle} resizeMode="stretch" />
                                    <Image source={require('../images/banner2.jpg')} style={styles.bannerStyle} resizeMode="stretch" />
                                    <Image source={require('../images/banner3.jpg')} style={styles.bannerStyle} resizeMode="stretch" />
                                </Swiper>
                            </ScrollView>
                        }
                        removeClippedSubviews={true}
                        horizontal={false}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        // data={[
                        //     {videoImage:videoImage[0],videoName:videoName[0],recommendReason:recommendReason[0],recommendTitle:recommendTitle[0],broadcastnum:broadcastnum[0],barragenum:barragenum[0],videoTime:videoTime[0],key:'a'},
                        //     {videoImage:videoImage[1],videoName:videoName[1],recommendReason:recommendReason[1],recommendTitle:recommendTitle[1],broadcastnum:broadcastnum[1],barragenum:barragenum[1],videoTime:videoTime[1],key:'b'},
                        //     {videoImage:videoImage[2],videoName:videoName[2],recommendReason:recommendReason[2],recommendTitle:recommendTitle[2],broadcastnum:broadcastnum[2],barragenum:barragenum[2],videoTime:videoTime[2],key:'c'},
                        //     {videoImage:videoImage[3],videoName:videoName[3],recommendReason:recommendReason[3],recommendTitle:recommendTitle[3],broadcastnum:broadcastnum[3],barragenum:barragenum[3],videoTime:videoTime[3],key:'d'},
                        //     {videoImage:videoImage[4],videoName:videoName[4],recommendReason:recommendReason[4],recommendTitle:recommendTitle[4],broadcastnum:broadcastnum[4],barragenum:barragenum[4],videoTime:videoTime[4],key:'e'},
                        //     {videoImage:videoImage[5],videoName:videoName[5],recommendReason:recommendReason[5],recommendTitle:recommendTitle[5],broadcastnum:broadcastnum[5],barragenum:barragenum[5],videoTime:videoTime[5],key:'f'},
                        // ]}
                        data={recommendList}
                        renderItem={this.renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
            </View>
        )
    }
}

const Item = ({ videoImage, videoName, recommendReason, recommendTitle, broadcastnum, barragenum, videoTime }) => {
    return (
        <View style={styles.videoStyle}>
            <Image source={videoImage} style={styles.imgStyle} />
            <View style={{ position: "absolute", flexDirection: "row", flex: 1, top: 83, alignItems: "center", paddingHorizontal: 7 }}>
                <Image source={require('../images/broadcastnum.png')} style={{ height: 13, width: 13 }} />
                <Text style={{ color: "#fff", fontSize: 9, marginLeft: 3 }}>{broadcastnum}</Text>
                <Image source={tagType(recommendReason)} style={{ height: 13, width: 13, marginLeft: 10 }} />
                <Text style={{ color: "#fff", fontSize: 9, marginLeft: 3 }}>{barragenum}</Text>
                <View style={{ flexDirection: "row-reverse", flex: 1 }}>
                    <Text style={{ color: "#fff", fontSize: 9 }}>{videoTime}</Text>
                </View>
            </View>
            <Text numberOfLines={2} style={styles.videoNameStyle}>{videoName}</Text>
            <View style={{ flexDirection: "row", padding: 7, alignItems: "center", flex: 1 }}>
                <Text style={styles.recommendReasonStyle}>{recommendReason}</Text>
                <Text style={styles.recommendTitleStyle}>{recommendTitle}</Text>
                <Image source={require('../images/ellipsis.png')} style={{ height: 10, width: 10 }} />
            </View>
        </View>
    )
}

function tagType(recommendReason) {
    if (recommendReason == "番剧") {
        icon = require('../images/collectnum.png')
    } else if (recommendReason == "直播") {
        icon = require('../images/audience.png')
    } else {
        icon = require('../images/barragenum.png')
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
        height: 200,
        borderRadius: 3,
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
        height: 100,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    videoNameStyle: {
        paddingHorizontal: 7,
        marginTop: 7,
        color: "#4d4d4d",
        fontSize: 14,
    },
    recommendReasonStyle: {
        backgroundColor: "#FFF1ED",
        color: "#FF6633",
        fontSize: 9,
        alignSelf: "center",
        padding: 2,
        borderRadius: 2
    },
    recommendTitleStyle: {
        flex: 1,
        color: "#bfbfbf",
        marginLeft: 5,
        fontSize: 12,
    }
})