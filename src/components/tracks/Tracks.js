import React from "react";
import { Consumer } from "../../contxt";
import Spinner from "../Layouts/Spinner";
import Track from "./Track";

function Tracks() {
	return (
		<Consumer>
			{(value) => {
				const { track_list, heading } = value;
				if (track_list === undefined || track_list.length === 0) {
					return <Spinner />;
				} else {
					return (
						<React.Fragment>
							<h3 className='text-center mb-4'>{heading}</h3>
							<div className='row'>
								{track_list.map((res) => (
									<Track track={res.track} key={res.track.track_id} />
								))}
							</div>
						</React.Fragment>
					);
				}
			}}
		</Consumer>
	);
}

export default Tracks;
