import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";

const GitHubBornOn = () => {
	const [bornOnInfo, setBornOnInfo] = useState({
		loginData: "",
		createdAtData: "",
	});
	const [isDataLoaded, setIsDataLoaded] = useState("false");

	const getBornOnInfo = async () => {
		try {
			const data = await API.get("cryptoapi", "/born");

			setIsDataLoaded(true);
			setBornOnInfo({
				loginData: data.bornOnInfo.login,
				createdAtData: data.bornOnInfo.created_at,
			});
		} catch (error) {
			console.error(`Error: ${error}`);
		}
	};

	useEffect(() => {
		getBornOnInfo();
	}, []);

	return (
		<>
			{isDataLoaded === true ? (
				<h2
					style={{
						border: "2px solid green",
						display: "inline-block",
						padding: "0.2em",
					}}>
					{bornOnInfo.loginData} - {bornOnInfo.createdAtData}
				</h2>
			) : (
				<h2>The GitHub Born On Information couldn't be loaded.</h2>
			)}
		</>
	);
};

export default GitHubBornOn;
