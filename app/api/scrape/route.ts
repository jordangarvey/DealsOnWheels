import axios from "axios";


async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const url = searchParams.get("url");

	const prompt = {
		messages: [
			{
				role: "system",
				content: "You are a car pricing expert. Analyze the provided webpage for a used car and generate a concise report including the following fields: 'negotiatedPrice' (suggested price to negotiate down to) and 'reasons' (a brief explanation of why this price is recommended). Format the response as a JSON object. The `negotiatedPrice` should be a string with a currency symbol. The `reasons` should be a brief reason that could be used as a prompt itself for another AI tool."
			},
			{
				role: "user",
				content: `Analyze the following URL: ${url}`
			}
		],
		model: "llama-3.1-sonar-large-128k-online"
	};
	
	try {
		// const response = await axios.post(
		// 	"https://api.perplexity.ai/chat/completions",
		// 	prompt,
		// 	{
		// 		headers: {
		// 			"Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`,
		// 			"Content-Type": "application/json",
		// 		},
		// 	}
		// );

		let data;
		// Mocked to save money — TODO: tidy and make easier to swap
		const mockResponse = {
			"negotiatedPrice": "£4,500",
			"reasons": "The car is a 2013 model, which is over 11 years old. Although it is ULEZ compliant and has low insurance costs, its age and potential wear and tear should be considered. The market value for a 2013 Vauxhall Astra 1.4 is generally lower, making £4,500 a reasonable negotiation point."
		}
		if(mockResponse) {
			data = mockResponse;
		} else {
			// Need to parse anything between two curly braces
			data = response.data?.choices[0]?.message?.content;
	
			if(!data) throw new Error("No response");
		}


		const negotiatedPrice = data.negotiatedPrice;
		const reasons = data.reasons;

		return new Response(JSON.stringify({ negotiatedPrice, reasons }), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: "Failed to scrape the webpage" }), { status: 500 });
	}
}

export {
	GET
};
