import type { DefaultSession } from "next-auth"
import type { Component } from "solid-js"
import { Dashboard } from "../logic/Dashboard"
import { TRPC } from "../logic/TRPC"

const DashboardPage: Component<{ user: DefaultSession["user"] }> = (
	props
) => {
	return (
		<>
			<TRPC>
				<Dashboard user={props.user} />
			</TRPC>
		</>
	)
}

export default DashboardPage
