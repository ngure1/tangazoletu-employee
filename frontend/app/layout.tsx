import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { cn } from "@/lib/utils";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn("antialiased", "font-sans")}
		>
			<body className="min-h-svh">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
