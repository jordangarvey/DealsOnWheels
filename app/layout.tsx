import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "../styles/global.css";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	style: ["normal", "italic"]
});

export const metadata: Metadata = {
	title: "Deals on Wheels",
	description: "Making Deals on Wheels",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</head>

			<body className={roboto.className}>
				{children}
			</body>
		</html>
	);
}

export default RootLayout;
