import React from 'react'
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import ShayariCard from '../UI/Cards/ShayariCard/ShayariCard';
import ArchiveFill from '/public/assets/images/ArchiveFill.svg'
import './UserActivities.scss'
import ProfileWritingCard from '../UI/Cards/ProfileWritingsCard/ProfileWritingCard';
import Writings from './Writings/Writings';

const NoInfo = () => {
	return (
		<div className="no_info">
			<div className="bin_wrapper">
				<img src={ArchiveFill} alt="" />
			</div>
			<div className="bold_txt">Looks Empty!</div>
			<div>Add your syllabus with chapters & Topics</div>
		</div>
	)
}


const UserActivities = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [links, setLinks] = useState([
		'writings',
		'liked'
	])
	const tabType = searchParams.get('tab');

	return (
		<div className='User_activities'>
			<ShayariPopup />
			<div className="secondary_tab">
				{links.map((link, index) => {
					return (
						<div
							key={index}
							className={`tab_item ${(index === 0 && tabType === null) || tabType === link ? 'active' : ''}`}
							onClick={() => {
								setSearchParams({ tab: link })
							}}
						>
							{link}
						</div>
					)
				})}
			</div>
			<div className='user_activity'>
				{tabType === 'liked' ?
					<div className="liked">
						{/* <NoInfo /> */}
						<ShayariCard />
						<ShayariCard />
						<ShayariCard />
						<ShayariCard />
						<ShayariCard />
						<ShayariCard />
					</div>
					: <Writings />
				}
			</div>
		</div >
	)
}

export default UserActivities