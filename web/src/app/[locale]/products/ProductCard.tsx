"use client";
import Image from "next/image";
import { Link } from "@/navigation";
import { addToCart } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store";
import React from "react";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import PriceBadge from "../ui/PriceBadge";

type Props = {
	product: {
		id: number;
		title: string;
		price: number;
		image: string;
	};
	priority?: boolean;
};

function translateEnToTrBasic(text: string): string {
	const dict: Array<[RegExp, string]> = [
		[/\bMens\b/gi, "Erkek"],
		[/\bWomen'?s\b/gi, "Kadın"],
		[/\bCasual\b/gi, "Günlük"],
		[/\bPremium\b/gi, "Premium"],
		[/\bSlim\s*Fit\b/gi, "Slim Fit"],
		[/\bT[-\s]*Shirts?\b/gi, "T‑Shirt"],
		[/\bShirts?\b/gi, "Gömlek"],
		[/\bJackets?\b/gi, "Ceket"],
		[/\bCotton\b/gi, "Pamuk"],
		[/\bLeather\b/gi, "Deri"],
		[/\bWatch(es)?\b/gi, "Saat"],
		[/\bBag\b/gi, "Çanta"],
		[/\bBackpack\b/gi, "Sırt Çantası"],
	];
	let out = text;
	dict.forEach(([re, tr]) => {
		out = out.replace(re, tr);
	});
	return out;
}

function ProductCardBase({ product, priority = false }: Props) {
	const dispatch = useAppDispatch();
    const t = useTranslations("product");
	const locale = useLocale();
	const displayTitle = locale === "tr" ? translateEnToTrBasic(product.title) : product.title;
	return (
		<div className="group relative border border-white/10 rounded-2xl p-4 flex flex-col gap-3 bg-white/5 backdrop-blur shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10">
			<div className="relative w-full h-48 overflow-hidden rounded-lg">
				<Image
					src={product.image}
					alt={product.title}
					fill
					className="object-contain transition-transform duration-300 group-hover:scale-105"
					sizes="(min-width: 1280px) 260px, (min-width: 1024px) 240px, (min-width: 640px) 300px, 90vw"
					placeholder="blur"
					blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzAwJyBoZWlnaHQ9JzIwMCcgZmlsbD0nI2IyYjJiMicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJy8+PC9zdmc+"
					quality={70}
					priority={priority}
				/>
			</div>
			<Link href={`/products/${product.id}`} className="relative font-medium line-clamp-2 text-white/90 hover:text-white">
				{displayTitle}
				<span className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
			</Link>
			<PriceBadge value={product.price} />
			<button
				className="rounded bg-purple-600 text-white text-sm py-2 transition-transform duration-200 hover:bg-purple-500 hover:scale-[1.02] active:scale-[0.98]"
				onClick={() => {
					dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.image }));
					toast.success(t("addedToCart"));
				}}
			>
				{t("addToCart")}
			</button>
		</div>
	);
}

export default ProductCardBase;


