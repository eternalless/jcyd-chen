"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let DataService = class DataService {
    getData() {
        return new Promise(resolve => {
            setTimeout(function () {
                resolve("IndexAction异步数据");
            }, 1000);
        });
    }
};
exports.default = DataService;