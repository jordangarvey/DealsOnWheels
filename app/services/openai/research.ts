import OpenAI from "openai";

const ai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

async function getCarPriceRecommendationFromHtml(htmlContent) {
	const prompt = `
	Here is the HTML content of a used car advertisement:
	
	${htmlContent}
	
	Please review the details, research the car, analyze the advertised price, and provide a recommendation on what the price could be haggled down to.
	Return the response in a JSON format with the following fields:
	- makeModel: (the make and model of the car)
	- year: (the car's year)
	- advertisedPrice: (the price advertised on the webpage)
	- recommendedHagglePrice: (the price you suggest could be haggled down to)
	- reasoning: (the reasoning behind the recommendation. This should be very concise)
	Use the same currency used in the advert.
	Use the following JSON schema for this response. Only return this single object, nothing else:
	{
		"makeModel": string,
		"advertisedPrice": number,
		"recommendedHagglePrice": number,
		"reasoning": string,
		"error": string // Use this if there is any error, describe the issue, and do not populate the other fields
	}
	`;

	try {
		// Make the API request to ChatGPT
		const response = await ai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: prompt }],
				max_tokens: 500
		});

		// Extract the ChatGPT's response
		const chatResponse = response.data.choices[0].message.content;

		return chatResponse;
	} catch (error) {
		throw error;
	}
}

async function getCarPriceRecommendation(makeModel, price, condition, age) {
	const prompt = `
	Please review the details, research the car, analyze the advertised price, and provide a recommendation on what the price could be haggled down to.
	These are the details I have:
	- Make & model: ${makeModel}
	- Price: ${price}
	- Condition: ${condition}
	- Age: ${age}
	Return the response in a JSON format with the following fields:
	- advertisedPrice: (the price advertised on the webpage)
	- recommendedHagglePrice: (the price you suggest could be haggled down to)
	- reasoning: (the reasoning behind the recommendation. This should be fairly concise, but suggest if the user definitely should haggle or not)
	Use the same currency used in the advert.
	Use the following JSON schema for this response. Only return this single object, nothing else:
	{
		"advertisedPrice": number,
		"recommendedHagglePrice": number,
		"reasoning": string,
		"error": string // Use this if there is any error, describe the issue, and do not populate the other fields
	}
	`;

	try {
		// Make the API request to ChatGPT
		const response = await ai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: prompt }],
				max_tokens: 500
		});

		// Extract the ChatGPT's response
		const chatResponse = response.choices[0].message.content;

		return chatResponse;
	} catch (error) {
		console.error("Unable to get data for this car", error);
		throw error;
	}
}

export {
	getCarPriceRecommendationFromHtml,
	getCarPriceRecommendation
}
