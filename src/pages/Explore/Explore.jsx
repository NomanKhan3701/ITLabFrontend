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
	const [dropdownShow, setDropdownShow] = useState(false);
	const [dropdownValue, setDropdownValue] = useState('popular');
	const dropdown_toggle_el = useRef(null);
	const [authors, setAuthors] = useState([]);
	const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		document.addEventListener("mousedown", clickOutsideRef);
		return () => document.removeEventListener("mousedown", clickOutsideRef);
	}, [])

	useEffect(() => {
		if (token) {
			getAuthors();
		}
	}, [token])

	const clickOutsideRef = (e) => {
		if (dropdown_toggle_el.current && !dropdown_toggle_el.current.contains(e.target)) {
			setDropdownShow(false);
		}
	};

	const getAuthors = async () => {
		try {
			const res = await axios.get(`${SERVER_URL}/user/userlist`, null, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			});
			setAuthors(res.data.users)
		} catch (e) {
			toast.error('Something went wrong');
			console.log(e);
		}
	}

	const showAuthorBook = (index) => {
		setShowBook(true)

	}

	return (
		<div className='Explore container padding_top_nav'>
			<div className={'book_popup ' + `${showBook ? "active" : ""}`}>
				<div className="close" onClick={() => setShowBook(false)}><AiFillCloseCircle />Close</div>
				<div className="book_wrapper">
					<Book />
				</div>
			</div>
			<div className="filter_container">
				<input type="text" name="" id="" placeholder='Search by authors' />
				<div className="filter_dropdown" ref={dropdown_toggle_el} onClick={() => setDropdownShow(active => !active)}>
					<div className="value">{dropdownValue}</div>
					<img src={arrowDownOutline} alt="" />

					<div className={"dropdown_list " + `${dropdownShow ? "active" : ""}`}>
						<div className="dropdown_item" onClick={() => setDropdownValue("popular")}>Popular</div>
						<div className="dropdown_item" onClick={() => setDropdownValue("newest")}>Newest</div>
						<div className="dropdown_item" onClick={() => setDropdownValue("oldest")}>Oldest</div>
					</div>
				</div>
			</div>
			<div className="authors_container">
				{
					authors.map((author, index) => {
						return (
							// <div onClick={() => setShowBook(true)}>
							<AuthorCard author={author} key={index} onClick={() => showAuthorBook(index)} />
							// </div>
						)
					})
				}
			</div>
		</div>
	)
}

export default Explore