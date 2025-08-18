import ProductCard from "./ProductCard";

type Props = {
	products: Array<{ id: number; title: string; price: number; image: string }>;
	priorityFirst?: boolean;
};

export default function ProductsGrid({ products, priorityFirst = false }: Props) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{products.map((p, idx) => (
				<ProductCard key={p.id} product={p} priority={priorityFirst && idx === 0} />
			))}
		</div>
	);
}


