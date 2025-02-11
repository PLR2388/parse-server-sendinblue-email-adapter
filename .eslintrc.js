module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended"
    ],
    overrides: [],
    parserOptions: {ecmaVersion: "latest"},
    rules: {
        "no-tabs": "off",
        "no-undef": "off",
        "array-callback-return": "error",
        "getter-return": "error",
        "arrow-spacing": ["error", {"before": true, "after": true}],
        "block-spacing": "error",
        "brace-style": "error",
        "comma-spacing": "error",
        "comma-style": "error",
        "eol-last": "error",
        "func-call-spacing": "error",
        "key-spacing": "error",
        "keyword-spacing": "error",
        "line-comment-position": "error",
        "lines-between-class-members": "error",
        "max-len": "warn",
        "max-statements-per-line": "error",
        "multiline-ternary": ["error", "always-multiline"],
        "new-parens": "error",
        "newline-per-chained-call": "error",
        "no-extra-parens": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-multi-spaces": "error",
        "no-multiple-empty-lines": ["error", {"max": 1}],
        "no-trailing-spaces": "error",
        "no-whitespace-before-property": "error",
        "nonblock-statement-body-position": "error",
        "operator-linebreak": ["error", "after"],
        "quotes": [
            "error",
            "double",
            {"avoidEscape": true, "allowTemplateLiterals": true}
        ],
        "rest-spread-spacing": "error",
        "semi": "error",
        "semi-spacing": "error",
        "space-before-blocks": "error",
        "space-before-function-paren": ["error",
            {
                "anonymous": "never",
                "named": "never",
                "asyncArrow": "always"
            }],
        "space-in-parens": "error",
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        "switch-colon-spacing": "error",
        "template-curly-spacing": "error",
        "wrap-regex": "error",
        "arrow-body-style": "error",
        "block-scoped-var": "error",
        "class-methods-use-this": "error",
        "curly": ["error", "all"],
        "default-case-last": "error",
        "default-param-last": "error",
        "dot-notation": ["error", {"allowKeywords": false}],
        "eqeqeq": "error",
        "init-declarations": "error",
        "max-lines": ["warn", {"max": 500}],
        "max-lines-per-function": ["warn", {
            "max": 50,
            "skipBlankLines": true,
            "skipComments": true
        }],
        "max-params": "warn",
        "no-delete-var": "error",
        "no-empty": "error",
        "no-empty-function": "error",
        "no-floating-decimal": "error",
        "no-invalid-this": "error",
        "no-lonely-if": "error",
        "no-magic-numbers": ["error",
            {
                "ignoreArrayIndexes": true,
                "ignoreClassFieldInitialValues": true,
                "ignoreDefaultValues": true,
                "ignore": [0, 1, 2, -1, 3, -2]
            }],
        "no-multi-assign": "error",
        "no-negated-condition": "error",
        "no-new": "error",
        "no-redeclare": "error",
        "no-return-assign": "error",
        "no-useless-catch": "warn",
        "no-useless-concat": "error",
        "no-useless-constructor": "error",
        "no-useless-escape": "error",
        "no-useless-return": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "operator-assignment": "error",
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "prefer-exponentiation-operator": "error",
        "require-await": "error",
        "sort-vars": "error",
        "yoda": "error",
        "no-constant-condition": "error",
        "no-constructor-return": "error",
        "no-dupe-args": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-loss-of-precision": "error",
        "no-promise-executor-return": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-template-curly-in-string": "error",
        "no-unreachable-loop": "error",
        "no-unmodified-loop-condition": "error",
        "no-unreachable": "error",
        "no-unsafe-negation": "error",
        "no-unsafe-optional-chaining": "error",
        "no-unused-private-class-members": "warn",
        "no-use-before-define": "error",
        "valid-typeof": "error",
        "prefer-template": "error"
    },
};
