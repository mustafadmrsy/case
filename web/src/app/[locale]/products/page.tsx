import ProductsGrid from "./ProductsGrid";
import ProductsToolbar from "./toolbar/ProductsToolbar";
import { getTranslations } from "next-intl/server";

async function getProducts() {
	const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
	if (!res.ok) throw new Error("Failed to fetch products");
	return res.json();
}

async function getCategories() {
	const res = await fetch("https://fakestoreapi.com/products/categories", { next: { revalidate: 60 } });
	if (!res.ok) return [] as string[];
	return res.json();
}

export default async function ProductsPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string; min?: string; max?: string; sort?: string }> }) {
	const [{ locale }, sp] = await Promise.all([params, searchParams]);
	const t = await getTranslations({ locale, namespace: "products" });
	const [productsRaw, categories] = await Promise.all([getProducts(), getCategories()]);

	const category = (sp.category ?? "").trim();
	const min = Number(sp.min ?? "");
	const max = Number(sp.max ?? "");
	const sort = (sp.sort ?? "").trim();

	let products = productsRaw as Array<{ id: number; title: string; price: number; image: string; category?: string }>; 

	if (category) {
		products = products.filter((p) => String(p.category).toLowerCase() === category.toLowerCase());
	}
	if (!Number.isNaN(min)) {
		products = products.filter((p) => p.price >= min);
	}
	if (!Number.isNaN(max) && max > 0) {
		products = products.filter((p) => p.price <= max);
	}
	if (sort === "price-asc") {
		products = [...products].sort((a, b) => a.price - b.price);
	} else if (sort === "price-desc") {
		products = [...products].sort((a, b) => b.price - a.price);
	}

	return (
		<div className="p-8 space-y-6">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
				<h1 className="text-2xl font-bold">{t("title")}</h1>
				<ProductsToolbar categories={categories} />
			</div>
			<ProductsGrid products={products} />
		</div>
	);
}

export async function generateMetadata() {
	return {
		title: "Ürünler | E‑Ticaret",
		description: "Kategori ve fiyata göre filtrelenebilir ürün listesi",
	};
}

export const revalidate = 60;


