'use strict';
var uuid = require('uuid');

module.exports = think.controller({

    /**
     * Get user ID from cookie or gen a new UID
     * @return {String} UID String
     */
    clientId: function () {
        var cid = this.cookie("cid");

        if (!cid) {
            cid = uuid.v4();
            this.cookie("cid", cid, {timeout: 3600 * 24 * 365});
        }

        return cid;
    },

    /**
     * 从客户端 IP 列表中 query 出用户 IP
     * @return {IP} ip
     */
    userIp: function () {
        return stat.clientIp(this.ip());
    },

    baseData: function (action, data) {
        var project = this.get('p');
        if (!project) {
            return this.gif();
        }

        var tid = this.config('project')[project];

        if (!tid) {
            return this.gif();
        }

        if (think.isString(tid)) {
            tid = {tid: tid};
        }

        var base = {
            cid: this.clientId(),
            t: action,

            uip: this.userIp(),
            ua: this.userAgent(),
            ul: this.lang(),
            dl: this.referrer()
        }

        stat.log(project + '-' + action, think.extend({}, base, data));
        return think.extend({}, tid, base, data);
    },

    gif: function () {
        // 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAkwBADs='; // 白色
        // 'R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=', // 黑色
        // 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // 透明

        this.type('gif', false);
        this.end('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    }
});
