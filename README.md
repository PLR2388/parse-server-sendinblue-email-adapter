This is a fork from  @seeck/parse-server-sendinblue-email-adapter

# @plr2388/parse-server-sendinblue-email-adapter
Used to send Parse Server password reset emails, and verification emails through Brevo (formerly Sendinblue)

### Installation
```
npm install @plr2388/parse-server-sendinblue-email-adapter --save
```

### Configuration
```javascript
var api = new ParseServer({
  ...
  // Your application name. It may appear into the subject and body of the emails that are sent.
  appName: "My App",
  // The options for the email adapter
  emailAdapter: {
    module: "@plr2388/parse-server-sendinblue-adapter",
    options: {
      // The API key of the SendinBlue account (required)
      // WARNING: USE ENVIRONMENT VARIABLE HERE !!! DO NOT EXPOSE YOUR API_KEY !!!
      apiKey: "YOUR_SENDINBLUE_API_KEY",
      // The default sender name (required)
      fromName: "The Sender",
      // The default sender email address (required)
      fromEmail: "email@yourdomain.com",
      // The languages preferences (required)
      translation: {
        default: "en", // default locale for templates and texts (required)
        locale: "locale" // the name of the property that stores the language of the user into the User table. It must be a two-letter language code: 'en', 'fr', 'de' etc. (optional)
      },

      /**
       * Options for the reset password emails
       */

      // Set it to use templates of the SendinBlue account (optional)
      passwordResetTemplateId: {
        en: 12345,  // the template id to use for english user
        fr: 67890   // the template id to use for french user
      },

      // 1. set the subject here, according to the languages you support.
      // Required only if passwordResetTemplateId is not defined.
      passwordResetSubject: {
        en: "Reset My Password on {{ params.appName }}",
        fr: "Réinitialiser mon mot de passe sur {{ params.appName }}"
      },
      // 2. set the plain text part here, according to the languages you support.
      // Required only if passwordResetTemplateId is not defined.
      passwordResetTextPart: {
        en: "Hello,\n\nYou requested to reset your password for {{ params.appName }}.\n\nPlease, click here to set a new password: {{ params.link }}",
        fr: "Bonjour,\n\nVous avez demandé la réinitialiser de votre mot de passe pour {{ params.appName }}.\n\nMerci de cliquer ici pour choisir un nouveau mot de passe : {{ params.link }}"
      },
      // 3. set the html text part here, according to the languages you support.
      // Required only if passwordResetTemplateId is not defined.
      passwordResetHtmlPart: {
        en: "Hi,<p>You requested to reset your password for <b>{{ params.appName }}</b>.</p><p>Please, click <a href=\"{{ params.link }}\">here</a> to set a new password.</p>",
        fr: "Bonjour,<p>Vous avez demandé la réinitialiser de votre mot de passe pour <b>{{ params.appName }}</b>.</p><p>Merci de cliquer <a href=\"{{ params.link }}\">ici</a> pour choisir un nouveau mot de passe.</p>"
      },

      /**
       * Options for the email verification emails
       */

      // Set it to use templates of the SendinBlue account (optional)
      verificationEmailTemplateId: {
        en: 12345,  // the template id to use for english user
        fr: 67890   // the template id to use for french user
      },

      // 1. set the subject here, according to the languages you support.
      // Required only if verificationEmailTemplateId is not defined.
      verificationEmailSubject: {
        en: "Verify your email",
        fr: "Vérifier votre adresse e-mail"
      },
      // 2. set the plain text part here, according to the languages you support.
      // Required only if verificationEmailTemplateId is not defined.
      verificationEmailTextPart: {
        en: "Hi,\n\nYou are being asked to confirm the e-mail address {{ params.email }} with {{ params.appName }}\n\nClick here to confirm it: {{ params.link }}",
        fr: "Bonjour,\n\nMerci de confirmer l'adresse e-mail {{ params.email }} avec {{ params.appName }}\n\nCliquez ici pour confirmer : {{ params.link }}"
      },
      // 3. set the html text part here, according to the languages you support.
      // Required only if verificationEmailTemplateId is not defined.
      verificationEmailHtmlPart: {
        en: "Hi,<p>You are being asked to confirm the e-mail address {{ params.email }} with <b>{{ params.appName }}</b></p><p>Click <a href=\"{{ params.link }}\">here</a> to confirm it.</p>",
        fr: "Bonjour,<p>Merci de confirmer l'adresse e-mail {{ params.email }} avec <b>{{ params.appName }}</b></p><p>Cliquez <a href=\"{{ params.link }}\">ici</a> pour confirmer.</p>"
      },
      
      // Pass host url if you needed (optional)
      hostUrl: serverUrl.replace( mountPath, "" ),

      // Optional: A callback function that returns the options used for sending
      // verification and password reset emails. The returned options are merged
      // with this options object.
      // If needed, this function can also return a promise for an options object.
      getIndividualOptions: function(targetOpts) {
        var toMail = targetOpts.to || (targetOpts.user && targetOpts.user.get("email"));
        if (toMail === "queen@buckingham.palace") {
          return {
            passwordResetSubject: {
              en: "Please reset your password your Highness",
              fr: "Veuillez réinitialiser votre mot de passe Votre Altesse"
            }
          };
        }
        return {};
      }
    }
  }
  ...
});
```

