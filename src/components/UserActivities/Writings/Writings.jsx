import React, { useState, useEffect, useRef } from 'react'
import ProfileWritingCard from '../../UI/Cards/ProfileWritingsCard/ProfileWritingCard';
import './Writings.scss';
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'
import Btn_prime1 from '../../UI/Buttons/Btn_prime1/Btn_prime1';

const Writings = () => {
	const [popupActive, setPopupActive] = useState(true);
	const [newShayari, setNewShayari] = useState({
		shayari: '',
		tags: '',
	});
	const popup_ref = useRef(null);

	useEffect(() => {
		document.addEventListener("mousedown", clickOutsideRef);
		return () => document.removeEventListener("mousedown", clickOutsideRef);
	}, [])

	const clickOutsideRef = (e) => {
		if (popup_ref.current && !popup_ref.current.contains(e.target)) {
			setPopupActive(false);
		}
	};

	const handleNewShayariChange = (e) => {
		setNewShayari({
			...newShayari,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='Writings'>
			<div className={"writing_popup" + ` ${popupActive ? "active" : ""}`}>
				<div className="close" onClick={() => setPopupActive(false)}><AiFillCloseCircle />Close</div>
				<div className="popup_wrapper" ref={popup_ref}>
					<div className="label">Your Words</div>
					<textarea value={newShayari.shayari} onChange={handleNewShayariChange} name='shayari'></textarea>
					<div className="label">Tags</div>
					<input type="text" value={newShayari.tags} onChange={handleNewShayariChange} name='tags' />
					<div className="btn_wrapper">
						<div className='plus'>+</div>
						Add Shayari
					</div>
				</div>
			</div>

			<div className="add_shayary_btn" onClick={() => setPopupActive(true)}>
				<div className='plus'>+</div>
				<div>Add Shayari</div>
			</div>
			<div className="writings">
				{/* <NoInfo /> */}
				<ProfileWritingCard />
				<ProfileWritingCard />
				<ProfileWritingCard />
				<ProfileWritingCard />
				<ProfileWritingCard />
				<ProfileWritingCard />
			</div>
		</div>
	)
}

export default Writings