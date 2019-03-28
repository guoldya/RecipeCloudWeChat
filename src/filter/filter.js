
import moment from 'moment'
/**
 * 给商品价格加补0
 * @param {*} value
 */
const keepTwoNum = function (value) {
    if (value == undefined) {
        return ""
    }
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
};
const payTypeFilter = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 0) {
        return "未支付"
    } else if (value == 1) {
        return "已支付"
    } else if (value == 2) {
        return "已退号"
    } else if (value == 3) {
        return "已签到"
    } else if (value == 4) {
        return "已就诊"
    } else if (value == 5) {
        return "已取消"
    }else if (value == 6) {
        return "已失效"
    }
};
//时间保留号数
const time = function (value) {
    if (value == undefined) {
        return ""
    }
    let val = value.split(' ')[0];
    return val
    // if(!ms){return;};
    // let curTime = new Date(ms);
    // let year = curTime.getFullYear();
    // let month = curTime.getMonth() + 1;
    // let day = curTime.getDate();
    // let hours = curTime.getHours();
    // let minutes = curTime.getMinutes();
    // month = month <= 9 ? "0" + month : month;
    // day = day <= 9 ? "0" + day : day;
    // hours = hours <= 9 ? "0" + hours : hours;
    // minutes = minutes <= 9 ? "0" + minutes : minutes;
    // return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
};
const lasttime = function (dataStr, pattern = 'YYYY-MM-DD HH:mm') {
    return moment(dataStr).format(pattern)
};

const drugCheck = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 0) {
        return "新处方"
    } else if (value == 1) {
        return "已审核"
    } else if (value == 2) {
        return "已取药"
    } else if (value == 3) {
        return "已退药"
    } else if (value == 4) {
        return "已失效"
    } else if (value == 5) {
        return "已下订单"
    }
};
const examStatus = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return "已预约"
    } else if (value == 2) {
        return "已检查"
    } else if (value == 3) {
        return "检查中"
    }
};
export default {
    keepTwoNum,
    payTypeFilter,
    time,
    lasttime,
    drugCheck,
    examStatus,
}
