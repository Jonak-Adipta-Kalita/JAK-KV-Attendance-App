import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [sharedConfig, require("nativewind/preset")],
};

export default config;
