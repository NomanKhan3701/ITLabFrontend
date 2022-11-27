import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../../store/actions/index";
import { AiFillCloseCircle } from 'react-icons/ai'
import './ShayariPopup.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

const SERVER_URL = import.meta.env.VITE_API_URL;
const ShayariPopup = ({ shayari, setShayaries, isLikedPage }) => {
	const dispatch = useDispatch();
	const shayariPopupOpen = useSelector((state) => state.popup.shayariPopupOpen);
	const popup_ref = useRef(null);
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [newComment, setNewComment] = useState('');
	// console.log(shayari);

	useEffect(() => {
		document.addEventListener("mousedown", clickOutsideRef);
		return () => document.removeEventListener("mousedown", clickOutsideRef);
	}, [])

	const clickOutsideRef = (e) => {
		if (popup_ref.current && !popup_ref.current.contains(e.target)) {
			// console.log('clicked outside');
			// dispatch(actions.setShayariPopupOpen(false));
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			postComment();
		}
	}

	const postComment = async () => {
		try {
			if (newComment.length > 0) {
				const res = await axios.post(`${SERVER_URL}/post/comments`, {
					postPostId: shayari.postId,
					userUserId: user.userId,
					comment: newComment
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				if (isLikedPage) {
					setShayaries((prev) => {
						const newShayaries = prev;
						const index = newShayaries.Likes.findIndex((shayarie) => shayarie.postId.postId === shayari.postId);
						newShayaries.Likes[index].postId.comments = res.data;
						return newShayaries;
					});
				} else {
					setShayaries((prev) => {
						const newShayaries = [...prev];
						const index = newShayaries.findIndex((shayarie) => shayarie.postId === shayari.postId);
						newShayaries[index].comments = res.data;
						return newShayaries;
					});
				}

				setNewComment('');

			} else {
				toast.warn('Please enter a comment');
			}
		} catch (e) {
			console.log(e);
			toast.error('Something went wrong');
		}
	}

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
							~ {shayari && shayari.createdBy.userName}
						</div>
					</div>
				</div>
				<div className="comments_container">
					<div className="add_comment">
						<input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder='Add a comment' onKeyDown={handleKeyDown} />
						<div className="comment">Comment</div>
					</div>
					<div className="comments">
						{
							shayari && shayari.comments.length > 0 ?
								shayari.comments.map((comment, index) => {
									return (
										<div className="comment">
											<img src={comment.createdBy.image.url} alt="" />
											<div className="comment_content">
												{comment.comment}
											</div>
										</div>
									)
								}) : <div className="no_comments">No comments yet, Be the first one to comment</div>
						}
					</div>
				</div>

			</div>
		</div>
	)
}

export default ShayariPopup