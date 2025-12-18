import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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
	name: z.string().optional(),
	email: z.string().email({ message: "Enter a valid email address." }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters." }),
});

export const Route = createFileRoute("/login")({
	component: LoginComponent,
});

function LoginComponent() {
	const [isRegister, setIsRegister] = useState(false);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setMessage("");
		try {
			if (isRegister) {
				if (!values.name) {
					form.setError("name", {
						message: "Name is required for registration.",
					});
					return;
				}
				await authClient.signUp.email({
					email: values.email,
					password: values.password,
					name: values.name,
				});
				setMessage("Registration successful! Please log in.");
				setIsRegister(false); // Switch to login after successful registration
			} else {
				await authClient.signIn.email({
					email: values.email,
					password: values.password,
				});
				setMessage("Login successful!");
				await navigate({ to: "/" }); // Redirect to home on successful login
			}
		} catch (error: unknown) {
			console.error("Login/Register error:", error);
			if (error instanceof Error) {
				setMessage(error.message);
			} else {
				setMessage("An error occurred.");
			}
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						{isRegister ? "Register" : "Login"}
					</CardTitle>
					<CardDescription className="text-center">
						{isRegister ? "Create your account" : "Sign in to your account"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							{isRegister && (
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
							)}
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
								{isRegister ? "Register" : "Login"}
							</Button>
						</form>
					</Form>
					{message && (
						<p className="text-center text-red-500 mt-4">{message}</p>
					)}
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-500">
						{isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
						<Button
							variant="link"
							onClick={() => setIsRegister(!isRegister)}
							className="p-0 h-auto"
						>
							{isRegister ? "Login" : "Register"}
						</Button>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
