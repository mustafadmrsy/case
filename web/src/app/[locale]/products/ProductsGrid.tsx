import ProductCard from "./ProductCard";

type Props = {
	products: Array<{ id: number; title: string; price: number; image: string }>;
};

export default function ProductsGrid({ products }: Props) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{products.map((p) => (
				<ProductCard key={p.id} product={p} />
			))}
		</div>
	);
}


