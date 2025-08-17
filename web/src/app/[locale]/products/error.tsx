"use client";
import { useTranslations } from "next-intl";
export default function Error({ error }: { error: Error & { digest?: string } }) {
	const t = useTranslations("errors");
	return (
		<div className="p-6 rounded border border-red-400/30 bg-red-500/10 text-red-200">
			<p>{t("list")}</p>
			<pre className="text-xs mt-2 opacity-80">{error.message}</pre>
		</div>
	);
}


