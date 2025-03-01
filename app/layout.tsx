import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Directions } from "../constant/enums";
import { ThemeProvider } from "../provider/theme-provider";
import { NotificationsProvider } from "../provider/pusherContext";

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
        <NotificationsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader />
            <div className="container mx-auto px-4 py-3 flex justify-end"></div>
            <main className="min-h-screen">{children}</main>
            <Toaster position="top-center" />
          </ThemeProvider>
        </NotificationsProvider>

        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
