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
  // const locale = "ar";
  const dir = Directions.RTL; // تعيين الاتجاه ديناميكيًا لاحقًا

  const fontClass = dir === Directions.RTL ? "font-cairo" : "font-roboto"; // استخدم Tailwind مباشرةً

  return (
    <html dir={dir} suppressHydrationWarning>
      <body className={`min-h-screen bg-background antialiased ${fontClass}`}>
        {/* <NextIntlClientProvider locale={locale} messages={messages}> */}
        <NextTopLoader />
        <ThemeProvider>{children}</ThemeProvider>
        {/* </NextIntlClientProvider> */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
