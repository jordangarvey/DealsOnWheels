import "../styles/global.css";

export const metadata = {
	title: "Deals on Wheels",
	description: "Making Deals on Wheels",
};

function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

export default RootLayout;
