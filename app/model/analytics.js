'use strict';
/**
 * analytics model
 * @type {Class}
 * document: https://developers.google.com/analytics/devguides/collection/protocol/v1/reference
 */
var request = require('request');

var config = think.config('analytics');

module.exports = think.model({
    send: function (option) {
        var deferred = think.defer();
        var temp = Date.now().toString().substr(-8) + parseInt(Math.random() * 10000, 10);
        var defaultOption = {
            v: config.version,
            ds: 'web',
            z: temp
        };

        option = think.extend({}, defaultOption, option);

        // 过滤掉爬虫
        if (this.model('useragent').black(option.ua)) {
            return think.reject();
        }

        // 必填的是否没填写
        var isUndefined = function (item) {
            return !option[item];
        };

        if (config.required.some(isUndefined)) {
            return think.reject('required is not defind');
        }

        // 过滤掉空值
        var form = {};
        config.keys.forEach(function (key) {
            var value = option[key];
            if (think.isString(value) || think.isNumber(value)) {
                form[key] = value;
            }
        });

        request.post({url:config.api, form: form}, function(err, response){
            if (err) {
                return deferred.reject(err);
            }

            var statusCode = response.statusCode;
            if (statusCode < 200 || statusCode > 299) {
                return deferred.reject(statusCode);
            }

            deferred.resolve(statusCode);
        });

        return deferred.promise;
    }
});

