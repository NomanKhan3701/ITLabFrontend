import React from 'react'
import './AuthorCard.scss'
import defaultImage from '/public/assets/images/defaultImage.png'

const AuthorCard = ({ author, key, onClick, name }) => {
	return (
		<div className='Author_card' name={name} key={key} onClick={onClick}>
			<img src={author.image && author.image.url ? author.image.url : defaultImage} alt="" />
			<div className="card_name">{author.userName}</div>
		</div>
	)
}

export default AuthorCard