import React, { useState, useRef, useEffect } from 'react'
import arrowDownOutline from '/public/assets/images/arrowDownOutline.svg'
import ShayariCard from '../../components/UI/Cards/ShayariCard/ShayariCard'
import './Posts.scss'
import * as actions from '../../store/actions/index';
import { useDispatch } from 'react-redux';
import ShayariPopup from '../../components/Modals/ShayariPopup/ShayariPopup';

const Posts = () => {
	const [dropdownShow, setDropdownShow] = useState(false);
	const [dropdownValue, setDropdownValue] = useState('popular');
	const dropdown_toggle_el = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		document.addEventListener("mousedown", clickOutsideRef);
		return () => document.removeEventListener("mousedown", clickOutsideRef);
	}, [])

	const clickOutsideRef = (e) => {
		if (dropdown_toggle_el.current && !dropdown_toggle_el.current.contains(e.target)) {
			setDropdownShow(false);
		}
	};

	const openShayariPopup = () => {
		dispatch(actions.setShayariPopupOpen(true));
	}

	return (
		<div className='Posts container padding_top_nav'>
			<ShayariPopup />
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
				<ShayariCard onClick={openShayariPopup} />
				<ShayariCard onClick={openShayariPopup} />
				<ShayariCard onClick={openShayariPopup} />
				<ShayariCard onClick={openShayariPopup} />
				<ShayariCard onClick={openShayariPopup} />
				<ShayariCard onClick={openShayariPopup} />
				<ShayariCard onClick={openShayariPopup} />
				<ShayariCard onClick={openShayariPopup} />
				<ShayariCard onClick={openShayariPopup} />
				<ShayariCard onClick={openShayariPopup} />
			</div>

		</div>
	)
}

export default Posts