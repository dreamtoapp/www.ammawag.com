import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Directions } from "../constant/enums";
import { ThemeProvider } from "../provider/theme-provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const messages = await getMessages();
  // const locale = await getLocale();
  const locale = "ar"; // Hardcoded for now
  const dir = Directions.RTL; // Set direction dynamically later

  const fontClass = dir === Directions.RTL ? "font-cairo" : "font-roboto"; // Use Tailwind directly

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`min-h-screen bg-background antialiased ${fontClass}`}>
        {/* <NextIntlClientProvider locale={locale} messages={messages}> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
