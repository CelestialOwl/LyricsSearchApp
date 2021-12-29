import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Spinner from "../Layouts/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function Lyrics() {
	const { id } = useParams();
	const { cid } = useParams();
	const [tracks, settracks] = useState({});
	const [lyrics, setlyrics] = useState("");
	useEffect(() => {
		axios
			.get(
				`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
			)
			.then((res) => {
				setlyrics(res.data.message.body.lyrics.lyrics_body);
				return axios.get(
					`https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${cid}&apikey=${process.env.REACT_APP_MM_KEY}`
				);
			})
			.then((res) => {
				settracks(res.data.message.body.track);
			})
			.catch((err) => console.log(err));
	}, []);
	const ui =
		tracks === undefined ||
		lyrics === undefined ||
		Object.keys(tracks).length === 0 ||
		Object.keys(lyrics) === 0 ? (
			<Spinner />
		) : (
			<React.Fragment>
				<Link to='/' className='btn btn-dark btn-sm mb-4'>
					Go Back
				</Link>
				<div className='card'>
					<h5 className='card-header'>
						{tracks.track_name} by{" "}
						<span className='text-secondary'>{tracks.artist_name}</span>
					</h5>
					<div className='card-body'>
						<p className='card-text'>{lyrics}</p>
					</div>
				</div>
				<ul className='list-group mt-3'>
					<li className='list-group-item'>
						<strong>Album ID: </strong>
						{tracks.album_id}
					</li>
					<li className='list-group-item'>
						<strong>Genre: </strong>
						{
							tracks.primary_genres.music_genre_list[0].music_genre
								.music_genre_name
						}
					</li>
					<li className='list-group-item'>
						<strong>Explicit Words: </strong>{" "}
						{tracks.explicit === 0 ? "No" : "Yes"}
					</li>
					<li className='list-group-item'>
						<strong>Release Date: </strong>
						<Moment format='M/D/YYYY'>{tracks.updated_time}</Moment>
					</li>
				</ul>
			</React.Fragment>
		);
	return ui;
}

export default Lyrics;
