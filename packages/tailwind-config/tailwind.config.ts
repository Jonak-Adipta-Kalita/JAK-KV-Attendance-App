import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
    theme: {
        extend: {
            colors: {
                background: "var(--color-background)",
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
            },
            textColor: {
                primary: "var(--color-text-primary)",
                secondary: "var(--color-text-secondary)",
            },
            placeholderColor: {
                primary: "var(--color-text-primary)",
                secondary: "var(--color-text-secondary)",
            },
        },
    },
    plugins: [],
};
export default config;
