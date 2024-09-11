"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = void 0;
var ejs = require("ejs");
var renderTemplate = function (template, data, locale, adapterOptions) {
    var templatePath = adapterOptions.templatesOptions.templatesDir;
    if (adapterOptions.templatesOptions.locales.indexOf(locale || "$$") > -1) {
        templatePath += "".concat(locale, "/").concat(template);
    }
    else {
        templatePath += "".concat(adapterOptions.templatesOptions.defaultLocale, "/").concat(template);
    }
    return new Promise(function (resolve, reject) {
        ejs.renderFile(templatePath, data || {}, function (err, str) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(str);
            }
        });
    });
};
exports.renderTemplate = renderTemplate;
