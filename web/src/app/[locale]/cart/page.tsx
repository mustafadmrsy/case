"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeFromCart, setQuantity, clearCart } from "@/store/slices/cartSlice";

export default function CartPage() {
	const items = useAppSelector((s) => s.cart.items);
	const dispatch = useAppDispatch();
	const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

	return (
		<div className="p-8 space-y-6">
			<h1 className="text-2xl font-bold">Sepet</h1>
			{items.length === 0 ? (
				<p>Sepetiniz boş.</p>
			) : (
				<div className="space-y-4">
					<ul className="space-y-2">
						{items.map((i) => (
							<li key={i.id} className="flex items-center justify-between gap-4">
								<div className="flex-1">
									<p className="font-medium">{i.title}</p>
									<p className="text-sm text-gray-600">${i.price.toFixed(2)}</p>
								</div>
								<input
									type="number"
									min={1}
									className="w-20 border rounded px-2 py-1"
									value={i.quantity}
									onChange={(e) =>
										dispatch(setQuantity({ id: i.id, quantity: Number(e.target.value) }))
									}
								/>
								<button
									className="text-red-600 underline"
									onClick={() => dispatch(removeFromCart(i.id))}
								>
									Kaldır
								</button>
							</li>
						))}
					</ul>
					<div className="flex items-center justify-between">
						<p className="font-semibold">Toplam: ${total.toFixed(2)}</p>
						<button className="underline" onClick={() => dispatch(clearCart())}>
							Sepeti Temizle
						</button>
					</div>
				</div>
			)}
		</div>
	);
}


