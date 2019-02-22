/**
 * 给商品价格加补0
 * @param {*} value
 */
const keepTwoNum=function(value){
    if(value==undefined){
        return ""
    }
    var value=Math.round(parseFloat(value)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
        value=value.toString()+".00";
        return value;
    }
    if(xsd.length>1){
        if(xsd[1].length<2){
            value=value.toString()+"0";
        }
        return value;
    }
}
const payTypeFilter=function(value){
    if(value==undefined){
        return ""
    }
    if(value==0){
        return "未支付"
    }else if(value==1){
        return "已支付"
    }else if(value==2){
        return "已退号"
    }else if(value==3){
        return "已签到"
    }else if(value==4){
        return "已就诊"
    }else if(value==5){
        return "已取消"
    }
}
export default {
    keepTwoNum, payTypeFilter
}
