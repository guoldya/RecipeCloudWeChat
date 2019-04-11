
import moment from 'moment'
/**
 * 给商品价格加补0
 * @param {*} value
 */
const keepTwoNum = function (value) {
    if (value == undefined) {
        return "**"
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
    } else if (value == 6) {
        return "已失效"
    }
};

 
const payMethod = function (value) {
    if (value == undefined) {
        return "支付宝支付"
    }
    if (value == 1) {
        return "支付宝支付"
    } else if (value == 2) {
        return "微信支付"
    } else if (value == 3) {
        return "医保支付"
    }
};

const admissionFilter = function (value) {
    if (value == undefined) {
        return ""
    }
    if (value == 1) {
        return "待入院"
    } else if (value == 2) {
        return "已入院"
    } else if (value == 3) {
        return "出院"
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

const inquiryTime = function (dataStr, pattern = 'HH:mm') {
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
const examSex = function (value) {
    if (value == undefined) {
        return "未知"
    }
    if (value == 1) {
        return "男"
    } else if (value == 2) {
        return "女"
    }
};
 
const getAge = function (value) {
    if (value) return
    if (!value.split(" ")) return
    var strBirthdayArr = value.split(" ");
    var strBirthdayArr = strBirthdayArr[0].split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        value = 0;//同年 则为0岁
    }
    else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if (dayDiff < 0) {
                    value = ageDiff - 1;
                }
                else {
                    value = ageDiff;
                }
            }
            else {
                var monthDiff = nowMonth - birthMonth;//月之差
                if (monthDiff < 0) {
                    value = ageDiff - 1;
                }
                else {
                    value = ageDiff;
                }
            }
        }
        else {
            value = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }


    return value;//返回周岁年龄
};
export default {
    keepTwoNum,
    payTypeFilter,
    time,
    payMethod,
    lasttime,
    drugCheck,
    examStatus,
    inquiryTime,
    examSex,
    getAge,
    admissionFilter,
}
