"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeFromCart, setQuantity, clearCart } from "@/store/slices/cartSlice";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import PriceBadge from "../ui/PriceBadge";

export default function CartPage() {
	const t = useTranslations("cart");
	const items = useAppSelector((s) => s.cart.items);
	const dispatch = useAppDispatch();
	const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

	return (
		<div className="p-8 space-y-6">
			<h1 className="text-2xl font-bold">{t("title")}</h1>
			{items.length === 0 ? (
				<p className="text-white/70">{t("empty")}</p>
			) : (
				<div className="space-y-6">
					<ul className="space-y-3">
						{items.map((i) => (
							<li key={i.id} className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur transition-colors hover:border-purple-500/30">
								<div className="flex items-center gap-3 flex-1 min-w-0">
									<div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black/20">
										{Boolean(i.image) && (
											<Image src={i.image as string} alt={i.title} fill className="object-contain" />
										)}
									</div>
									<div className="min-w-0">
										<p className="font-medium truncate">{i.title}</p>
										<PriceBadge className="mt-0.5" value={i.price} />
									</div>
								</div>
								<div className="flex items-center gap-3">
									<input
										type="number"
										min={1}
										className="w-20 border border-white/10 bg-transparent rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
										value={i.quantity}
										onChange={(e) =>
											dispatch(setQuantity({ id: i.id, quantity: Number(e.target.value) }))
										}
									/>
									<button
										className="inline-flex items-center gap-1 rounded px-2 py-1 text-red-300 hover:text-red-200 hover:bg-red-500/10 transition"
										onClick={() => dispatch(removeFromCart(i.id))}
									>
										<Trash2 className="w-4 h-4" />
										<span>{t("remove")}</span>
									</button>
								</div>
							</li>
						))}
					</ul>
					<div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
						<p className="font-semibold">{t("total")}: ${total.toFixed(2)}</p>
						<button
							className="rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm py-2 px-3 hover:opacity-90"
							onClick={() => dispatch(clearCart())}
						>
							{t("clear")}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}


