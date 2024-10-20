import { Roboto } from "next/font/google";
import { CssBaseline } from '@mui/material';

import "../styles/global.css";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	style: ["normal", "italic"]
});

export const metadata = {
	title: "Deals on Wheels",
	description: "Making Deals on Wheels",
};

function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</head>

			<body className={roboto.className}>
				<CssBaseline/>
				{children}
			</body>
		</html>
	);
}

export default RootLayout;
