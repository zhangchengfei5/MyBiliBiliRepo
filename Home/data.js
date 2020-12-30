import moment from 'moment';

export const dataAd = []

export const themeColor = '#E67F9F'

export const recommendList = [
    { videoName: "串烧周杰伦46首歌曲!来寻找属于你的回忆 | 吉他弹唱", videoImage: require('./images/video1.png'), recommendReason: "8千点赞", recommendTitle: "", broadcastnum: "1.2万", barragenum: "753", videoTime: "3:24", key: "0" },
    { videoName: "【钢琴】 当商场里响起secret base ～君がくれたもの～", videoImage: require('./images/video2.png'), recommendReason: "已关注", recommendTitle: "绯绯Feifei", broadcastnum: "43.2万", barragenum: "3542", videoTime: "6:53", key: "1" },
    { videoName: "厨师长教你：“红烧鸡腿肉”的家常做法，只需要电饭锅就行", videoImage: require('./images/video3.png'), recommendReason: "3万点赞", recommendTitle: "", broadcastnum: "97.8万", barragenum: "1.8万", videoTime: "13:13", key: "2" },
    { videoName: "减肥成为全校最帅，只为向初恋复仇", videoImage: require('./images/video4.png'), recommendReason: "番剧", recommendTitle: "政宗君的复仇", broadcastnum: "463.6万", barragenum: "3.4万", videoTime: "", key: "3" },
    { videoName: "感谢陪伴|21计算机考研|雨声|13小时", videoImage: require('./images/video5.png'), recommendReason: "直播", recommendTitle: "陪伴学习", broadcastnum: "", barragenum: "2.7万", videoTime: "做到了吗-", key: "4" },
    { videoName: "【Animenz】unravel   钢琴版", videoImage: require('./images/video6.png'), recommendReason: "已关注", recommendTitle: "Animenzzz", broadcastnum: "1051.6万", barragenum: "23万", videoTime: "3:52", key: "5" },
]

// 0:param 1:cid 2:profileUrl  3:up主的id
export var videoData = []

// 获取当前字符串的长度
export function getStrLength(str) {
    // 引用正则表达式
    var cArr = str.match(/[^\x00-\xff]/ig);
    return str.length + (cArr == null ? 0 : cArr.length);
}

export var dealNum = (num) => {
    // 保留小数点后一位
    var numWan = (num / 10000).toFixed(1)
    // 处理32.0的情况
    var arr = numWan.toString().split(".")
    var wan = arr[1] == 0 ? parseInt(num / 10000) : (num / 10000).toFixed(1)
    return (num / 10000 >= 1 ? wan + "万" : num)
}

export var dealTime = (time) => {
    // console.log(time)
    var diff_m = moment().diff(moment(time * 1000), "minutes")
    var diff_h = moment().diff(moment(time * 1000), "hours")
    var diff_d = moment().diff(moment(time * 1000), "days")
    // 昨天零点的时间戳
    var yestoday = moment().startOf("day") - 1000 * 60 * 60 * 24
    // console.log(diff_d)
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