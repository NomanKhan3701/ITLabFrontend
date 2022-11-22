import React from 'react'
import './AuthorCard.scss'

const AuthorCard = ({ author, key, onClick }) => {
	return (
		<div className='Author_card' key={key} onClick={onClick}>
			<img src={author.img} alt="" />
			<div className="card_name">{author.name}</div>
		</div>
	)
}

export default AuthorCard