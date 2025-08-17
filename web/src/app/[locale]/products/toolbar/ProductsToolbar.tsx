"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

type Props = {
	categories: string[];
};

export default function ProductsToolbar({ categories }: Props) {
	const t = useTranslations("toolbar");
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	const category = params.get("category") ?? "";
	const sort = params.get("sort") ?? "";
	const min = params.get("min") ?? "";
	const max = params.get("max") ?? "";

	const update = (patch: Record<string, string>) => {
		const q = new URLSearchParams(params.toString());
		Object.entries(patch).forEach(([k, v]) => {
			if (v) q.set(k, v);
			else q.delete(k);
		});
		const qs = q.toString();
		router.push(qs ? `${pathname}?${qs}` : pathname);
	};

	return (
		<div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 items-center text-sm w-full">
			<label htmlFor="category" className="sr-only">{t("allCategories")}</label>
			<div className="relative">
				<select
					id="category"
					value={category}
					onChange={(e) => update({ category: e.target.value })}
					className="appearance-none border border-white/15 rounded-md px-2 pr-8 bg-black/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full h-9 text-sm"
				>
					<option value="">{t("allCategories")}</option>
					{categories.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
				<ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
			</div>
			<label htmlFor="sort" className="sr-only">{t("sort")}</label>
			<div className="relative">
				<select
					id="sort"
					value={sort}
					onChange={(e) => update({ sort: e.target.value })}
					className="appearance-none border border-white/15 rounded-md px-2 pr-8 bg-black/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full h-9 text-sm"
				>
					<option value="">{t("sort")}</option>
					<option value="price-asc">{t("priceAsc")}</option>
					<option value="price-desc">{t("priceDesc")}</option>
				</select>
				<ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
			</div>
			<label htmlFor="min" className="sr-only">{t("min") as string}</label>
			<input
				id="min"
				placeholder={t("min") as string}
				className="w-full sm:w-20 border border-white/15 rounded-md px-2 bg-black/60 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 h-9 text-sm"
				value={min}
				onChange={(e) => update({ min: e.target.value })}
			/>
			<label htmlFor="max" className="sr-only">{t("max") as string}</label>
			<input
				id="max"
				placeholder={t("max") as string}
				className="w-full sm:w-20 border border-white/15 rounded-md px-2 bg-black/60 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 h-9 text-sm"
				value={max}
				onChange={(e) => update({ max: e.target.value })}
			/>
		</div>
	);
}


