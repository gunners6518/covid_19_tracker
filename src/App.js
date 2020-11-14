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
	//itemのuseStateを作る
	//初期状態は空のオブジェクトでOK
	const [items, setItems] = useState([]);

	//入力値のuseState作る
	const [inputValue, setInputValue] = useState('');

	//クリック時にitems配列に新しいitemを作る処理
	const handleAddButtonClick = () => {

		//作られるitemの定義
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};

		//items配列にpushされる
		const newItems = [...items, newItem];

		//useStateのitemsに反映
		setItems(newItems);

		//入力値を空に
		setInputValue('');
	};

	return (
		<div className="app-background">
			<div className="main-container">
				<div className="add-item-box">
				{/* inputValueにクリック時の入力値を与える */}
				<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
					{/* プラスアイコンでhandleAddButtonClickを発火 */}
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()}/>
				</div>
				<div className="item-list">
					{/* mapを使ってitems配列をitemのループで出力する */}
					{items.map((item, index) => (
						<div className="item-container">
							<div className="item-name">
								{item.isSelected ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className="completed">{item.itemName}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className="quantity">
								<button>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="total">Total: </div>
			</div>
		</div>
	);
};

export default App;
