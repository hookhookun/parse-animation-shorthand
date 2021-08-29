module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    env: {es6: true},
    rules: {
        'quotes': 'off',
        '@typescript-eslint/quotes': ['error', 'single'],
        'semi': 'off',
        '@typescript-eslint/semi': 'error',
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': 'off',
        '@typescript-eslint/comma-spacing': ['error', {before: false, after: true}],
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {delimiter: 'comma', requireLast: true},
            singleline: {delimiter: 'comma', requireLast: false},
        }],
        'quote-props': ['error', 'consistent-as-needed'],
    },
    overrides: [
        {
            files: [
                '.eslintrc.js',
            ],
            env: {node: true},
        },
        {
            files: [
                './src/getCustomIdent.ts',
                './src/getString.ts',
            ],
            rules: {
                'no-constant-condition': 'off',
            },
        },
    ],
};
