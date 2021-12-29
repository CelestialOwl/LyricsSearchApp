import "./App.css";
import Navbar from "./components/Layouts/Navbar";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./components/Layouts/Index";
import Lyrics from "./components/tracks/Lyrics";

import { Provider } from "./contxt";
function App() {
	return (
		<Provider>
			<Router>
				<React.Fragment>
					<Navbar />
					<div className='container'>
						<Routes>
							<Route exact path='/' element={<Index />} />
							<Route exact path='lyrics/track/:id/:cid' element={<Lyrics />} />
						</Routes>
					</div>
				</React.Fragment>
			</Router>
		</Provider>
	);
}

export default App;
