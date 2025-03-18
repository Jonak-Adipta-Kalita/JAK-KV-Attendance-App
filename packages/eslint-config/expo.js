// import pluginExpo from "eslint-plugin-expo";
import pluginReactCompiler from "eslint-plugin-react-compiler";
import pluginReactNative from "eslint-plugin-react-native";
import { config as reactInternalConfig } from "./react-internal.js";

/**
 * A custom ESLint configuration for libraries that use Expo.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const expoConfig = [
    ...reactInternalConfig,
    {
        plugins: {
            "react-native": pluginReactNative,
        },
        rules: {
            ...pluginReactNative.configs.all.rules,
            // ...pluginExpo.rules,
            "react-native/no-color-literals": "off",
            "react-native/no-inline-styles": "off",
        },
    },
    {
        plugins: {
            "react-compiler": pluginReactCompiler,
            rules: {
                "react-compiler/react-compiler": "error",
            },
        },
    },
];
