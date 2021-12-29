import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../contxt";

class Search extends Component {
	state = {
		trackTitle: "",
	};
	onchange = (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	findTracks = (dispatch, e) => {
		e.preventDefault();
		axios
			.get(
				`https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
			)
			.then((res) => {
				dispatch({
					type: "SEARCH_TRACKS",
					payload: res.data.message.body.track_list,
				});
				this.setState({ trackTitle: "" });
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;
					return (
						<div className='card card-body mb-4 p-4'>
							<h1 className='display-4 text-center'>
								<i className='fas fa-music'>Search for a song</i>
							</h1>
							<p className='lead text-center'>Get the Lyrics for any song</p>
							<form onSubmit={this.findTracks.bind(this, dispatch)}>
								<div className='form-group mb-2'>
									<input
										type='text'
										placeholder='Song title...'
										className='form-control form-control-lg'
										name='trackTitle'
										value={this.state.trackTitles}
										onChange={this.onchange}
									/>
								</div>
								<button
									className='btn btn-primary btn-lg btn-block mb-5'
									type='submit'>
									Get Track's lyrics
								</button>
							</form>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default Search;
