import Head from "next/head";

import styles from "../styles/Home.module.css";

function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Deals on Wheels</title>
			</Head>

			<main>
				<h1 className={styles.title}>Welcome to Deals on Wheels 🚗</h1>
			</main>
		</div>
	);
}

export default Home;
