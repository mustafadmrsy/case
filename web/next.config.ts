import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	images: {
		domains: ["fakestoreapi.com"],
		minimumCacheTTL: 60 * 60 * 24,
	},
};

export default withNextIntl(nextConfig);
