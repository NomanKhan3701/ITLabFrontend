import React from 'react'
import './ShayariCard.scss';
import { BsSuitHeartFill, BsSuitHeart, BsBookmarkPlus } from "react-icons/bs";
import { BiCommentDetail } from 'react-icons/bi';
import LimitChar from '../../LimitChar/LimitChar';


const ShayariCard = () => {
	return (
		<div className='Shayari_card'>
			<div className="profile">
				<div className="img">
					<img src="/assets/images/p1.jpg" alt="" />
				</div>
				<div className="name">Noman_37</div>
			</div>
			<div className="shayari">
				<LimitChar word={'Tis hard to say, if greater want of skill Appear in writing or in judging ill Tis hard to say, if greater want of skill Appear in writing or in judging ill Tis hard to say, if greater want of skill Appear in writing or in judging ill Tis hard to say, if greater want of skill Appear in writing or in judging ill Tis hard to say, if greater want of skill Appear in writing or in judging ill Tis hard to say, if greater want of skill Appear in writing or in judging ill'} limit={200} fitContent={true} hover={false} />

			</div>
			<div className="utils">
				<div className="icon_wrapper">
					<BsSuitHeart />
				</div>
				<div className="icon_wrapper">
					<BiCommentDetail />
				</div>
				<div className="icon_wrapper">
					<BsBookmarkPlus />
				</div>
			</div>
		</div>
	)
}

export default ShayariCard