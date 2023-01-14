import type { inferAsyncReturnType } from "@trpc/server"
import { prisma } from "~/server/db/client"
import { authConfig, getSession } from "~/pages/api/auth/[...auth]"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"

export const createContextInner = async (opts: FetchCreateContextFnOptions) => {
	const session = await getSession(opts.req, authConfig)
	return {
		...opts,
		prisma,
		session,
	}
}

export const createContext = async (opts: FetchCreateContextFnOptions) => {
	return await createContextInner(opts)
}

export type IContext = inferAsyncReturnType<typeof createContext>
