import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel/serverless"
import solidJs from "@astrojs/solid-js"

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: vercel(),
	integrations: [solidJs()],
	vite: {
		plugins: [
			{
				name: "crypto-polyfill",
				transform(code, id) {
					if (code.includes("crypto.")) {
						if (
							!code.includes('from "crypto"') &&
							!code.includes("from 'crypto'")
						) {
							const c = `import crypto from 'node:crypto'
${code}`
							return c
						}
					}
				},
			},
		],
		ssr: {
			noExternal: ["@auth/core"],
			external: ["cookie"],
		},
	},
})
