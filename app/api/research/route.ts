import { NextApiRequest, NextApiResponse } from "next";

import { getCarPriceRecommendation } from "../../services/openai/research";

async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { searchParams } = new URL(req.url);

		const makeModel = searchParams.get("makeModel");
		const price = searchParams.get("price");
		const condition = searchParams.get("condition");
		const age = searchParams.get("age");

		const suggestedPrice = await getCarPriceRecommendation(makeModel, price, condition, age);

		res.status(200).json({ price: suggestedPrice });
	} catch (error) {
		res.status(500).json({ error: "Failed to scrape the webpage" });
	}
}

export {
	GET
};
