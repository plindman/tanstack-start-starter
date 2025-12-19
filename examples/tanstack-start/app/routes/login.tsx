import { createFileRoute, redirect } from '@tanstack/react-router'
import { auth } from '../lib/auth'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const isAuth = await auth.isAuthenticated()
    if (isAuth) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: Login,
})

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => auth.login()}>Sign In</button>
    </div>
  )
}
