"use client";
import { Link, usePathname } from "@/navigation";
import { ShoppingCart, Globe, Menu, X, Package } from "lucide-react";
import { useAppSelector } from "@/store";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState, useEffect, useRef } from "react";

function useLocaleSwitcher() {
	const pathname = usePathname();
	const currentLocale = useLocale();
	// next-intl's usePathname returns the path WITHOUT the locale prefix
	// so we should use it directly to preserve the current page when switching locales
	const restHref = pathname || "/";
	return { currentLocale, restHref };
}

export default function Header() {
	const t = useTranslations("nav");
	const tCart = useTranslations("cart");
	const { currentLocale, restHref } = useLocaleSwitcher();
	const count = useAppSelector((s) => s.cart.items.reduce((n, i) => n + i.quantity, 0));
	const pathname = usePathname();
	const isProducts = useMemo(() => pathname.startsWith("/products"), [pathname]);
	const isCart = useMemo(() => pathname.startsWith("/cart"), [pathname]);
	const [open, setOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement | null>(null);
	// Menü açıkken: ESC ile kapat; dışına tıklayınca kapat; scroll kilitlenmez
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		const onPointerDown = (e: MouseEvent | TouchEvent) => {
			const panel = panelRef.current;
			if (!panel) return;
			const target = e.target as Node;
			if (!panel.contains(target)) setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("mousedown", onPointerDown);
		document.addEventListener("touchstart", onPointerDown, { passive: true });
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("mousedown", onPointerDown);
			document.removeEventListener("touchstart", onPointerDown);
		};
	}, [open]);

	return (
		<header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
			<div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
				<Link href="/" className="font-semibold tracking-tight">
					<span className="text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">E‑Ticaret</span>
				</Link>
				<nav className="hidden md:flex items-center gap-6">
					<Link
						href="/products"
						className={`group relative text-sm transition-colors ${isProducts ? "text-white" : "text-white/80 hover:text-white"}`}
					>
						{t("products")}
						<span className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 rounded bg-gradient-to-r from-purple-500 to-blue-500 transition-all ${isProducts ? "w-full" : "w-0 group-hover:w-full"}`}></span>
					</Link>
					<Link href="/cart" aria-label={tCart("title")} className="relative group">
						<ShoppingCart className="w-5 h-5 text-white/90 group-hover:text-white transition-transform group-hover:scale-110" />
						{count > 0 && (
							<span className="absolute -top-2 -right-2 text-[10px] leading-none bg-purple-600 text-white rounded-full px-1.5 py-1 shadow">
								{count}
							</span>
						)}
					</Link>
					<div className="flex items-center gap-2 text-xs">
						<Globe className="w-4 h-4 text-white/80" />
						<div className="inline-flex items-center rounded-full border border-white p-0.5">
							<Link
								href={restHref}
								locale="tr"
								className={`px-4 py-1.5 rounded-full text-sm transition ${currentLocale === "tr" ? "bg-white text-black" : "text-white/80 hover:text-white"}`}
							>
								TR
							</Link>
							<Link
								href={restHref}
								locale="en"
								className={`px-4 py-1.5 rounded-full text-sm transition ${currentLocale === "en" ? "bg-white text-black" : "text-white/80 hover:text-white"}`}
							>
								EN
							</Link>
						</div>
					</div>
				</nav>
				<button
					aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
					aria-expanded={open}
					aria-controls="mobile-menu"
					className="md:hidden p-2 text-white/80 hover:text-white"
					onClick={() => setOpen((v) => !v)}
				>
					{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>
			{/* Overlay */}
			{open && (
				<div className="fixed inset-0 z-40">
					<div className="absolute inset-0" />
					<div
						ref={panelRef}
						role="dialog"
						aria-modal="true"
						className="absolute top-16 left-0 right-0 md:hidden border-t border-white/10 bg-black"
					>
						<div className="container mx-auto max-w-6xl px-4 py-4 flex flex-col items-stretch gap-3">
							<Link href="/products" onClick={() => setOpen(false)} className={`text-center rounded-lg border border-white bg-black text-white py-3 text-base hover:bg-zinc-900 ${isProducts ? "" : ""}`}>
								{t("products")}
							</Link>
							<Link href="/cart" onClick={() => setOpen(false)} aria-label={tCart("title")} className={`text-center rounded-lg border border-white bg-black text-white py-3 text-base hover:bg-zinc-900 ${isCart ? "" : ""}`}>
								{tCart("title")} {count > 0 ? `(${count})` : ""}
							</Link>
							<div className="mt-1 inline-flex items-center self-center rounded-full border border-white p-0.5">
								<Link href={restHref} locale="tr" className={`px-4 py-1.5 rounded-full text-sm transition ${currentLocale === "tr" ? "bg-white text-black" : "text-white/80 hover:text-white"}`}>TR</Link>
								<Link href={restHref} locale="en" className={`px-4 py-1.5 rounded-full text-sm transition ${currentLocale === "en" ? "bg-white text-black" : "text-white/80 hover:text-white"}`}>EN</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}


