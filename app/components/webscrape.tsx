"use client";

import { useState } from "react";

function WebScrape() {
	const [url, setUrl] = useState("");
	const [data, setData] = useState<{ negotiatedPrice: string, reasons: string }>();

	function handleScrape() {
		fetch(`/api/scrape?url=${url}`)
		.then(response => response.json())
		.then(response => {
			alert(response)
			setData(response);
		});
	}

	function makeCall() {
		const toNumber = encodeURIComponent("+447899896537");

		// TODO: this will just make the call, and return the status of that.
		// We’d need something else to actually get the result of the call, such as a transcript of it.
		fetch(`/api/call?reasons=${data.reasons}&targetPrice=${data.negotiatedPrice}&toNumber=${toNumber}`)
		.then(response => response.json())
		.then(response => {
		});
	}

	return (
		<div>
				{
					data
					? (
						<>
							<p>The suggested price to negotiate down to is: {data.negotiatedPrice}</p>
							<p>The reason for this price is: {data.reasons}</p>
							<button onClick={makeCall}>Make the call!</button>
						</>
					)
					: (
						<>
							<div>
								<label>Enter a URL here for a car you want to buy</label>
								<input value={url} onChange={(e) => setUrl(e.currentTarget.value)}/>
							</div>
							<button onClick={handleScrape}>Show me the money</button>
						</>
					)
				}
		</div>
	)
}

export default WebScrape;