### Supported variables

The following variables in a template or a text in ParseServer options are replaced by their associated value automatically:

 - {{ params.email }}
 - {{ params.appName }}
 - {{ params.link }}
 - {{ params.linkShort }}
 - {{ params.username }}
 - {{ params.hostUrl }}

The variables **{{ params.email }}**, **{{ params.appName }}** and **{{ params.link }}** are automatically replaced with the email of the recipient, the name you provided for your application and the link to reset the password or to verify the email. Note that one space after **{{** et before **}}** is required.

It may happen, when you use a button into your templates for example, that SendinBlue prefixes automatically the link with a scheme (http:// or https://). In this case, use **{{ params.linkShort }}** instead of **{{ params.link }}** into your template.

You can use either templates, or texts to send the emails to reset password or to verify the account.

When you want to send the reset password emails: if you do not define the ids of the templates into **passwordResetTemplateId**, then passwordResetSubject, passwordResetTextPart and passwordResetHtmlPart are required.

When you want to send the verification emails: if you do not define the ids of the templates into **verificationEmailTemplateId**, then verificationEmailSubject, verificationEmailTextPart and verificationEmailHtmlPart are required.

### Multilanguage
The option **translation.default** must contain the code of the language to use for the emails.

If you store the language of your users into a property of the user, assign the name of this property to the option **translation.locale**.

This way, when an email is sent, the adapter checks if a property to get the language of the user exists. If it does not exist, or it is not set, or there is no email template or text defined for the specific language of the user, it will use **translation.default** as the default language to send the emails.

This requires to use a two-letter language code to store the language of the user: "en", "fr", "de" etc.

To define a specific template id or text for a given language, just use the key/value pair like this when you define your templates ids or texts:

```javascript
// The templates ids of the emails sent to verify the account
verificationEmailTemplateId: {
  en: 12345, // the template id to use for english user
  fr: 67890  // the template id to use for french user
},
```

```javascript
// The subjects of the emails sent to reset password
passwordResetSubject: {
  en: "Reset My Password on {{ params.appName }}", // the subject to for english user
  fr: "Réinitialiser mon mot de passe sur {{ params.appName }}" // the subject to for french user
}
```

Same thing for the texts : passwordResetTextPart, passwordResetHtmlPart, verificationEmailSubject, verificationEmailTextPart, verificationEmailHtmlPart.

### Tests
The test file spec/sendinblue_adapter_spec.js is here to allow you to test the module without deploying a parse-server. It tests several settings: with templates, with plain/html text etc. You will have to update the variables into the **customization part** of the file to test the emails by your own. Use your own SendinBlue account, your own templates and your own email addresses. Once you correctly set the variables, you receive the 20 tests emails by running this command:

```
npm test
```
