import Head from "next/head";

import CarDetails from "./components/cardetails";
import WebScrape from "./components/webscrape";

function Home() {
	return (
		<div>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>Deals on Wheels</title>
			</Head>

			<main>
				<h1>Welcome to Deals on Wheels 🚗</h1>
				<CarDetails/>
				{/* <WebScrape/> */}
			</main>
		</div>
	);
}

export default Home;
