import React from 'react'
import arrowDownOutline from '/public/assets/images/arrowDownOutline.svg'
import AuthorCard from '../../components/UI/Cards/AuthorCard/AuthorCard';
import { BsCaretDown } from 'react-icons/bs'
import './Explore.scss';

const Explore = () => {

	const authors = [
		{
			name: 'Zakir Khan',
			img: '/public/assets/images/zakirKhan.svg',
		},
		{
			name: 'Noman Khan',
			img: '/public/assets/images/zakirKhan.svg',
		},
		{
			name: 'Varun koranne',
			img: '/public/assets/images/zakirKhan.svg',
		},
		{
			name: 'Rupin Malik',
			img: '/public/assets/images/zakirKhan.svg',
		},
		{
			name: 'Noman Khan',
			img: '/public/assets/images/zakirKhan.svg',
		},
		{
			name: 'Varun koranne',
			img: '/public/assets/images/zakirKhan.svg',
		},
		{
			name: 'Rupin Malik',
			img: '/public/assets/images/zakirKhan.svg',
		},

	]

	return (
		<div className='Explore container padding_top_nav'>
			<div className="filter_container">
				<input type="text" name="" id="" placeholder='Search by authors' />
				<div className="filter_dropdown">
					<div className="value">Popular</div>
					<img src={arrowDownOutline} alt="" />
				</div>
			</div>
			<div className="authors_container">
				{
					authors.map((author, index) => {
						return <AuthorCard author={author} key={index} />
					})
				}
			</div>
		</div>
	)
}

export default Explore