"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransporter = void 0;
var nodemailer = require("nodemailer");
function createTransporter(nodemailerOption) {
    // @ts-ignore
    return nodemailer.createTransport(nodemailerOption);
}
exports.createTransporter = createTransporter;
