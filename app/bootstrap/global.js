var net = require('net');
var winston = require('winston');
var moment = require('moment');
var DailyRotateFile = require('winston-daily-rotate-file');

var loggers = {};

var timestamp = function () {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

var stat = {
    log: function (name, info) {
        var logger = loggers[name];
        if (!logger) {
            var transport = new DailyRotateFile({
                name: 'file',
                datePattern: '.yyyy-MM-dd',
                filename: name + '.log',
                dirname: think.config('winston'),
                timestamp: timestamp
            });

            logger = new winston.Logger({
                exitOnError: false,
                transports: [transport]
            });

            loggers[name] = logger;
        }

        logger.info(info);
    },

    clientIp: function (ip) {
        var isSpecialIp = function (str) {
            var ipBitAnd = function (mask, ip) {
                mask = mask.trim().split('.');

                return ip.trim().split('.').map(function (num, index) {
                    return parseInt(num, 10) & parseInt(mask[index], 10);
                }).join('.');
            };

            var ipArea = [
                {mask: '255.0.0.0', expect: '127.0.0.0'},
                {mask: '255.0.0.0', expect: '10.0.0.0'},
                {mask: '255.240.0.0', expect: '172.16.0.0'},
                {mask: '255.255.0.0', expect: '192.168.0.0'}
            ];

            return ipArea.some(function (item) {
                return ipBitAnd(item.mask, str) === item.expect;
            });
        };

        var clientIp = '';

        ip.split(',').forEach(function (item) {
            item = item.trim();
            if (!net.isIPv4(item)) {
                return;
            }

            clientIp = item;
            if (!isSpecialIp(item)) {
                clientIp = item;
                return;
            }
        });

        return clientIp;
    }
}

global.stat = stat;
