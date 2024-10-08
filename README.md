# parse-mail-adapter-smtp-ejs
Parse Server Mail Adapter with EJS templates (SMTP)

### Installation

Install npm module in your parse server project

```sh
$ npm install --save parse-mail-adapter-smtp-ejs
$ yarn add parse-mail-adapter-smtp-ejs
```

### Use


```js
"use strict";

const Express = require('express');
const ParseServer = require('parse-server').ParseServer;

const app = Express();
const APP_PORT = 8080;


let api = new ParseServer({
    appName: "Parse Test",
    appId: "appid",
    masterKey: "secret",
    serverURL: "http://localhost:8080/parse",
    publicServerURL: "http://localhost:8080/parse",
    databaseURI: "mongodb://user:pass@host:27017/parse",
    port: APP_PORT,
    //This is the config for email adapter
    emailAdapter: {
        module: "parse-mail-adapter-smtp-ejs",
        options: {

            nodeMailerOptions: {
                host: 'your.smtp.host',
                port: 465,
                secure: true, //True or false if you are using ssl 
                auth: {
                    user: 'email@email.com',
                    pass: 'AwesomePassword',
                }
                // you can add here other custom props for nodemailer like "tls"...
            },

            defaultFrom: 'noreply@sender.address', // Use for ResetPassword, VerifyEmail

            templatesOptions: {
                locales: ["en", "fr"],
                defaultLocale: "en",
                templatesDir: __dirname + '/templates/',

                templates: {
                    //This template is used only for reset password email
                    //The locale used for these templates is the one of user.get("locale") or the default locale
                    resetPassword: {
                        //Name to your template
                        template:'reset-password.html',
                        //Subject for this email
                        subject: 'Reset your password'
                    },
                    verifyEmail: {
                        template: 'verify-email.html',
                        subject: 'Verify Email'
                    }
                }
            }
            
        }
    }
});


app.use('/parse', api);

app.listen(APP_PORT, function () {
	console.log(`Parse Server Ready and listening on port ${APP_PORT}`);
});
```

### Template

#### Architecture

```js
templates/
└── en/                 // en locale folder
│   └── example.html    // en localized file
└── fr/                 // fr locale folder
│   └── example.html    // fr localized file
```

#### Variables (resetPassword & verifyMail)
- appName //This is the name of your parse app
- link //This is the link for reset the password
- user //This is a Parse object of the current user


### Send Mail From Cloud Code

=> Parse Server >= 5.0.0
```js
Parse.Cloud.sendEmail({
    template: "myTemplate.html", // Email Html
    locale: "en",
    from: "your@sender.address",
    to: "user@email.address",
    subject: "my Subejct",
    text: "", // Email Text
    data: {} // data gives to ejs
});
```

=> Parse Server < 5.0.0
```js
// Import on top
const { AppCache } = require('parse-server/lib/cache');

// To use in code
const MailAdapter = AppCache.get('appid').userController.adapter;
await MailAdapter.sendMail({
    template: "myTemplate.html", // Email Html
    locale: "en",
    from: "your@sender.address",
    to: "user@email.address",
    subject: "my Subejct",
    text: "", // Email Text
    data: {} // data gives to ejs
});

```


### License MIT
