const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'rgb3lh2iesbgvjl4.public.blob.vercel-storage.com',
				pathname: '**',
			},
		],
	},
};

module.exports = withNextIntl(nextConfig);
