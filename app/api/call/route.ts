import { NextApiRequest, NextApiResponse } from "next";

import { makeCall } from "../../services/blandai/call";

async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { searchParams } = new URL(req.url);

		const makeModel = searchParams.get("makeModel");
		const targetPrice = searchParams.get("targetPrice");
		const toNumber = searchParams.get("toNumber");

		const callResponse = await makeCall(toNumber, makeModel, targetPrice);

		res.status(200).json(callResponse);
	} catch(error) {
		res.status(500).json({ error: "Failed to scrape the webpage" });
	}
}

export {
	GET
};
