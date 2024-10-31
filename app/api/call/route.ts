import { makeCall } from "../../services/blandai/call";

async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);

		const makeModel = searchParams.get("makeModel");
		const targetPrice = searchParams.get("targetPrice");
		const toNumber = searchParams.get("toNumber");

		const callResponse = await makeCall(toNumber, makeModel, targetPrice);

		return new Response(JSON.stringify(callResponse));
	} catch(error) {
		return new Response(JSON.stringify({ error: "Failed to scrape the webpage" }), { status: 500 });
	}
}

export {
	GET
};
