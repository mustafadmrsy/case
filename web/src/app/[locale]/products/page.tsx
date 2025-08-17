import ProductsGrid from "./ProductsGrid";

async function getProducts() {
	const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
	if (!res.ok) throw new Error("Failed to fetch products");
	return res.json();
}

export default async function ProductsPage() {
	const products = await getProducts();
	return (
		<div className="p-8 space-y-6">
			<h1 className="text-2xl font-bold">Ürünler</h1>
			<ProductsGrid products={products} />
		</div>
	);
}


