import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../../store/actions/index";
import { AiFillCloseCircle } from 'react-icons/ai'
import './ShayariPopup.scss';

const ShayariPopup = ({ shayari }) => {
	const dispatch = useDispatch();
	const shayariPopupOpen = useSelector((state) => state.popup.shayariPopupOpen);
	const popup_ref = useRef(null);

	useEffect(() => {
		document.addEventListener("mousedown", clickOutsideRef);
		return () => document.removeEventListener("mousedown", clickOutsideRef);
	}, [])

	const clickOutsideRef = (e) => {
		if (popup_ref.current && !popup_ref.current.contains(e.target)) {
			dispatch(actions.setShayariPopupOpen(false));
		}
	};

	return (
		<div className={'Shayari_popup' + ` ${shayariPopupOpen ? "active" : ""}`}>
			<div className="close" onClick={() => dispatch(actions.setShayariPopupOpen(false))}><AiFillCloseCircle />Close</div>
			<div className="popup_wrapper" ref={popup_ref}>
				<div className="main_content">
					<div className="shayari_wrapper">
						<div className="shayari">
							{shayari && shayari.content}
						</div>
						<div className="name">
							~ Noman
						</div>
					</div>
				</div>
				<div className="comments_container">
					<div className="add_comment">
						<input type="text" placeholder='Add a comment' />
						<div className="comment">Comment</div>
					</div>
					<div className="comments">
						<div className="comment">
							<img src="/public/assets/images/p3.jpg" alt="" />
							<div className="comment_content">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi accusantium dignissimos itaque odio perspicia
							</div>
						</div>
						<div className="comment">
							<img src="/public/assets/images/p3.jpg" alt="" />
							<div className="comment_content">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi accusantium dignissimos itaque odio perspicia
							</div>
						</div>
						<div className="comment">
							<img src="/public/assets/images/p3.jpg" alt="" />
							<div className="comment_content">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi accusantium dignissimos itaque odio perspicia
							</div>
						</div>
						<div className="comment">
							<img src="/public/assets/images/p3.jpg" alt="" />
							<div className="comment_content">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi accusantium dignissimos itaque odio perspicia
							</div>
						</div>
						<div className="comment">
							<img src="/public/assets/images/p3.jpg" alt="" />
							<div className="comment_content">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi accusantium dignissimos itaque odio perspicia
							</div>
						</div>
						<div className="comment">
							<img src="/public/assets/images/p3.jpg" alt="" />
							<div className="comment_content">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi accusantium dignissimos itaque odio perspicia
							</div>
						</div>

					</div>
				</div>

			</div>
		</div>
	)
}

export default ShayariPopup