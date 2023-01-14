import type { inferAsyncReturnType } from "@trpc/server"
import { prisma } from "~/server/db/client"
import { authOpts } from "~/routes/api/auth/[...solidauth]"

export const createContextInner = async (
	opts: 
) => {
	const session = await getSession(opts.req, authOpts)
	return {
		...opts,
		prisma,
		session,
	}
}

export const createContext = async (opts: createSolidAPIHandlerContext) => {
	return await createContextInner(opts)
}

export type IContext = inferAsyncReturnType<typeof createContext>

