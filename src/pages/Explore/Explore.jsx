import React, { useState, useRef, useEffect } from 'react'
import arrowDownOutline from '/public/assets/images/arrowDownOutline.svg'
import AuthorCard from '../../components/UI/Cards/AuthorCard/AuthorCard';
import { AiFillCloseCircle } from 'react-icons/ai';
import Book from '../../components/Book/Book';
import './Explore.scss';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_API_URL;

const Explore = () => {
	const [showBook, setShowBook] = useState(false);
	const [loading, setLoading] = useState(true);
	const [reRender, setReRender] = useState(false);
	const [currAuthor, setCurrAuthor] = useState();
	const [authors, setAuthors] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (token) {
			getAuthors();
		}
	}, [token])

	const getAuthors = async () => {
		try {
			setLoading(true);
			const res = await axios.get(`${SERVER_URL}/user/userlist`, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			});
			setAuthors(res.data.users);
			setLoading(false);
		} catch (e) {
			toast.error('Something went wrong');
			console.log(e);
		}
	}

	const showAuthorBook = (index) => {
		setShowBook(true)
		setCurrAuthor(authors[index]);
	}

	return (
		<div className='Explore container padding_top_nav'>
			<div className={'book_popup ' + `${showBook ? "active" : ""}`}>
				<div className="close" onClick={() => {
					setShowBook(false)
					setReRender(true)
				}} name="close_book"><AiFillCloseCircle />Close</div>
				<div className="book_wrapper">
					<Book currAuthor={currAuthor} setCurrAuthor={setCurrAuthor} reRender={reRender} setReRender={setReRender} />
				</div>
			</div>
			<div className="filter_container">
				<input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" name="" id="" placeholder='Search by authors' />
			</div>
			<div className="authors_container">
				{
					loading ? <div className="loading">Loading...</div> :
						authors.map((author, index) => {
							if (!author.userName.toLowerCase().includes(searchQuery.toLowerCase())) return;
							return (
								<AuthorCard name={index === 0 ? "author_card" : null} author={author} key={index} onClick={() => showAuthorBook(index)} />
							)
						})
				}
			</div>
		</div>
	)
}

export default Explore