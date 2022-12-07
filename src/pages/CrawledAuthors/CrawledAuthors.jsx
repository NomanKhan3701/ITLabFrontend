import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import AuthorCard from '../../components/UI/Cards/AuthorCard/AuthorCard';
import './CrawledAuthors.scss'

const SERVER_URL = import.meta.env.VITE_API_URL;
const CrawledAuthors = () => {
	const [authors, setAuthors] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	useEffect(() => {
		const crawledAuthors = localStorage.getItem('crawledAuthors');
		if (crawledAuthors) {
			const authors = JSON.parse(crawledAuthors);
			setAuthors(authors);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} else {
			getCrawledAuthors();
		}
	}, [])

	const getCrawledAuthors = async () => {
		try {
			const res = await axios.get(`${SERVER_URL}/poetry/images`);
			setAuthors(res.data);
			localStorage.setItem('crawledAuthors', JSON.stringify(res.data));
			setLoading(false);
		} catch (e) {
			console.log(e);
			toast.error('Something went wrong');
		}
	}
	return (
		<div className='Crawled_authors padding_top_nav container'>

			{
				loading ? <div className="loading">
					Loading... <span>(It takes max of 5 sec to get the authors crawled data)</span>
				</div>
					: (<div className="authors_container">
						{authors.map((author, index) => {
							if (index % 2 === 0) {
								return null
							}
							return (
								<div className='Author_card' key={index} >
									<img src={author.image ? author.image : defaultImage} alt="" />
									<div className="card_name">{author.name}</div>
								</div>
							)
						})}
					</div>)
			}
		</div>

	)
}

export default CrawledAuthors