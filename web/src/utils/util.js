import dateUtil from './date';

/**   时间操作   **/

export const equalDate = function(dateA, dateB) {
  return dateA === dateB || new Date(dateA).getTime() === new Date(dateB).getTime();
};

export const toDate = function(date) {
  return isDate(date) ? new Date(date) : null;
};

export const isDate = function(date) {
  if (date === null || date === undefined) return false;
  if (isNaN(new Date(date).getTime())) return false;
  return true;
};

export const formatDate = (date, format) => {
  date = toDate(date);
  if (!date) return '';
  return dateUtil.format(date, format || 'yyyy-MM-dd');
};

export const parseDate = function(string, format) {
  return dateUtil.parse(string, format || 'yyyy-MM-dd');
};

export const getDayCountOfMonth = function(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }
  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }
  return 31;
};

export const DAY_DURATION = 86400000;

//获取每月第一天字符串
export const getFirstDayOfMonth = () => {
  return formatDate(new Date(),'yyyy-MM')+'-01';
};
//获取每月第一天的时间
export const getFirstDayTimeOfMonth = () => {
  return new Date(formatDate(new Date(),'yyyy-MM')+'-01 00:00:00');
};
//获取每天的开始时间
export const getStartTimeLong = (date) => {
  if (!date) return '';
  return new Date(formatDate(date,'yyyy-MM-dd')+' 00:00:00').getTime();
};
//获取每天的结束时间
export const getEndTimeLong = (date) => {
  if (!date) return '';
  return new Date(formatDate(date,'yyyy-MM-dd')+' 23:59:59').getTime();
}
//获取每天的开始时间
export const getStartTimeByStr = (date) => {
  if (!date) return '';
  return formatDate(date,'yyyy-MM-dd')+' 00:00:00';
};
//获取每天的结束时间
export const getEndTimeByStr = (date) => {
  if (!date) return '';
  return formatDate(date,'yyyy-MM-dd')+' 23:59:59';
}

/**
 * 完全拷贝一个对象
 * @param obj
 * @returns {*}
 */
export const copyObj = (obj) => {
  if(obj == null ){
    return null;
  }
  var result={};
  for (var key in obj) {
    result[key] = typeof obj[key]==='object'? copyObj(obj[key]): obj[key];
  }
  return result;
};
