import React from "react";
import "./LimitChar.scss"

const LimitChar = ({ word, limit, hover, className, styles, fitContent }) => {
	return (
		/* Send hover true or limit value to enable the hover functionality and send fitContent=true to change width of max-content to fit-content*/
		hover || limit ?
			(
				<div className={'limit_char_container' + ` ${className ? className : ` ${fitContent ? 'noMax' : ""}`}` + ` ${word?.length > limit && hover ? 'limit_char_hover' : ""}`} styles={{ ...styles }}>
					{word && word?.length > limit
						? word.substring(0, limit).replaceAll("_", " ") + "..."
						: word?.replaceAll("_", " ")}
					<div className={'full_word_show'}>{word}</div>
				</div>
			)
			: (
				<div className={'overflow_ellipsis' + ` ${className ? className : ""}`} styles={{ ...styles }}>{word}</div >
			)
	);
};

export default LimitChar;
