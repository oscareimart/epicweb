/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "admin.epicbolivia.travel",
				port: "",
				pathname: "/uploads/**",
			},
			{
				protocol: "https",
				hostname: "epicbolivia.travel",
				port: "",
				pathname: "/images/**",
			},
		],
	},
}

module.exports = nextConfig
