import { NextApiRequest, NextApiResponse } from "next";

import { makeCall } from "../../services/blandai/call";

async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { searchParams } = new URL(req.url);

		const reasons = searchParams.get("reasons");
		const targetPrice = searchParams.get("targetPrice");
		const toNumber = searchParams.get("toNumber");

		const callResponse = await makeCall(toNumber, reasons, targetPrice);

		return new Response(JSON.stringify(callResponse), { status: 200 });
	} catch(error) {
		return new Response(JSON.stringify({ error: "Failed to start the call" }), { status: 500 });
	}
}

export {
	GET
};
