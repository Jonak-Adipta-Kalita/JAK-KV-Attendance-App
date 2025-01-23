module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "expo",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-native/all",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
    },
    plugins: [
        "prettier",
        "react",
        "react-hooks",
        "@typescript-eslint",
        "react-native",
        "eslint-plugin-react-compiler",
    ],
    ignorePatterns: ["/dist/*"],
    rules: {
        "prettier/prettier": "off",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
        "@typescript-eslint/no-unused-vars": "off",
        "react/jsx-props-no-spreading": "off",
        "react-hooks/exhaustive-deps": "off",
        "import/prefer-default-export": "off",
        "react-native/no-color-literals": "off",
        "react-native/no-inline-styles": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-require-imports": "off",
        "react-compiler/react-compiler": "error",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
