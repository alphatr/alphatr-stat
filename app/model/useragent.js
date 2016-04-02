'use strict';
/**
 * model
 * @type {Class}
 */
var spider = think.config('spider');
module.exports = think.model({
    black: function (ua) {
        if (!ua) {
            return true;
        }

        ua = ua.toLowerCase().replace(/\s+/g, '');
        return spider.some(function (item) {
            item = item.toLowerCase().replace(/\s+/g, '');
            return ua.indexOf(item) > -1;
        });
    }
});
