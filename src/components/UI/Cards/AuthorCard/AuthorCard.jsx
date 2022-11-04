import React from 'react'
import './AuthorCard.scss'

const AuthorCard = ({ author, key }) => {
	return (
		<div className='Author_card' key={key}>
			<img src={author.img} alt="" />
			<div className="card_name">{author.name}</div>
		</div>
	)
}

export default AuthorCard