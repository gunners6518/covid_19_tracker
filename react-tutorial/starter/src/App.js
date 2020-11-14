import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faChevronLeft,
	faCircle,
	faCheckCircle,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
	const [items, setItems] = useState([]);

	return (
		<div className="app-background">
			<div className="main-container">
				<div className="add-item-box">
					<input className="add-item-input" placeholder="Add an item..." />
					<FontAwesomeIcon icon={faPlus} />
				</div>
				<div className="item-list">
					<div className="item-container"></div>
				</div>
				<div className="total">Total: </div>
			</div>
		</div>
	);
};

export default App;