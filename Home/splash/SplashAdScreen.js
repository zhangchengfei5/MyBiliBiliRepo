import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { dataAd } from '../data';

// 获取屏幕的宽高
var { width, height } = Dimensions.get('window')

export class SplashAdScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: dataAd[2]
        }
    }
    render() {
        var isVideo = (dataAd[4] != null)
        return (
            <View style={{ flex: 1 }}>
                <Image source={{ uri: dataAd[0] }} style={{ display: isVideo ? "none" : "flex", flex: 1, resizeMode: "stretch" }} />
                <Video style={{ display: isVideo ? "flex" : "none", flex: 1, width: "100%" }}
                    source={isVideo ? { uri: dataAd[4] } : require('../videos/1.mp4')}
                    rate={1.0} //控制暂停播放
                    paused={false}
                    muted={true} // true代表静音
                    resizeMode="stretch"
                    repeat={false} //是否重复播放
                ></Video>
                <Text style={{ display: (dataAd[3] == 15 && dataAd[8] == 1) || dataAd[3] == 16 ? "flex" : "none", width: "100%", fontSize: 14, color: "#fff", paddingHorizontal: 10, paddingVertical: 7, backgroundColor: "#888" }}>
                    {dataAd[7]}
                </Text>
                <Text style={{ position: "absolute", top: 25, right: 15, fontSize: 10, color: "#fff", borderRadius: 2, paddingHorizontal: 6, paddingVertical: 1, backgroundColor: "#888", opacity: dataAd[1] ? 1 : 0 }}>广告</Text>
                <Image source={dataAd[3] == 14 ? require('../images/ad_logo.png') : require('../images/ad_logo_2.png')} style={dataAd[3] == 14 ? { position: "absolute", width: 90, height: 45, bottom: 20, left: 10 } : { width: 120, height: 60, marginVertical: 10, alignSelf: "center" }} />
                <TouchableOpacity style={[{ position: "absolute", bottom: 25, right: 10, borderRadius: 50, borderColor: "#9c9c9c", borderWidth: 0.5, paddingVertical: 7 }, dataAd[3] == 14 ? { backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 13 } : { paddingHorizontal: 12 }]}
                    onPress={() => { this.props.navigation.navigate("Main") }}>
                    <Text style={dataAd[3] == 14 ? { fontSize: 10, color: "#fff" } : { fontSize: 12, color: "#9c9c9c" }}>跳过 {this.state.duration}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    componentDidMount() {
        // 倒计时
        var s = this.state.duration
        this.timer = setInterval(() => {
            s--
            this.setState({
                duration: s
            })
            if (this.state.duration < 1) {
                // this.timer && clearInterval(this.timer);
                this.props.navigation.navigate("Main")
                return
            }
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }
}