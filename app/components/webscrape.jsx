"use client";

import { useState } from "react";

function WebScrape() {
	const [url, setUrl] = useState("");
	const [data, setData] = useState();

	function handleScrape() {
		fetch(`/api/scrape?url=${url}`)
		.then(response => response.json())
		.then(response => {
			setData(response.researchData);
		});
	}

	return (
		<div>
			<div>
				<label>Enter a URL here for a car you want to buy</label>
				<input value={url} onChange={(e) => setUrl(e.currentTarget.value)}/>
			</div>
			<button onClick={handleScrape}>Show me the money</button>
		</div>
	)
}

export default WebScrape;
