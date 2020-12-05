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
    console.log(signObj);
    let path = "https://app.bilibili.com/x/v2/view";
    let params = signObj.params;
    let sign = signObj.sign;
    let url = `${path}?${params}&sign=${sign}`;
    return url;
}