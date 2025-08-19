import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { getTranslations } from "next-intl/server";
import { translateToTr, basicTranslateEnToTr } from "@/lib/translate";

async function getProduct(id: string) {
	const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
		next: { revalidate: 60 },
	});
	if (!res.ok) throw new Error("Failed to fetch product");
	return res.json();
}

const hardTrOverrides: Record<number, { title?: string; description?: string }> = {
	3: {
		title: "Erkek Pamuk Ceket",
		description:
			"İlkbahar/Sonbahar/Kış için harika bir dış giyim ceketi; çalışma, doğa yürüyüşü, kamp, dağ/kaya tırmanışı, bisiklet, seyahat veya diğer outdoor aktiviteler için uygundur. Sizin ya da ailenizin bir üyesi için güzel bir hediye seçeneği. Şükran Günü veya Noel'de baba, eş ya da oğula verilebilecek sıcak bir armağan.",
	},
};

export default async function ProductDetail({ params }: { params: Promise<{ id: string; locale: string }> }) {
	const { id, locale } = await params;
	const product = await getProduct(id);
	const t = await getTranslations({ locale, namespace: "product" });

	let title = product.title;
	let description = product.description;
	try {
		const messages = (await import(`@/messages/${locale}.json`)).default as { productsData?: Record<string, { title?: string; description?: string }> };
		const pd = messages?.productsData as Record<string, { title?: string; description?: string }> | undefined;
		const pdItem = pd?.[String(product.id)];
		if (pdItem?.title) title = pdItem.title;
		if (pdItem?.description) description = pdItem.description;
	} catch {}

	if (locale === "tr") {
		const hard = hardTrOverrides[Number(product.id)];
		if (hard?.title && title === product.title) title = hard.title;
		if (hard?.description && description === product.description) description = hard.description;
		if (title === product.title) title = basicTranslateEnToTr(title);
		if (description === product.description) description = basicTranslateEnToTr(description);

		// Son aşama: hâlâ orijinal metinle aynıysa, ücretsiz çeviri servisi ile çeviriyi dene (ISR ile cache'lenir)
		if (title === product.title) {
			title = await translateToTr(title);
		}
		if (description === product.description) {
			description = await translateToTr(description);
		}
	}

	return (
		<div className="p-8 grid md:grid-cols-2 gap-8">
			<div className="relative w-full h-96">
				<Image
					src={product.image}
					alt={product.title}
					fill
					priority
					className="object-contain"
					sizes="(min-width: 768px) 50vw, 100vw"
				/>
			</div>
			<div className="space-y-4">
				<h1 className="text-2xl font-bold">{title}</h1>
				<p className="text-white/80">{description}</p>
				<p className="inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-0.5 text-sm shadow-sm">
					<span className="font-semibold tracking-tight">${product.price}</span>
				</p>
				<p className="text-sm text-white/70">{t("categoryLabel", { category: product.category })}</p>
				<AddToCartButton product={{ id: product.id, title, price: product.price, image: product.image }} />
			</div>
		</div>
	);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }) {
	// Ürün adını başlıkta kullan, kısa açıklamayı description olarak ver
	try {
		const { id } = await params;
		const product = await getProduct(id);
		const title = `${product.title} | E‑Ticaret`;
		const description = typeof product.description === "string" ? product.description.slice(0, 160) : undefined;
		return { title, description };
	} catch {
		return { title: "Ürün | E‑Ticaret" };
	}
}

export const revalidate = 60;

export async function generateStaticParams() {
	const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
	const products: Array<{ id: number }> = await res.json();
	return products.slice(0, 10).map((p) => ({ id: String(p.id) }));
}


