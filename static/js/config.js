;(function(root, factory) {
    'use strict'
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory)
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'))
    } else {
        // Browser globals (root is window) 提供出一个config名的模块
        root.config = factory(root.jQuery)
    }
})(this, function($) {
    'use strict'
    // 方法
    var Time = function() {
        return $.myTime.CurTime()
    }
    //var HttpUrl = 'http://localhost:60881';
    var HttpUrl = 'http://www.tj-rikevita.com'
    var companyUrl = HttpUrl + '/handlers/companyHelp.ashx?method='
    var kefuUrl = HttpUrl + '/handlers/kefeHelp.ashx?method='
    var visitorUrl = HttpUrl + '/handlers/userHelp.ashx?method='

    // 暴露公共方法
    return {
        Time: Time,
        HttpUrl: HttpUrl,
        companyUrl: companyUrl,
        kefuUrl: kefuUrl,
        visitorUrl: visitorUrl
    }
})

//define("jquery", [], function () { return jQuery; });
//window.jQuery = window.$ = jQuery;

;(function($) {
    $.extend({
        //return YYYY-MM
        date: function(dateObject) {
            if (dateObject != null) {
                if (dateObject.indexOf('T') == -1) dateObject = dateObject.replace(/-/g, '/')
                var d = new Date(dateObject)
                var day = d.getDate()
                var month = d.getMonth() + 1
                var year = d.getFullYear()
                if (day < 10) {
                    day = '0' + day
                }
                if (month < 10) {
                    month = '0' + month
                }
                var date = year + '.' + month + '.' + day
                return date
            }
        },
        trimspace: function(vStr) {
            if (vStr != null) return vStr.replace(/(^\s+)|(\s+$)/g, '')
        },
        getUrlParam: function(paramName) {
            var reParam = new RegExp('(?:[?&]|&)' + paramName + '=([^&]+)', 'i')
            var match = window.location.search.match(reParam)
            return match && match.length > 1 ? match[1] : null
        },
        //count pagesize
        countpage: function(totalsize, pagesize) {
            var total_page = totalsize / pagesize
            total_page = Math.ceil(total_page)
            if (total_page == 0) total_page = 1
            return total_page
        },
        //转换INT
        getint: function(val) {
            var _value = parseInt(val)
            if (isNaN(_value)) _value = 0
            return _value
        },
        //过滤html
        _filter: function(str) {
            if (str != null && str != '') {
                var regex = /(<([^>]+)>)/gi,
                    result = str.replace(regex, '')
                return result
            } else return str
        },
        cutString: function(str, len) {
            if (str == null) return null
            //length属性读出来的汉字长度为1
            if (str.length * 2 <= len) {
                return str
            }
            var strlen = 0
            var s = ''
            for (var i = 0; i < str.length; i++) {
                s = s + str.charAt(i)
                if (str.charCodeAt(i) > 128) {
                    strlen = strlen + 2
                    if (strlen >= len) {
                        return s.substring(0, s.length - 1) + '..'
                    }
                } else {
                    strlen = strlen + 1
                    if (strlen >= len) {
                        return s.substring(0, s.length - 2) + '..'
                    }
                }
            }
            return s
        },
        //时间戳转换函数
        myTime: {
            /**
             * 当前时间戳
             * @return <int>        unix时间戳(秒)
             */
            CurTime: function() {
                return Date.parse(new Date()) / 1000
            },
            /**
             * 日期 转换为 Unix时间戳
             * @param <string> 2014-01-01 20:20:20  日期格式
             * @return <int>        unix时间戳(秒)
             */
            DateToUnix: function(string) {
                var f = string.split(' ', 2)
                var d = (f[0] ? f[0] : '').split('-', 3)
                var t = (f[1] ? f[1] : '').split(':', 3)
                return (
                    new Date(
                        parseInt(d[0], 10) || null,
                        (parseInt(d[1], 10) || 1) - 1,
                        parseInt(d[2], 10) || null,
                        parseInt(t[0], 10) || null,
                        parseInt(t[1], 10) || null,
                        parseInt(t[2], 10) || null
                    ).getTime() / 1000
                )
            },
            /**
             * 时间戳转换日期
             * @param <int> unixTime    待时间戳(秒)
             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
             * @param <int>  timeZone   时区
             */
            UnixToDate: function(unixTime, isFull, timeZone) {
                if (typeof timeZone === 'number') {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60
                }
                var time = new Date(unixTime * 1000)
                var ymdhis = ''
                ymdhis += time.getUTCFullYear() + '-'
                ymdhis += time.getUTCMonth() + 1 + '-'
                ymdhis += time.getUTCDate()
                if (isFull === true) {
                    ymdhis += ' ' + time.getUTCHours() + ':'
                    ymdhis += time.getUTCMinutes() + ':'
                    ymdhis += time.getUTCSeconds()
                }
                return ymdhis
            },
            /**
             * 时间戳转换日期
             * @param <int> unixTime    待时间戳(秒)
             * @param <bool> isFull    返回完整日期(Y-m-d)
             * @param <int>  timeZone   时区
             */
            UnixToShortDate: function(unixTime, isFull, timeZone) {
                if (typeof timeZone === 'number') {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60
                }
                var time = new Date(unixTime * 1000)
                var ymdhis = ''
                ymdhis += time.getUTCFullYear() + '.'
                var month = time.getUTCMonth() + 1
                if (month < 10) {
                    month = '0' + month
                }
                ymdhis += month
                if (isFull === true) {
                    var day = time.getUTCDate()
                    if (day < 10) {
                        day = '0' + day
                    }
                    ymdhis += '.' + day
                }
                return ymdhis
            }
        }
    })
})(jQuery)
