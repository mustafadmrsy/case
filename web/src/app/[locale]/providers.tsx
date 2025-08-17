"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const Toaster = dynamic(() => import("react-hot-toast").then(m => m.Toaster), { ssr: false, loading: () => null });

function usePersistCart() {
	useEffect(() => {
		try {
			const saved = localStorage.getItem("cart");
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed?.items)) {
					store.dispatch({ type: "cart/rehydrate", payload: parsed.items });
				}
			}
		} catch {}
		const unsubscribe = store.subscribe(() => {
			const state = store.getState();
			try {
				localStorage.setItem("cart", JSON.stringify({ items: state.cart.items }));
			} catch {}
		});
		return unsubscribe;
	}, []);
}

export default function Providers({ children }: { children: React.ReactNode }) {
	usePersistCart();
	return (
		<Provider store={store}>
			{children}
			<Toaster position="top-right" />
		</Provider>
	);
}


