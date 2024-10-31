import axios from "axios";

type callResponse = {
	status: "success"
	call_id?: string;
} | {
	status: "error"
};

async function makeCall(toNumber: string, carModel: string, targetPrice: string) {
	const apiKey = process.env.BLAND_API_KEY;
	const apiUrl = "https://us.api.bland.ai/v1/calls";

	const data = {
		"phone_number": toNumber,
		"from": null,
		"task": `You are trying to negotiate a price for a car. You must not accept more than ${targetPrice}. The car model is ${carModel}. Be polite but insist that they meet your price. If it doesn’t seem possible then thank them for their time and hang up. If they agree, say that you were be in contact very shortly to make payment and hang up.`,
		"model": "turbo",
		"language": "en",
		"voice": "Public - DealerEden",
		"voice_settings": {},
		"pathway_id": null,
		"local_dialing": false,
		"max_duration": "1",
		"answered_by_enabled": true,
		"wait_for_greeting": true,
		"record": true,
		"amd": true,
		"interruption_threshold": 50,
		"voicemail_message": null,
		"temperature": 0.5,
		"transfer_phone_number": null,
		"transfer_list": {},
		"metadata": null,
		"pronunciation_guide": [],
		"start_time": null,
		"background_track": "none",
		"request_data": {},
		"tools": [],
		"dynamic_data": [],
		"analysis_preset": null,
		"analysis_schema": {},
		"webhook": null,
		"calendly": {}
	};

	const response = await axios.post<callResponse>(apiUrl, data, {
		headers: {
			"Authorization": apiKey,
			"Content-Type": "application/json"
		}
	});

	return response.data;
}

export {
	makeCall
};
