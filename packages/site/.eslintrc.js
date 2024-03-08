module.exports = {
  "extends": [
    "../../.eslintrc.js"
  ],
  "parserOptions": {
    "tsconfigRootDir": "/Users/zongzheng/Projects/iotex-snap/packages/site"
  },
  "overrides": [
    {
      "files": [
        "*.ts",
        "*.tsx"
      ],
      "extends": [
        "@metamask/eslint-config-browser"
      ]
    }
  ],
  "ignorePatterns": [
    ".cache/",
    "public/"
  ],
  "rules": {
    "import/no-unassigned-import": 0,
    "n/global-require": 0,
    "prettier/prettier": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "lines-between-class-members": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "import/order": 0,
    "@typescript-eslint/promise-function-async": 0,
    "@typescript-eslint/no-misused-promises": 0,
    "id-length": 0,
    "@typescript-eslint/consistent-type-imports": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-unnecessary-type-assertion": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/consistent-type-definitions": 0,
    "@typescript-eslint/naming-convention": 0,
    "jsdoc/require-jsdoc": 0,
    "require-unicode-regexp": 0,
    "no-empty": 0,
    "no-restricted-globals": 0,
    "prefer-template": 0,
    "@typescript-eslint/prefer-reduce-type-parameter": 0
  }
}