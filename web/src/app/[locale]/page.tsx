import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
	const t = await getTranslations("home");
	return (
		<div className="p-8 space-y-6">
			<h1 className="text-2xl font-bold">{t("title")}</h1>
			<div className="flex gap-4">
				<Link href="/products" className="underline">
					{t("goProducts")}
				</Link>
				<Link href="/cart" className="underline">
					{t("goCart")}
				</Link>
			</div>
		</div>
	);
}


