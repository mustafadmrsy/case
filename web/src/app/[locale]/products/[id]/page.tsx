import Image from "next/image";

async function getProduct(id: string) {
	const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
		next: { revalidate: 60 },
	});
	if (!res.ok) throw new Error("Failed to fetch product");
	return res.json();
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
	const product = await getProduct(params.id);
	return (
		<div className="p-8 grid md:grid-cols-2 gap-8">
			<div className="relative w-full h-96">
				<Image src={product.image} alt={product.title} fill className="object-contain" />
			</div>
			<div className="space-y-4">
				<h1 className="text-2xl font-bold">{product.title}</h1>
				<p className="text-gray-700">{product.description}</p>
				<p className="text-xl font-semibold">${product.price}</p>
				<p className="text-sm text-gray-500">Kategori: {product.category}</p>
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
	const products: any[] = await res.json();
	return products.slice(0, 10).map((p) => ({ id: String(p.id) }));
}


