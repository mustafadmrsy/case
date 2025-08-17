"use client";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("footer");
    return (
        <footer className="mt-10 border-t border-white/10 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
            <div className="container mx-auto max-w-6xl px-4 py-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="text-white font-semibold">E‑Ticaret</p>
                    <p className="text-white/60 mt-2">{t("tagline")}</p>
                </div>
                <div className="justify-self-end text-right sm:justify-self-auto sm:text-left">
                    <p className="text-white font-semibold mb-2">{t("resources")}</p>
                    <ul className="space-y-1 text-white/70">
                        <li><a className="hover:text-white" href="https://fakestoreapi.com/" target="_blank" rel="noreferrer">Fake Store API</a></li>
                        <li><a className="hover:text-white" href="https://nextjs.org/" target="_blank" rel="noreferrer">Next.js</a></li>
                        <li><a className="hover:text-white" href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind CSS</a></li>
                    </ul>
                </div>
                <div className="col-span-2 sm:col-span-1 text-center sm:text-left">
                    <p className="text-white font-semibold mb-2">{t("followUs")}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                        <a aria-label="Twitter" href="#" className="text-white/70 hover:text-white transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M22.162 5.656c-.72.32-1.496.536-2.31.632a4.02 4.02 0 0 0 1.764-2.216 8.03 8.03 0 0 1-2.548.972 4.01 4.01 0 0 0-6.83 3.66A11.39 11.39 0 0 1 3.18 4.63a4.01 4.01 0 0 0 1.24 5.352 3.98 3.98 0 0 1-1.816-.5v.05c0 1.94 1.38 3.557 3.212 3.925-.336.092-.69.142-1.056.142-.258 0-.51-.024-.754-.072a4.013 4.013 0 0 0 3.746 2.784A8.045 8.045 0 0 1 2 18.407a11.35 11.35 0 0 0 6.148 1.8c7.377 0 11.41-6.11 11.41-11.41 0-.174-.004-.348-.012-.52a8.137 8.137 0 0 0 1.998-2.08z" />
                            </svg>
                        </a>
                        <a aria-label="GitHub" href="#" className="text-white/70 hover:text-white transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.582 2 12.213c0 4.52 2.865 8.353 6.839 9.708.5.095.683-.219.683-.488 0-.24-.009-.876-.014-1.72-2.782.615-3.368-1.37-3.368-1.37-.454-1.174-1.11-1.486-1.11-1.486-.907-.64.069-.627.069-.627 1.003.072 1.53 1.05 1.53 1.05.892 1.56 2.341 1.11 2.91.849.091-.662.35-1.11.636-1.366-2.22-.257-4.555-1.14-4.555-5.074 0-1.12.39-2.035 1.03-2.753-.103-.258-.447-1.295.098-2.7 0 0 .84-.272 2.75 1.052A9.33 9.33 0 0 1 12 6.844c.85.004 1.705.116 2.504.339 1.91-1.324 2.748-1.052 2.748-1.052.546 1.405.202 2.442.1 2.7.64.718 1.028 1.633 1.028 2.753 0 3.944-2.339 4.814-4.566 5.066.359.315.679.934.679 1.882 0 1.358-.012 2.452-.012 2.786 0 .271.181.587.688.487C19.14 20.562 22 16.731 22 12.213 22 6.582 17.523 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a aria-label="LinkedIn" href="#" className="text-white/70 hover:text-white transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M20.451 20.452h-3.554v-5.57c0-1.328-.024-3.036-1.85-3.036-1.85 0-2.133 1.445-2.133 2.94v5.666H9.36V9h3.56v11.452zM5.338 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.116 20.452H3.556V9h3.56v11.452z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="container mx-auto max-w-6xl px-4 h-8 flex items-center justify-between text-xs text-white/50">
                    <p>© {new Date().getFullYear()} E‑Ticaret</p>
                    <p>{t("madeWith")}</p>
                </div>
            </div>
        </footer>
    );
}


