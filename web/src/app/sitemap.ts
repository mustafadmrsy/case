import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
	const locales = ["tr", "en"] as const;
	const staticPaths = ["", "/products", "/cart"]; // locale ile birleştirilecek

	const productRes = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
	const products: Array<{ id: number }> = productRes.ok ? await productRes.json() : [];

	const entries: MetadataRoute.Sitemap = [];
	for (const locale of locales) {
		for (const p of staticPaths) {
			entries.push({ url: `${baseUrl}/${locale}${p}`, changeFrequency: "weekly", priority: 0.7 });
		}
		for (const p of products.slice(0, 100)) {
			entries.push({ url: `${baseUrl}/${locale}/products/${p.id}`, changeFrequency: "weekly", priority: 0.6 });
		}
	}
	return entries;
}


