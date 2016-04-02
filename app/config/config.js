'use strict';
/**
 * config
 * @type {Object}
 */
module.exports = {
    port: 12101,
    resource_on: true,
    resource_reg: /^([^\/]+\.(?!js|html|gif)\w+$)/,
    route_on: true,
    winston: think.ROOT_PATH + '/logs/winston'
};
