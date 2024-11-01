import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { getCarPriceRecommendationFromHtml } from "../../services/openai/research";

async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { searchParams } = new URL(req.url);
		const url = searchParams.get("url");
		const { data: html } = await axios.get(url);

		const researchData = await getCarPriceRecommendationFromHtml(html);

		res.status(200).json({ researchData: researchData });
	} catch (error) {
		res.status(500).json({ error: "Failed to scrape the webpage" });
	}
}

export {
	GET
};
