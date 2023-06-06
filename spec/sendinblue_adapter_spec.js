/**
 * @module Integration tests for SendinBlue adapter
 * @description Uses different configuration to send tests emails
 */
describe("SendinBlue adapter sending tests", () => {
    /** CUSTOMIZATION PART BEGINS HERE: SET YOUR OWN VALUES TO TEST THE EMAILS BY YOUR OWN **/

        // The api key of the SendinBlue account.
        // WARNING: USE ENVIRONMENT VARIABLE HERE !!! DO NOT EXPOSE YOUR API_KEY !!!
    const apiKey = "YOUR_SENDINBLUE_API_KEY";

    // the application attributes
    // replace it with the name of your application
    const appName = "My App";
    // replace it with the name of the sender you want
    const fromName = "The Sender";
    // replace it with a sender of the SendinBlue account
    const fromEmail = "mail@yourdomain.com";
    // replace it with any link to test
    const passwordLink = "https://github.com/password";
    // replace it with any link to test
    const verificationLink = "https://github.com/verification";
    // id of your english template for the verification link email
    const verificationEmailTemplateId_en = 1;
    // id of your french template for the verification link email
    const verificationEmailTemplateId_fr = 2;
    // id of your english template for the reset password email
    const passwordResetTemplateId_en = 3;
    // id of your french template for the reset password email
    const passwordResetTemplateId_fr = 4;

    // dummy user for the tests
    const user = {
        // replace it with your email address
        email: "mail@yourdomain.com",
        // replace it with your email address
        username: "mail@yourdomain.com",
        get(key) {
            return this[key];
        }
    };

    /** CUSTOMIZATION PART ENDS HERE **/

    afterEach(() => {
        delete user.locale;
    });

    /**
     * Bad settings - Basic options
     */
    describe("Bad settings - Basic options", () => {
        let options = undefined;

        beforeEach(() => {
            options = {
                apiKey,
                fromName,
                fromEmail,
                translation: {
                    default: "en"
                },
                passwordResetTemplateId: {
                    en: passwordResetTemplateId_en
                },
                verificationEmailTemplateId: {
                    en: verificationEmailTemplateId_en
                }
            };
        });

        const it_bad = function () {
            let adapter = undefined;

            try {
                adapter = require("../index.js")(options);
                fail("An error was expected");
            } catch (error) {
                expect(error).toEqual("SendinBlueAdapter requires: an API key, a default email for the sender, a default name for the sender and the translation default options.");
            }
        };

        it("No options", () => {
            options = null;
            it_bad();
        });

        it("No apiKey", () => {
            delete options.apiKey;
            it_bad();
        });

        it("No sender name", () => {
            delete options.fromName;
            it_bad();
        });

        it("No sender email", () => {
            delete options.fromEmail;
            it_bad();
        });

        it("No translation options", () => {
            delete options.translation;
            it_bad();
        });

        it("No translation default options", () => {
            delete options.translation["default"];
            it_bad();
        });
    });

    /**
     * Bad settings - Reset password
     */
    describe("Bad settings - Reset password", () => {
        let options;

        beforeEach(() => {
            options = {
                apiKey,
                fromName,
                fromEmail,
                translation: {
                    default: "en"
                },
                passwordResetSubject: {
                    en: "Reset My Password on %APP_NAME%"
                },
                passwordResetTextPart: {
                    en: "Hello,\n\nYou requested to reset your password for %APP_NAME%.\n\nPlease, click here to set a new password: %LINK%"
                },
                passwordResetHtmlPart: {
                    en: "Hi,<p>You requested to reset your password for <b>%APP_NAME%</b>.</p><p>Please, click <a href=\"%LINK%\">here</a> to set a new password.</p>"
                },
                verificationEmailTemplateId: {
                    en: verificationEmailTemplateId_en
                }
            };
        });

        const it_bad = function () {
            let adapter;

            try {
                adapter = require("../index.js")(options);
                fail("An error was expected");
            } catch (error) {
                expect(error).toEqual("If passwordResetTemplateId is not set, you have to define passwordResetSubject, passwordResetTextPart and passwordResetHtmlPart.");
            }
        };

        it("No template id, no subject", () => {
            delete options.passwordResetSubject;
            it_bad();
        });

        it("No template id, no text", () => {
            delete options.passwordResetTextPart;
            it_bad();
        });

        it("No template id, no html", () => {
            delete options.passwordResetHtmlPart;
            it_bad();
        });
    });

    /**
     * Bad settings - Verification
     */
    describe("Bad settings - Verification", () => {
        let options;

        beforeEach(() => {
            options = {
                apiKey,
                fromName,
                fromEmail,
                translation: {
                    default: "en"
                },
                passwordResetTemplateId: {
                    en: passwordResetTemplateId_en
                },
                verificationEmailSubject: {
                    en: "Verify your email on %APP_NAME%"
                },
                verificationEmailTextPart: {
                    en: "Hi,\n\nYou are being asked to confirm the e-mail address {EMAIL} with %APP_NAME%\n\nClick here to confirm it: %LINK%"
                },
                verificationEmailHtmlPart: {
                    en: "Hi,<p>You are being asked to confirm the e-mail address {EMAIL} with <b>%APP_NAME%</b></p><p>Click <a href=\"%LINK%\">here</a> to confirm it.</p>"
                }
            };
        });

        const it_bad = function () {
            let adapter;

            try {
                adapter = require("../index.js")(options);
                fail("An error was expected");
            } catch (error) {
                expect(error).toEqual("If verificationEmailTemplateId is not set, you have to define verificationEmailSubject, verificationEmailTextPart and verificationEmailHtmlPart.");
            }
        };

        it("No template id, no subject", () => {
            delete options.verificationEmailSubject;
            it_bad();
        });

        it("No template id, no text", () => {
            delete options.verificationEmailTextPart;
            it_bad();
        });

        it("No template id, no html", () => {
            delete options.verificationEmailHtmlPart;
            it_bad();
        });
    });

    /**
     * sendMail
     */
    describe("sendMail", () => {
        let adapter;

        beforeEach(() => {
            adapter = require("../index.js")({
                apiKey,
                fromName,
                fromEmail,
                translation: {
                    default: "en",
                    locale: "locale"
                },
                passwordResetTemplateId: {
                    en: passwordResetTemplateId_en
                },
                verificationEmailTemplateId: {
                    en: verificationEmailTemplateId_en
                }
            });
        });

        const it_sendMail = function (done) {
            adapter.sendMail({
                appName,
                link: "https://github.com/",
                to: user.email,
                subject: "[Test] %APP_NAME%",
                text: "Use your {EMAIL} here for %APP_NAME% : %LINK%",
                html: "Use your {EMAIL} <a href=\"%LINK%\">here</a> for <b>%APP_NAME%</b>"

            }).then(() => {
                done();

            })
                ["catch"]((error) => {
                throw new Error(error);
                done();
            });
        };

        it("The user has no explicit locale set", (done) => {
            it_sendMail(done);
        });

        it("The user is an explicit english user", (done) => {
            user.locale = "en";
            it_sendMail(done);
        });

        it("The user is an explicit german user", (done) => {
            user.locale = "de";
            it_sendMail(done);
        });

        it("The user is an explicit french user", (done) => {
            user.locale = "fr";
            it_sendMail(done);
        });
    });

    /**
     * sendVerificationEmail
     */
    describe("sendVerificationEmail", () => {
        let adapter;

        const it_sendVerificationEmail = function (done) {
            adapter.sendVerificationEmail({
                user,
                appName,
                link: verificationLink

            }).then(() => {
                done();

            })
                ["catch"]((error) => {
                throw new Error(error);
                done();
            });
        };

        /**
         * sendVerificationEmail - Use template
         */
        describe("Use template", () => {

            beforeEach(() => {
                adapter = require("../index.js")({
                    apiKey,
                    fromName,
                    fromEmail,
                    translation: {
                        default: "en",
                        locale: "locale"
                    },
                    passwordResetTemplateId: {
                        en: passwordResetTemplateId_en
                    },
                    verificationEmailTemplateId: {
                        en: verificationEmailTemplateId_en,
                        fr: verificationEmailTemplateId_fr
                    }
                });
            });

            it("The user has no explicit locale set", (done) => {
                it_sendVerificationEmail(done);
            });

            it("The user is an explicit english user", (done) => {
                user.locale = "en";
                it_sendVerificationEmail(done);
            });

            it("The user is an explicit german user", (done) => {
                user.locale = "de";
                it_sendVerificationEmail(done);
            });

            it("The user is an explicit french user", (done) => {
                user.locale = "fr";
                it_sendVerificationEmail(done);
            });
        });

        /**
         * sendVerificationEmail - Use plain/html options
         */
        describe("Use plain/html options", () => {

            beforeEach(() => {
                adapter = require("../index.js")({
                    apiKey,
                    fromName,
                    fromEmail,
                    translation: {
                        default: "en",
                        locale: "locale"
                    },
                    passwordResetTemplateId: {
                        en: passwordResetTemplateId_en
                    },
                    verificationEmailSubject: {
                        en: "Verify your email on %APP_NAME%",
                        fr: "Vérifier votre adresse e-mail sur %APP_NAME%"
                    },
                    verificationEmailTextPart: {
                        en: "Hi,\n\nYou are being asked to confirm the e-mail address {EMAIL} with %APP_NAME%\n\nClick here to confirm it: %LINK%",
                        fr: "Bonjour,\n\nMerci de confirmer l'adresse e-mail {EMAIL} avec %APP_NAME%\n\nCliquez ici pour confirmer : %LINK%"
                    },
                    verificationEmailHtmlPart: {
                        en: "Hi,<p>You are being asked to confirm the e-mail address {EMAIL} with <b>%APP_NAME%</b></p><p>Click <a href=\"%LINK%\">here</a> to confirm it.</p>",
                        fr: "Bonjour,<p>Merci de confirmer l'adresse e-mail {EMAIL} avec <b>%APP_NAME%</b></p><p>Cliquez <a href=\"%LINK%\">ici</a> pour confirmer.</p>"
                    }
                });
            });

            it("The user has no explicit locale set", (done) => {
                it_sendVerificationEmail(done);
            });

            it("The user is an explicit english user", (done) => {
                user.locale = "en";
                it_sendVerificationEmail(done);
            });

            it("The user is an explicit german user", (done) => {
                user.locale = "de";
                it_sendVerificationEmail(done);
            });

            it("The user is an explicit french user", (done) => {
                user.locale = "fr";
                it_sendVerificationEmail(done);
            });
        });
    });

    /**
     * sendPasswordResetEmail
     */
    describe("sendPasswordResetEmail", () => {
        let adapter;

        const it_sendPasswordResetEmail = function (done) {
            adapter.sendPasswordResetEmail({
                user,
                appName,
                link: passwordLink

            }).then(() => {
                done();

            })
                ["catch"]((error) => {
                throw new Error(error);
                done();
            });
        };

        /**
         * sendPasswordResetEmail - Use template
         */
        describe("Use template", () => {

            beforeEach(() => {
                adapter = require("../index.js")({
                    apiKey,
                    fromName,
                    fromEmail,
                    translation: {
                        default: "en",
                        locale: "locale"
                    },
                    passwordResetTemplateId: {
                        en: passwordResetTemplateId_en,
                        fr: passwordResetTemplateId_fr
                    },
                    verificationEmailTemplateId: {
                        en: verificationEmailTemplateId_en
                    }
                });
            });

            it("The user has no explicit locale set", (done) => {
                it_sendPasswordResetEmail(done);
            });

            it("The user is an explicit english user", (done) => {
                user.locale = "en";
                it_sendPasswordResetEmail(done);
            });

            it("The user is an explicit german user", (done) => {
                user.locale = "de";
                it_sendPasswordResetEmail(done);
            });

            it("The user is an explicit french user", (done) => {
                user.locale = "fr";
                it_sendPasswordResetEmail(done);
            });
        });

        /**
         * sendPasswordResetEmail - Use plain/html options
         */
        describe("Use plain/html options", () => {

            beforeEach(() => {
                adapter = require("../index.js")({
                    apiKey,
                    fromName,
                    fromEmail,
                    translation: {
                        default: "en",
                        locale: "locale"
                    },
                    passwordResetSubject: {
                        en: "Reset My Password on %APP_NAME%",
                        fr: "Réinitialiser mon mot de passe sur %APP_NAME%"
                    },
                    passwordResetTextPart: {
                        en: "Hello,\n\nYou requested to reset your password for %APP_NAME%.\n\nPlease, click here to set a new password: %LINK%",
                        fr: "Bonjour,\n\nVous avez demandé la réinitialiser de votre mot de passe pour %APP_NAME%.\n\nMerci de cliquer ici pour choisir un nouveau mot de passe : %LINK%"
                    },
                    passwordResetHtmlPart: {
                        en: "Hi,<p>You requested to reset your password for <b>%APP_NAME%</b>.</p><p>Please, click <a href=\"%LINK%\">here</a> to set a new password.</p>",
                        fr: "Bonjour,<p>Vous avez demandé la réinitialiser de votre mot de passe pour <b>%APP_NAME%</b>.</p><p>Merci de cliquer <a href=\"%LINK%\">ici</a> pour choisir un nouveau mot de passe.</p>"
                    },
                    verificationEmailTemplateId: {
                        en: verificationEmailTemplateId_en
                    }
                });
            });

            it("The user has no explicit locale set", (done) => {
                it_sendPasswordResetEmail(done);
            });

            it("The user is an explicit english user", (done) => {
                user.locale = "en";
                it_sendPasswordResetEmail(done);
            });

            it("The user is an explicit german user", (done) => {
                user.locale = "de";
                it_sendPasswordResetEmail(done);
            });

            it("The user is an explicit french user", (done) => {
                user.locale = "fr";
                it_sendPasswordResetEmail(done);
            });
        });
    });
});
