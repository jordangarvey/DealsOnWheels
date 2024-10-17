import axios from "axios";
import * as cheerio from "cheerio";

async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const url = searchParams.get("path");
		const { data: html } = await axios.get(url);

		return new Response(JSON.stringify({ html }));
	} catch (error) {
		return new Response(JSON.stringify({ error: "Failed to scrape the webpage" }), { status: 500 });
	}
}

export {
	GET
};
