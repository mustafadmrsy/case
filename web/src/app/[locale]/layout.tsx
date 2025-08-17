import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import Providers from "./providers";
import { setRequestLocale } from "next-intl/server";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

export const metadata: Metadata = {
	title: "E-Ticaret",
	description: "TR/EN, SEO, Performans odaklı e-ticaret",
};

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
	const { locale: rawLocale } = await params;
	const locale = rawLocale === "en" ? "en" : "tr";
	setRequestLocale(locale);
	const messages = (await import(`../../messages/${locale}.json`)).default as AbstractIntlMessages;
	return (
		<NextIntlClientProvider key={locale} locale={locale} messages={messages}>
			<Providers>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-1 container mx-auto px-4 py-6 max-w-6xl">{children}</main>
					<Footer />
				</div>
			</Providers>
		</NextIntlClientProvider>
	);
}

export function generateStaticParams() {
    return [{ locale: "tr" }, { locale: "en" }];
}


