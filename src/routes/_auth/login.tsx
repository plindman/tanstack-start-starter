import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	// CardFooter,
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
	email: z.string().email({ message: "Enter a valid email address." }),
	password: z.string().min(1, { message: "Password is required." }),
});

export const Route = createFileRoute('/_auth/login')({
	component: LoginComponent,
});

function LoginComponent() {
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
			email: "",
			password: "",
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setMessage("");
		try {
			await authClient.signIn.email({
				email: values.email,
				password: values.password,
			}, {
				onSuccess: async () => {
					setMessage("Login successful!");
					await navigate({ to: "/users/me" });
				},
				onError: (ctx) => {
					setMessage(ctx.error.message || "Invalid email or password");
				}
			})
		} catch (error: unknown) {
			console.error("Login error:", error);
			setMessage("An error occurred during login.");
		}
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
				<CardDescription className="text-center">
					Sign in to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
							Login
						</Button>
					</form>
				</Form>
				{message && (
					<p className="text-center text-sm text-red-500 mt-4">{message}</p>
				)}
			</CardContent>
			{/* <CardFooter className="flex justify-center">
				<p className="text-sm text-gray-500">
					Don&apos;t have an account?{" "}
					<Link to="/signup" className="text-primary hover:underline">
						Register
					</Link>
				</p>
			</CardFooter> */}
		</Card>
	)
}