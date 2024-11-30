module.exports = {
    extends: ["expo", "prettier"],
    plugins: ["prettier"],
    ignorePatterns: ["/dist/*"],

    rules: {
        "prettier/prettier": "off",
        "@typescript-eslint/no-unused-vars": "off",
    },
};
