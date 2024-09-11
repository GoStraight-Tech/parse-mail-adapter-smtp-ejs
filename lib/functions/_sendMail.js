"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._sendMail = void 0;
var _sendMail = function (mail, transporter) {
    var mailOptions = {
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        html: (mail === null || mail === void 0 ? void 0 : mail.html) || "",
        text: (mail === null || mail === void 0 ? void 0 : mail.text) || "",
        attachments: (mail === null || mail === void 0 ? void 0 : mail.attachments) || []
    };
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
};
exports._sendMail = _sendMail;
