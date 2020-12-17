import md5 from "react-native-md5";
//得到sign的方法
get_sign = (params, key) => {
    var s_keys = [];
    for (var i in params) {
        s_keys.push(i);
    }
    s_keys.sort();
    var data = "";
    for (var i = 0; i < s_keys.length; i++) {
        // encodeURIComponent 返回的转义数字必须为大写( 如 %2F )
        data += (data ? "&" : "") + s_keys[i] + "=" + encodeURIComponent(params[s_keys[i]]);
    }
    return {
        "sign": md5.hex_md5(data + key),
        "params": data
    };
}

//获取视频详情url
export const getVideoDetilUrl = (aid) => {
    let paramsObj = {
        // aid: "78126101",
        aid: aid,
        appkey: "1d8b6e7d45233436",
        build: "5480400",
        ts: new Date().getTime()
    }
    let appsecret = "560c52ccd288fed045859ed18bffd973";

    let signObj = get_sign(paramsObj, appsecret);
    // console.log(signObj);
    let path = "https://app.bilibili.com/x/v2/view";
    let params = signObj.params;
    let sign = signObj.sign;
    let url = `${path}?${params}&sign=${sign}`;
    return url;
}

// 获取推荐页URL
export const getRecommendUrl = (aid) => {
    let paramsObj = {
        appkey: "1d8b6e7d45233436",
        build: "6100500",
        ts: new Date().getTime()
    }
    let appsecret = "560c52ccd288fed045859ed18bffd973";

    let signObj = get_sign(paramsObj, appsecret);
    // console.log(signObj);
    let path = "https://app.bilibili.com/x/v2/feed/index?access_key=dad61b7bf4b5fe18ecddeedd9f67a3c1&ad_extra=333A9F71DEB09C75C14655088F113F6F32E2D5C5D744E16C88EB6110456307B0B297ABA9B792546DED0CD675EE9FFA6F7F67E8D08B7466B9E3A710321E56D991728FECA4E14BC478E07D78508F8C3258B41C41DF0389B3DE0EB0446C2239F68628F8C1796724B4D58D480CC4087291775D583E7EBA812040F5A2DA175C7A72063435F733086C75F60C21A41B8E57623DFA1EE05C15829538238B18DF17DB2A5A521F51505D2A3842D66239CC0179FA2361A849BF2362BDEEC9C51858EB187E2739B18EC6000D4BEFA479C9CAAAA97A537728A275EFF65531F4A86A4BD9F057BA2FA01D907DB88562C51FFD5EB911FD993CBC57491DA13E308C0A9559C2EB95E9079DE32635D51F2D8139296BCB91A18A9EC96BB1E1D0FEABA5B8D64EC2CB610E242A35C0C1129AA781C03DC7015EB1E147028AF79B3A7275C97A9A4E8D8C99151D59D1C086341FEC6102194A0DE091E4C322E6CA2344A42BECA95492A8B6F1D8ACF2AAEDD70AD7D5F3F2D9755AFCC4A42B0D58E3496E6AEC230F2B5C8127F1FBA43B7C77D31667D3E1CE42A0A2FD8F8238FD10F9636236D5F3B4C4899DC0448E5CAA0A0E3F10BDD8A35A7CB34BDDAC34A0392E884C028986652D7383B47815C0CE2340CD3231DE8F3B290118D68D67ABC4D338CAA73CF5465E07E0519ADA6ED065810D608B0E7A6E3CD1BEA2E075B9B47D9D2C5B952E782F61F7AD0AC1F92DC4748EB8251E258A7BF330F6A48F190089&autoplay_card=2&c_locale=zh_CN&channel=bili&column=2&device_name=MI%209&device_type=0&flush=0&fnval=16&fnver=0&force_host=0&fourk=0&guidance=0&https_url_req=0&idx=0&login_event=2&mobi_app=android&network=wifi&open_event=cold&platform=android&pull=true&qn=32&recsys_mode=0&s_locale=zh_CN&splash_id=&statistics=%7B%22appId%22%3A1%2C%22platform%22%3A3%2C%22version%22%3A%226.10.0%22%2C%22abtest%22%3A%22%22%7D";
    let params = signObj.params;
    let sign = signObj.sign;
    let url = `${path}?${params}&sign=${sign}`;
    return url;
}