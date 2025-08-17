export async function translateToTr(text: string): Promise<string> {
	try {
		if (!text || text.trim().length === 0) return text;
		const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|tr`;
		const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 30 } });
		if (!res.ok) return text;
		const data = await res.json();
		const out: string | undefined = data?.responseData?.translatedText;
		return typeof out === "string" && out.length > 0 ? out : text;
	} catch {
		return text;
	}
}

export function basicTranslateEnToTr(text: string): string {
	const dict: Array<[RegExp, string]> = [
		[/\bMens\b/gi, "Erkek"],
		[/\bWomen'?s\b/gi, "Kadın"],
		[/\bUnisex\b/gi, "Unisex"],
		[/\bCasual\b/gi, "Günlük"],
		[/\bPremium\b/gi, "Premium"],
		[/\bClassic\b/gi, "Klasik"],
		[/\bSlim\s*Fit\b/gi, "Slim Fit"],
		[/\bRegular\s*Fit\b/gi, "Normal Kalıp"],
		[/\bT[-\s]*Shirts?\b/gi, "T‑Shirt"],
		[/\bShirts?\b/gi, "Gömlek"],
		[/\bJackets?\b/gi, "Ceket"],
		[/\bCoats?\b/gi, "Kaban"],
		[/\bBackpack\b/gi, "Sırt Çantası"],
		[/\bBags?\b/gi, "Çanta"],
		[/\bWallets?\b/gi, "Cüzdan"],
		[/\bShoes?\b/gi, "Ayakkabı"],
		[/\bBoots?\b/gi, "Bot"],
		[/\bWatch(es)?\b/gi, "Saat"],
		[/\bCotton\b/gi, "Pamuk"],
		[/\bLeather\b/gi, "Deri"],
		[/\bPolyester\b/gi, "Polyester"],
		[/\bStainless\s*Steel\b/gi, "Paslanmaz Çelik"],
		[/\bSolid\s*stitched\b/gi, "Sağlam dikişli"],
		[/\bZipper\b/gi, "Fermuar"],
		[/\bSpring\/Autumn\/Winter\b/gi, "İlkbahar\/Sonbahar\/Kış"],
		[/\bSpring\b/gi, "İlkbahar"],
		[/\bAutumn\b/gi, "Sonbahar"],
		[/\bWinter\b/gi, "Kış"],
		[/\bSummer\b/gi, "Yaz"],
		[/\bsuitable\s*for\s*many\s*occasions\b/gi, "birçok kullanım için uygundur"],
		[/\bfor\s*(working|hiking|camping|climbing|cycling|traveling|outdoors?)\b/gi, "(çalışma, doğa yürüyüşü, kamp, tırmanış, bisiklet, seyahat ve outdoor için)"],
		[/\bSlim\-fitting\s*style\b/gi, "Dar kalıp stil"],
		[/contrast\s*raglan\s*long\s*sleeve/gi, "kontrast raglan uzun kol"],
		[/three[-\s]*button\s*henley\s*placket/gi, "üç düğmeli Henley pat"],
		[/light\s*weight\s*&?\s*soft\s*fabric/gi, "hafif ve yumuşak kumaş"],
		[/breathable\s*and\s*comfortable/gi, "nefes alabilir ve konforlu"],
		[/round\s*neck/gi, "yuvarlak yaka"],
		[/\bdurability\b/gi, "dayanıklılık"],
		[/\bcasual\s*fashion\b/gi, "günlük moda"],
		[/\bdiehard\s*baseball\s*fans\b/gi, "beyzbol tutkunları"],
		[/Henley\s*style\s*round\s*neckline\s*includes\s*a\s*three[-\s]*button\s*placket/gi, "Henley tarzı yuvarlak yaka üç düğmeli pat ile tamamlanmıştır"],
		[/\bYour\s*perfect\s*pack\s*for\s*everyday\s*use\b/gi, "Günlük kullanım için mükemmel çanta"],
		[/walks\s*in\s*the\s*forest/gi, "ormanda yürüyüşler"],
		[/Stash\s*your\s*laptop\s*\(up\s*to\s*15\s*inches\)\s*in\s*the\s*padded\s*sleeve/gi, "15 inçe kadar dizüstünü dolgulu bölmeye yerleştir"],
		[/everyday\s*essentials/gi, "günlük ihtiyaçlarınız"],
		[/water[-\s]*resistant/gi, "suya dayanıklı"],
		[/multiple\s*pockets/gi, "çoklu cepler"],
		[/adjustable\s*straps?/gi, "ayarlanabilir askılar"],
		[/lightweight/gi, "hafif"],
		[/durable/gi, "dayanıklı"],
		[/perfect\s*for/gi, "için ideal"],
		[/engineered\s*for/gi, "için tasarlandı"],
	];
	let out = text;
	dict.forEach(([re, tr]) => {
		out = out.replace(re, tr);
	});
	return out;
}


