import { getTranslations } from "next-intl/server";
export default async function NotFound() {
	const t = await getTranslations("errors");
	return (
		<div className="p-6 rounded border border-yellow-400/30 bg-yellow-500/10 text-yellow-200">
			<p>{t("notFound")}</p>
		</div>
	);
}


