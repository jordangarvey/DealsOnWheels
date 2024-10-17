import Head from "next/head";

import WebScrape from "./controls/webscrape";

import styles from "../styles/Home.module.css";

function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Deals on Wheels</title>
			</Head>

			<main>
				<h1 className={styles.title}>Welcome to Deals on Wheels 🚗</h1>
				<WebScrape/>
			</main>
		</div>
	);
}

export default Home;
