const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                console: "readonly",
                module: "readonly",
                require: "readonly",
                Promise: "readonly",
                describe: "readonly",
                it: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
                expect: "readonly",
                fail: "readonly"
            }
        },
        rules: {
            // Best practices
            "array-callback-return": "error",
            "block-scoped-var": "error",
            "curly": ["error", "all"],
            "default-case-last": "error",
            "default-param-last": "error",
            "dot-notation": ["error", {"allowKeywords": false}],
            "eqeqeq": "error",
            "no-constructor-return": "error",
            "no-empty-function": "error",
            "no-invalid-this": "error",
            "no-lonely-if": "error",
            "no-multi-assign": "error",
            "no-negated-condition": "error",
            "no-new": "error",
            "no-return-assign": "error",
            "no-self-compare": "error",
            "no-template-curly-in-string": "error",
            "no-unmodified-loop-condition": "error",
            "no-unreachable-loop": "error",
            "no-useless-catch": "warn",
            "no-useless-concat": "error",
            "no-useless-constructor": "error",
            "no-useless-return": "error",
            "no-var": "error",
            "object-shorthand": "error",
            "operator-assignment": "error",
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            "prefer-exponentiation-operator": "error",
            "prefer-template": "error",
            "require-await": "error",
            "yoda": "error",

            // Variables
            "init-declarations": "error",
            "no-use-before-define": ["error", {"functions": false, "variables": false}],

            // Possible problems
            "no-promise-executor-return": "error",
            "no-self-assign": "error",
            "no-loss-of-precision": "error",
            "no-unsafe-optional-chaining": "error",
            "valid-typeof": "error",

            // Complexity limits
            "max-lines": ["warn", {"max": 500}],
            "max-lines-per-function": ["warn", {
                "max": 50,
                "skipBlankLines": true,
                "skipComments": true
            }],
            "max-params": "warn",

            // Magic numbers
            "no-magic-numbers": ["error", {
                "ignoreArrayIndexes": true,
                "ignoreClassFieldInitialValues": true,
                "ignoreDefaultValues": true,
                "ignore": [0, 1, 2, -1, 3, -2]
            }]
        }
    }
];
