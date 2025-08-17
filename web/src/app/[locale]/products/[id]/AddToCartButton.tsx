"use client";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function AddToCartButton({ product }: { product: { id: number; title: string; price: number; image?: string } }) {
	const dispatch = useAppDispatch();
	const t = useTranslations("product");
	return (
		<button
			className="inline-block rounded bg-purple-600 text-white text-sm py-2 px-3 hover:bg-purple-500"
			onClick={() => {
				dispatch(addToCart(product));
				toast.success(t("addedToCart"));
			}}
		>
			{t("addToCart")}
		</button>
	);
}


