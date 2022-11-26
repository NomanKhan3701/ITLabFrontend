import React, { useState, useEffect, useRef } from 'react'
import ProfileWritingCard from '../../UI/Cards/ProfileWritingsCard/ProfileWritingCard';
import './Liked.scss';
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'
import Btn_prime1 from '../../UI/Buttons/Btn_prime1/Btn_prime1';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import ShayariCard from '../../UI/Cards/ShayariCard/ShayariCard';
import ShayariPopup from '../../Modals/ShayariPopup/ShayariPopup';
import * as actions from '../../../store/actions/index';

const SERVER_URL = import.meta.env.VITE_API_URL;

const Liked = ({ shayaris, getShayaries, setShayaries, isWritingloading }) => {
	const [popupActive, setPopupActive] = useState(false);
	const [currShayari, setCurrShayari] = useState(null);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const openShayariPopup = (shayari) => {
		setCurrShayari(shayari);
		dispatch(actions.setShayariPopupOpen(true));
	}

	return (
		<div className='Liked'>
			<ShayariPopup shayari={currShayari} setShayaries={setShayaries} />
			<div className="writings">
				{
					isWritingloading ? <div className="loading">Loading...</div> :
						(
							shayaris.Likes.length === 0 ? <div className="loading">No data, Upload Shayaries to view</div> :
								shayaris.Likes.map((shayari, index) => (
									<ShayariCard
										key={index}
										shayari={shayari.postId}
										onClick={() => openShayariPopup(shayari.postId)}
										setShayaries={setShayaries}
									/>
								))
						)
				}
				{/* <NoInfo /> */}

			</div>
		</div>
	)
}

export default Liked