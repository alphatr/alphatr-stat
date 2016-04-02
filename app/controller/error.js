'use strict';
/**
 * error controller
 */
module.exports = think.controller({
    displayError: function(status){
        console.error(this.http.error);
        this.end(status);
    },

    _400Action: function () {
        return this.displayError(400);
    },

    _403Action: function () {
        return this.displayError(403);
    },

    _404Action: function () {
        return this.displayError(404);
    },

    _500Action: function () {
        return this.displayError(500);
    },

    _503Action: function () {
        return this.displayError(503);
    }
});
