'use strict';

/**
 * config
 * @type {Object}
 */
module.exports = {
    version: 1,
    api: 'http://www.google-analytics.com/collect',
    keys: [
        'v', 'tid', 'ds', 'qt', 'z', 'cid', 'uid', 'sc',
        'uip', 'ua', 'dr', 'sr', 'vp', 'ul', 't', 'dl',
        'dt', 'ec', 'ea', 'el', 'ev', 'sn', 'sa', 'st',
        'utc', 'utv', 'utt', 'utl', 'plt', 'dns', 'pdt',
        'rrt', 'tcp', 'srt', 'dit', 'clt', 'exd', 'exf',
        'cd1', 'cm1', 'cd2', 'cm2'
    ],
    required: ['v', 'tid', 'cid', 't', 'ds', 'uip', 'ua', 'dl']
};
