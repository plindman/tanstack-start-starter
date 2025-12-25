import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters." }),
	email: z.string().email({ message: "Enter a valid email address." }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters." }),
});

export const Route = createFileRoute('/_auth/signup')({
  beforeLoad: () => {
    // Disable public signup
    throw redirect({ to: '/login' })
  },
	component: SignupComponent,
});

function SignupComponent() {
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const { data: session } = authClient.useSession();

	useEffect(() => {
		if (session) {
			navigate({ to: "/users/me" });
		}
	}, [session, navigate]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setMessage("");
		try {
			await authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: values.name,
			}, {
				onSuccess: async () => {
					setMessage("Registration successful!");
					await navigate({ to: "/users/me" });
				},
				onError: (ctx) => {
					setMessage(ctx.error.message || "Registration failed");
				}
			})
		} catch (error: unknown) {
			console.error("Registration error:", error);
			setMessage("An error occurred.");
		}
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
				<CardDescription className="text-center">
					Create your account to get started
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="m@example.com"
											{...field}
											type="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="******" {...field} type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Register
						</Button>
					</form>
				</Form>
				{message && (
					<p className="text-center text-sm text-red-500 mt-4">{message}</p>
				)}
			</CardContent>
			<CardFooter className="flex justify-center">
				<p className="text-sm text-gray-500">
					Already have an account?{" "}
					<Link to="/login" className="text-primary hover:underline">
						Login
					</Link>
				</p>
			</CardFooter>
		</Card>
	)
}
