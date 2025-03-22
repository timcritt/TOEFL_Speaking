import React from "react";
import styles from "./Tag.module.css";

const Tag = ({ tagName, selected, handleSetTag }) => {
	const handleClick = (e) => {
		//prevent form submission when inside form element
		e.preventDefault();
		//e.stopPropagation();
		handleSetTag(tagName, selected);
	};

	return (
		<button
			className={`${styles.tag_item} ${selected ? styles.tag_item_selected : ""}
			}`}
			onClick={handleClick}
		>
			{"#" + tagName}
		</button>
	);
};

export default Tag;
