import React from 'react'
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import ShayariCard from '../UI/Cards/ShayariCard/ShayariCard';
import ArchiveFill from '/public/assets/images/ArchiveFill.svg'
import './UserActivities.scss'
import ProfileWritingCard from '../UI/Cards/ProfileWritingsCard/ProfileWritingCard';
import Writings from './Writings/Writings';
import ShayariPopup from '../Modals/ShayariPopup/ShayariPopup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import Liked from './Liked/Liked';
import { useEffect } from 'react';


const SERVER_URL = import.meta.env.VITE_API_URL;

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
	const [shayaris, setShayaris] = useState([]);
	const [loading, setLoading] = useState(true);
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [links, setLinks] = useState([
		'writings',
		'liked'
	])
	const tabType = searchParams.get('tab');

	useEffect(() => {
		if (user) {
			getShayaries();
		}
	}, [user])

	const getShayaries = async () => {
		try {
			if (user) {
				setLoading(true);
				const res = await axios.get(`${SERVER_URL}/user?id=${user.userId}`);
				setLoading(false);
				setShayaris(res.data);
			}
		} catch (e) {
			console.log(e);
			toast.error('Something went wrong');
		}
	}

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
					<Liked isWritingloading={loading} shayaris={shayaris} getShayaries={getShayaries} setShayaries={setShayaris} />
					: <Writings isWritingloading={loading} shayaris={shayaris} getShayaries={getShayaries} />
				}
			</div>
		</div >
	)
}

export default UserActivities