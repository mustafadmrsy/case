import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import Providers from "./providers";
import { getMessages } from "next-intl/server";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "E-Ticaret",
	description: "TR/EN, SEO, Performans odaklı e-ticaret",
};

type Props = {
	children: React.ReactNode;
	params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
	const messages = await getMessages();
	return (
		<html lang={params.locale}>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}


