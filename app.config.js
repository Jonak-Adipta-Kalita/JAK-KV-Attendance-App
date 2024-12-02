require("dotenv").config();

const PROJECT_ID = process.env.PROJECT_ID;
const PROJECT_NAME = process.env.PROJECT_NAME;
const PROJECT_PACKAGE = process.env.PROJECT_PACKAGE;
const PROJECT_SCHEME = process.env.PROJECT_SCHEME;

if (!PROJECT_ID || !PROJECT_NAME || !PROJECT_PACKAGE || !PROJECT_SCHEME) {
    throw new Error(
        "Missing environment variables for Expo Config. Please check your .env file."
    );
}

export default {
    name: "kv-attendance-app",
    slug: PROJECT_NAME,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: PROJECT_SCHEME,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#333333",
    },
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#333333",
        },
        package: PROJECT_PACKAGE,
    },
    plugins: ["expo-router", "expo-secure-store"],
    experiments: {
        typedRoutes: true,
        reactCompiler: true,
    },
    extra: {
        router: {
            origin: false,
        },
        eas: {
            projectId: PROJECT_ID,
        },
    },
};
