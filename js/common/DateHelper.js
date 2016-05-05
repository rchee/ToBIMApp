import NetworkHelper from './NetWorkHelper';

//危险操作！
Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};


function getDateText(date:number = 0) {
  let now = Date.now();
  let shijiancha = Math.abs(now - date);
  if (shijiancha < 30 * 1000) {
    return "刚刚";
  } else if (shijiancha < 60 * 1000) {
    return "1分钟前";
  } else if (shijiancha < 5 * 60 * 1000) {
    return "5分钟前";
  } else if (shijiancha < 24 * 60 * 60 * 1000) {
    return new Date(date).format("hh:mm");
  } else {
    return new Date(date).format("MM-dd");
  }

}

module.exports = {getDateText};