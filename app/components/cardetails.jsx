"use client";

import { useState } from "react";

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

					<button onClick={handleResearch}>Show me the money</button>
				</>
			}

		</div>
	)
}

export default CarDetails;
