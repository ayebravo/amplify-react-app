// Import useState and useEffect hooks from React
import React, { useState, useEffect } from "react";

// Import the API category from AWS Amplify
import { API } from "aws-amplify";

import GitHubBornOn from "./GitHubBornOn.js";
import "./App.css";

const App = () => {
	// Create additional state to hold user input for limit and start properties
	const [input, updateInput] = useState({ limit: 5, start: 0 });

	// Create a new function to allow users to update the input values
	const updateInputValues = (type, value) => {
		updateInput({ ...input, [type]: value });
	};

	// Create coins variable and set to empty array
	const [coins, updateCoins] = useState([]);
	const [loading, setLoading] = useState(true);

	// Define function to all API
	// async function fetchCoins() { // Reformated to what it's in line 15
	const fetchCoins = async () => {
		setLoading(true);

		const { limit, start } = input;
		const data = await API.get(
			"cryptoapi",
			`/coins?limit=${limit}&start=${start}`
		);
		updateCoins(data.coins);

		setLoading(false);
	};

	// Call fetchCoins function when component loads
	useEffect(() => {
		fetchCoins();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="App">
			{loading && <h2>Loading...</h2>}

			{!loading && (
				<div>
					<input
						onChange={(e) =>
							updateInputValues("limit", e.target.value)
						}
						placeholder="Enter a limit"
					/>
					<input
						placeholder="Enter a starting value"
						onChange={(e) =>
							updateInputValues("start", e.target.value)
						}
					/>

					<button onClick={fetchCoins}>Fetch Coins</button>

					{coins.map((coin) => (
						<div key={coin.name}>
							<h2>
								{coin.name} - {coin.symbol}
							</h2>
							<h5>${coin.price_usd}</h5>
						</div>
					))}
					<hr />
					<GitHubBornOn />
				</div>
			)}
		</div>
	);
};

export default App;
