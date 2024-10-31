import { getCarPriceRecommendation } from "../../services/openai/research";

async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);

		const makeModel = searchParams.get("makeModel");
		const price = searchParams.get("price");
		const condition = searchParams.get("condition");
		const age = searchParams.get("age");

		const suggestedPrice = await getCarPriceRecommendation(makeModel, price, condition, age);

		return new Response(JSON.stringify({ price: suggestedPrice }));
	} catch (error) {
		return new Response(JSON.stringify({ error: "Failed to scrape the webpage" }), { status: 500 });
	}
}

export {
	GET
};
