import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";

const GitHubBornOn = () => {
	const [bornOnInfo, setBornOnInfo] = useState(null);
	const [loginInfo, setLoginInfo] = useState("");
	const [createdAtInfo, setCreatedAtInfo] = useState("");

	const getBornOnInfo = async () => {
		const data = await API.get("cryptoapi", "/born");
		setBornOnInfo(data.bornOnInfo);
	};

	useEffect(() => {
		getBornOnInfo();
	}, []);

	if (bornOnInfo && loginInfo === "") {
		setLoginInfo(bornOnInfo.login);
	}

	if (bornOnInfo && createdAtInfo === "") {
		setCreatedAtInfo(bornOnInfo.created_at);
	}

	return (
		<>
			{bornOnInfo && loginInfo && createdAtInfo && (
				<h2
					style={{
						border: "2px solid purple",
						display: "inline-block",
						padding: "0.2em",
					}}>
					{loginInfo} - {createdAtInfo}
				</h2>
			)}
		</>
	);
};

export default GitHubBornOn;
