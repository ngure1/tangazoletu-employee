"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import * as React from "react";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 30_000,
					},
					mutations: {
						retry: false,
					},
				},
			}),
	);

	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				{children}
				<ThemedToaster />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

function ThemedToaster() {
	const { resolvedTheme } = useTheme();

	return (
		<Toaster
			closeButton
			position="top-right"
			richColors
			theme={resolvedTheme === "dark" ? "dark" : "light"}
		/>
	);
}

export { Providers };
