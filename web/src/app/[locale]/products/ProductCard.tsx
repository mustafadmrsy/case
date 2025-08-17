"use client";
import Image from "next/image";
import { addToCart } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store";

type Props = {
	product: {
		id: number;
		title: string;
		price: number;
		image: string;
	};
};

export default function ProductCard({ product }: Props) {
	const dispatch = useAppDispatch();
	return (
		<div className="border rounded p-4 flex flex-col gap-3">
			<div className="relative w-full h-48">
				<Image src={product.image} alt={product.title} fill className="object-contain" />
			</div>
			<p className="font-medium line-clamp-2">{product.title}</p>
			<p className="font-semibold">${product.price}</p>
			<button
				className="underline"
				onClick={() => dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.image }))}
			>
				Sepete Ekle
			</button>
		</div>
	);
}


