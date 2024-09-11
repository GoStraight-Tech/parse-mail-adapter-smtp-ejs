"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var createTransporter_1 = require("./functions/createTransporter");
var renderTemplate_1 = require("./functions/renderTemplate");
var _sendMail_1 = require("./functions/_sendMail");
var MailAdapter = function (adapterOptions) {
    // --- Init Transporter ---
    //console.log(adapterOptions);
    var transporter = (0, createTransporter_1.createTransporter)(adapterOptions.nodeMailerOptions);
    // --- Email Functions ---
    // Email
    var sendEmail = function (options) {
        if (options.template) {
            return (0, renderTemplate_1.renderTemplate)(options.template, options.data, options.locale, adapterOptions).then(function (result) {
                var mail = {
                    from: options.from,
                    to: options.to,
                    subject: options.subject,
                    text: options.text || "",
                    html: result,
                    attachments: (options === null || options === void 0 ? void 0 : options.attachments) || []
                };
                return (0, _sendMail_1._sendMail)(mail, transporter);
            }).catch(function (e) {
                return new Promise(function (resolve, reject) {
                    console.log(e);
                    reject(e);
                });
            });
        }
        else {
            var mail = {
                from: options.from,
                to: options.to,
                subject: options.subject,
                text: options.text || "",
                html: options.html,
                attachments: (options === null || options === void 0 ? void 0 : options.attachments) || []
            };
            return (0, _sendMail_1._sendMail)(mail, transporter);
        }
    };
    // Password
    var sendPasswordResetEmail = function (data) {
        var _a, _b, _c, _d;
        if (((_a = adapterOptions === null || adapterOptions === void 0 ? void 0 : adapterOptions.templatesOptions) === null || _a === void 0 ? void 0 : _a.templates) && ((_c = (_b = adapterOptions === null || adapterOptions === void 0 ? void 0 : adapterOptions.templatesOptions) === null || _b === void 0 ? void 0 : _b.templates) === null || _c === void 0 ? void 0 : _c.resetPassword)) {
            return (0, renderTemplate_1.renderTemplate)(adapterOptions.templatesOptions.templates.resetPassword.template, __assign(__assign({}, data), { user: data.user.get('email') || data.user.get('username') }), data.user.get("locale"), adapterOptions).then(function (result) {
                var _a;
                return (0, _sendMail_1._sendMail)({
                    from: adapterOptions.defaultFrom,
                    subject: ((_a = adapterOptions.templatesOptions.templates.resetPassword) === null || _a === void 0 ? void 0 : _a.subject) || 'Reset Password',
                    to: data.user.get('email') || data.user.get('username'),
                    html: result,
                }, transporter);
            }).catch(function (e) {
                return new Promise(function (resolve, reject) {
                    console.log(e);
                    reject(e);
                });
            });
        }
        else {
            return (0, _sendMail_1._sendMail)({
                from: adapterOptions.defaultFrom,
                subject: ((_d = adapterOptions.templatesOptions.templates.resetPassword) === null || _d === void 0 ? void 0 : _d.subject) || 'Reset Password',
                to: data.user.get('email') || data.user.get('username'),
                text: data.link,
            }, transporter);
        }
    };
    // Email Verification
    var sendVerificationEmail = function (data) {
        var _a, _b, _c, _d;
        if (((_a = adapterOptions === null || adapterOptions === void 0 ? void 0 : adapterOptions.templatesOptions) === null || _a === void 0 ? void 0 : _a.templates) && ((_c = (_b = adapterOptions === null || adapterOptions === void 0 ? void 0 : adapterOptions.templatesOptions) === null || _b === void 0 ? void 0 : _b.templates) === null || _c === void 0 ? void 0 : _c.resetPassword)) {
            return (0, renderTemplate_1.renderTemplate)(adapterOptions.templatesOptions.templates.verifyEmail.template, __assign(__assign({}, data), { user: data.user.get('email') || data.user.get('username') }), data.user.get("locale"), adapterOptions).then(function (result) {
                var _a;
                return (0, _sendMail_1._sendMail)({
                    from: adapterOptions.defaultFrom,
                    subject: ((_a = adapterOptions.templatesOptions.templates.verifyEmail) === null || _a === void 0 ? void 0 : _a.subject) || 'Verify Email',
                    to: data.user.get('email') || data.user.get('username'),
                    html: result,
                }, transporter);
            }).catch(function (e) {
                return new Promise(function (resolve, reject) {
                    console.log(e);
                    reject(e);
                });
            });
        }
        else {
            return (0, _sendMail_1._sendMail)({
                from: adapterOptions.defaultFrom,
                subject: ((_d = adapterOptions.templatesOptions.templates.verifyEmail) === null || _d === void 0 ? void 0 : _d.subject) || 'Verify Email',
                to: data.user.get('email') || data.user.get('username'),
                text: data.link,
            }, transporter);
        }
    };
    // --- Return Adapter ---
    return Object.freeze({
        sendMail: sendEmail,
        sendPasswordResetEmail: sendPasswordResetEmail,
        sendVerificationEmail: sendVerificationEmail
    });
};
// --- Export Adapter ---
exports.default = MailAdapter;
