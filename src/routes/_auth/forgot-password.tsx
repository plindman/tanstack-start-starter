import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <Button className="w-full">Send Reset Link</Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to="/login" className="text-sm text-primary hover:underline">
          Back to Login
        </Link>
      </CardFooter>
    </Card>
  )
}
