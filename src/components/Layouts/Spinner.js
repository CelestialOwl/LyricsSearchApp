import React from "react";
import spinner from "./spinner.gif";

function Spinner() {
	return (
		<div>
			<img
				src={spinner}
				alt='loading'
				style={{ width: "80px", margin: "40px auto", display: "block" }}
			/>
		</div>
	);
}

export default Spinner;
