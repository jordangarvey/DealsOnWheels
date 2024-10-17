"use client";

import { useState } from "react";

function WebScrape() {
	const [url, setUrl] = useState("");
	const [data, setData] = useState();

	function handleScrape() {
		fetch(`/api/scrape?path=${url}`)
		.then(response => response.json())
		.then(response => {
			setData(response.html);
		});
	}

	return (
		<div>
			<input value={url} onChange={(e) => setUrl(e.currentTarget.value)}/>
			<button onClick={handleScrape}>DEAL</button>

			{
				data &&
				<div dangerouslySetInnerHTML={{ __html: data }}/>
			}
		</div>
	)
}

export default WebScrape;
