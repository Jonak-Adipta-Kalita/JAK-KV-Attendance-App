import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "KV Attendance App - Admin",
    description: "Made by Jonak Adipta Kalita - no SEO please",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
