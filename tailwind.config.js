/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
    presets: [require("nativewind/preset")],
};
