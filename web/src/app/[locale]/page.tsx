import LinkButton from "./ui/LinkButton";
import { getTranslations } from "next-intl/server";
import ProductsGrid from "./products/ProductsGrid";

async function getProducts() {
	const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
	if (!res.ok) return [];
	return res.json();
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "home" });
	const products = (await getProducts()).slice(0, 4);
	return (
		<div className="space-y-8">
			<div className="rounded-2xl border border-white/10 p-8 bg-white/5 backdrop-blur">
				<h1 className="text-3xl font-bold mb-2 text-white">{t("title")}</h1>
				<p className="text-white/70 mb-4">{t("subtitle")}</p>
				<div className="flex gap-3">
					<LinkButton href="/products" variant="primary">
						{t("goProducts")}
					</LinkButton>
					<LinkButton href="/cart" variant="ghost">
						{t("goCart")}
					</LinkButton>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-semibold mb-3 text-white">{t("featured")}</h2>
				<ProductsGrid products={products} priorityFirst />
			</div>
		</div>
	);
}

export async function generateMetadata() {
	return {
		title: "E‑Ticaret | Ana Sayfa",
		description: "Öne çıkan ürünler ve kategoriler",
		openGraph: {
			title: "E‑Ticaret | Ana Sayfa",
			description: "Öne çıkan ürünler ve kategoriler",
			images: [{ url: "/next.svg", width: 1200, height: 630, alt: "E‑Ticaret" }],
		},
		twitter: {
			card: "summary_large_image",
			title: "E‑Ticaret | Ana Sayfa",
			description: "Öne çıkan ürünler ve kategoriler",
			images: ["/next.svg"],
		},
	};
}

export const revalidate = 60;

export function generateStaticParams() {
	return [{ locale: "tr" }, { locale: "en" }];
}


