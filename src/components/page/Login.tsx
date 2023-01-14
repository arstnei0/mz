import type { Component } from "solid-js"
import { signIn } from "~/lib/auth"
import { Button } from "~/components/ui/Button"

const LoginPage: Component = () => {
	return (
		<>
			<Button onClick={() => signIn("google")}>Login with Google</Button>
			<Button onClick={() => signIn("github")}>Login with Github</Button>
		</>
	)
}

export default LoginPage
