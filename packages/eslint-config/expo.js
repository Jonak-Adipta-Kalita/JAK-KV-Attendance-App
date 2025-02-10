import { config as reactInternalConfig } from "./react-internal.js";

/**
 * A custom ESLint configuration for libraries that use Expo.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const expoConfig = [...reactInternalConfig];
