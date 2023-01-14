import type { Component, JSX } from "solid-js"
import { trpc, queryClient, client } from "~/lib/trpc"

export const TRPC: Component<{ children: JSX.Element }> = (props) => {
	return (
		<trpc.Provider client={client} queryClient={queryClient}>
			{props.children}
		</trpc.Provider>
	)
}
