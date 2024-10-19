import axios from "axios";

import { getCarPriceRecommendationFromHtml } from "../../services/openai/research";

async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const url = searchParams.get("url");
		const { data: html } = await axios.get(url);

		const researchData = await getCarPriceRecommendationFromHtml(html);

		return new Response(JSON.stringify({ researchData: researchData }));
	} catch (error) {
		return new Response(JSON.stringify({ error: "Failed to scrape the webpage" }), { status: 500 });
	}
}

export {
	GET
};
