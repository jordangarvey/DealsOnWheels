import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


async function GET(req: NextApiRequest, res: NextApiResponse) {
	const apiKey = process.env.PERPLEXITY_API_KEY;

	const prompt = {
		messages: [
			{
				role: "system",
				content: "You are a car pricing expert. Analyze the provided webpage for a used car and generate a concise report including the following fields: 'negotiated_price' (suggested price to negotiate down to) and 'reason' (a brief explanation of why this price is recommended)."
			},
			{
				role: "user",
				content: "Analyze the following URL: [URL_OF_USED_CAR_WEBPAGE]"
			}
		],
		model: "llama-3.1-sonar-large-128k-chat"
	};
	
	try {
		const response = await axios.post(
			"https://api.perplexity.ai/v1/chat/completions",
			prompt,
			{
				headers: {
					"Authorization": `Bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
			}
		);

		const data = response.data;

		const negotiatedPrice = data.price;
		const reasons = data.analysis;

		res.status(200).json({ negotiatedPrice, reasons });
	} catch (error) {
		res.status(500).json({ error: "Failed to scrape the webpage" });
	}
}

export {
	GET
};
