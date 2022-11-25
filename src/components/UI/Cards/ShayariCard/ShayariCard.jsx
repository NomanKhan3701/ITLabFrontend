import React from 'react'
import './ShayariCard.scss';
import { BsSuitHeartFill, BsSuitHeart, BsBookmarkPlus } from "react-icons/bs";
import { BiCommentDetail } from 'react-icons/bi';
import LimitChar from '../../LimitChar/LimitChar';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SERVER_URL = import.meta.env.VITE_API_URL;
const ShayariCard = ({ onClick, shayari, setShayaries }) => {
	const token = useSelector((state) => state.auth.token);
	const likeShayari = async () => {
		try {
			const res = await axios.patch(`${SERVER_URL}/post/like/${shayari.postId}`, null,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
			setShayaries((shayaries) => {
				const index = shayaries.findIndex((Shayari) => Shayari.postId === shayari.postId);
				shayaries[index].Likes = res.data.Likes;
				if (shayaries[index].isLiked) {
					shayaries[index].isLiked = false;
				} else {
					shayaries[index].isLiked = true;
				}
				return [...shayaries];
			})
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className='Shayari_card' >
			<div onClick={onClick}>
				<div className="profile">
					<div className="img">
						<img src={shayari.createdBy && shayari.createdBy.image ? shayari.createdBy.image : "/assets/images/p1.jpg"} alt="" />
					</div>
					<div className="name">{shayari.createdBy && shayari.createdBy.userName}</div>
				</div>
				<div className="shayari">
					<LimitChar word={shayari && shayari?.content} limit={180} fitContent={true} hover={false} />
				</div>
			</div>

			<div className="utils">
				<div className={`icon_wrapper ${shayari.isLiked ? 'active' : ''}`} onClick={likeShayari}>
					<BsSuitHeartFill />
					<div>{shayari?.Likes?.length}</div>
				</div>

				<div className="icon_wrapper" onClick={onClick}>
					<BiCommentDetail />
				</div>
				{/* <div className="icon_wrapper">
					<BsBookmarkPlus />
				</div> */}
			</div>
		</div>
	)
}

export default ShayariCard