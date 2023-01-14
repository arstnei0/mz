import { Auth, AuthConfig } from "@auth/core"
import type { APIRoute, AstroGlobal } from "astro"
import Github from "@auth/core/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "~/server/db/client"
import type { Session } from "next-auth"

export const authConfig: AuthConfig = {
	adapter: PrismaAdapter(prisma) as any,
	providers: [
		Github({
			clientId: import.meta.env.GITHUB_ID,
			clientSecret: import.meta.env.GITHUB_SECRET,
		}) as any,
	],
	secret: import.meta.env.SECRET,
}

export const all: APIRoute = async ({ params, request }) => {
	const res = await Auth(request, authConfig)

	return res
}

export type GetSessionResult = Promise<Session | null>

export async function getSession(req: Request): GetSessionResult {
	const options = authConfig
	options.secret ??= process.env.AUTH_SECRET
	options.trustHost ??= true

	const url = new URL("/api/auth/session", req.url)
	const response = await Auth(
		new Request(url, { headers: req.headers }),
		options
	)

	const { status = 200 } = response

	const data = await response.json()

	if (!data || !Object.keys(data).length) return null
	if (status === 200) return data
	throw new Error(data.message)
}
