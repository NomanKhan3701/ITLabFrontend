import React, { useState, useRef, useEffect } from 'react'
import arrowDownOutline from '/public/assets/images/arrowDownOutline.svg'
import ShayariCard from '../../components/UI/Cards/ShayariCard/ShayariCard'
import './Posts.scss'
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import ShayariPopup from '../../components/Modals/ShayariPopup/ShayariPopup';
import axios from 'axios';
import defaultImage from '/public/assets/images/defaultImage.png';

const SERVER_URL = import.meta.env.VITE_API_URL;
const Posts = () => {
	const [dropdownShow, setDropdownShow] = useState(false);
	const [dropdownValue, setDropdownValue] = useState('popular');
	const [currShayari, setCurrShayari] = useState(null);
	const [loading, setLoading] = useState(true);
	const [shayaries, setShayaries] = useState([]);
	const dropdown_toggle_el = useRef(null);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		document.addEventListener("mousedown", clickOutsideRef);
		if (token) {
			getShayaries();
		}
		return () => document.removeEventListener("mousedown", clickOutsideRef);
	}, [token])

	const clickOutsideRef = (e) => {
		if (dropdown_toggle_el.current && !dropdown_toggle_el.current.contains(e.target)) {
			setDropdownShow(false);
		}
	};

	const openShayariPopup = (index) => {
		setCurrShayari(shayaries[index]);
		dispatch(actions.setShayariPopupOpen(true));
	}

	const getShayaries = async () => {
		try {
			setLoading(true);
			const res = await axios.get(`${SERVER_URL}/post/Posts`, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			});
			const shayaries = res.data.Posts.map((shayari) => {
				for (let i = 0; i < shayari.Likes.length; i++) {
					if (shayari.Likes[i].userUserId === user.userId) {
						shayari.isLiked = true;
						break;
					}
				}
				return shayari;
			});
			setShayaries(shayaries);
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className='Posts container padding_top_nav'>
			<ShayariPopup shayari={currShayari} />
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
			<div className="shayari_container">
				{
					shayaries.map((shayari, index) => {
						return (
							<ShayariCard
								key={index}
								shayari={shayari}
								onClick={() => openShayariPopup(index)}
								setShayaries={setShayaries}
							/>
						)
					})
				}
			</div>

		</div>
	)
}

export default Posts