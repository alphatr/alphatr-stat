'use strict';

var Base = require('./base.js');

module.exports = think.controller(Base, {
    indexAction: function () {
        this.end('OK');
    },
    /**
     * index action
     * @return {Promise} []
     */
    viewAction: function () {
        var action = 'pageview';

        var data = {
            dr: this.get('r'), // referrer;
            dt: this.get('t'), // 文档标题
            sr: this.get('s'), // 屏幕分辨率
            vp: this.get('v'), // 视图大小
            cd1: 'dpr ' + this.get('dpr') // 自定义维度 设备像素比
        }

        this.model('analytics').send(this.baseData(action, data));
        return this.gif();
    }
});
