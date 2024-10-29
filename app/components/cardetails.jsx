"use client";

import { useState } from "react";
import Button from '@mui/material/Button';

function CarDetails() {
	const [makeModel, setMakeModel] = useState("");
	const [price, setPrice] = useState("");
	const [condition, setCondition] = useState("");
	const [age, setAge] = useState("");

	const [suggestedData, setSuggestedData] = useState();

	function handleResearch() {
		fetch(`/api/research?make=${makeModel}&price=${price}&condition=${condition}&age=${age}`)
		.then(response => response.json())
		.then(response => {
			setSuggestedData(JSON.parse(response.price));
		});
	}

	function makeCall() {
		const toNumber = encodeURIComponent("+447803508419");

		fetch(`/api/call?makeModel=${makeModel}&targetPrice=${suggestedData.recommendedHagglePrice}&toNumber=${toNumber}`)
		.then(response => response.json())
		.then(response => {
			console.log("Call response:", response);
		});
	}

	return (
		<div>
			{suggestedData
				? (
					suggestedData.error
					? <p>Error estimating the price for that: ${suggestedData.error}</p>
					: (
						<div>
							<p>We think you can get this car for £{suggestedData.recommendedHagglePrice}!</p>
							<p>{suggestedData.reasoning}</p>
							<br/><br/>
							<p>We can even phone the fuckers for you!</p>

							<Button onClick={makeCall}>Call them now!</Button>
						</div>
					)
				)
				: <>
					<div>
						<div>
							<label>Car make & model</label>
							<input value={makeModel} onChange={(e) => setMakeModel(e.currentTarget.value)}/>
						</div>

						<div>
							<label>Price</label>
							<input value={price} onChange={(e) => setPrice(e.currentTarget.value)}/>
						</div>

						<div>
							<label>Condition</label>
							<input value={condition} onChange={(e) => setCondition(e.currentTarget.value)}/>
						</div>

						<div>
							<label>Age</label>
							<input value={age} onChange={(e) => setAge(e.currentTarget.value)}/>
						</div>
					</div>

					<Button onClick={handleResearch}>Show me the money</Button>
				</>
			}

		</div>
	)
}

export default CarDetails;
