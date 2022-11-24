import React, { useState, useEffect, useRef } from 'react'
import ProfileWritingCard from '../../UI/Cards/ProfileWritingsCard/ProfileWritingCard';
import './Writings.scss';
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'
import Btn_prime1 from '../../UI/Buttons/Btn_prime1/Btn_prime1';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const SERVER_URL = import.meta.env.VITE_API_URL;

const Writings = () => {
	const [popupActive, setPopupActive] = useState(false);
	const [newShayari, setNewShayari] = useState({
		shayari: '',
		tags: ''
	});
	const [loading, setLoading] = useState(true);
	const [shayaris, setShayaris] = useState([]);
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const popup_ref = useRef(null);

	useEffect(() => {
		document.addEventListener("mousedown", clickOutsideRef);
		getShayaries();
		return () => document.removeEventListener("mousedown", clickOutsideRef);
	}, [user])

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

	const getShayaries = async () => {
		try {

			if (user) {
				const res = await axios.get(`${SERVER_URL}/user?id=${user.userId}`);
				console.log(res.data);
				setLoading(false);
				setShayaris(res.data.Post);
			}
		} catch (e) {
			console.log(e);
			toast.error('Something went wrong');
		}
	}

	const addShayari = async () => {
		try {
			if (user) {
				if (newShayari.shayari.length > 0 && newShayari.tags.length > 0) {
					const tags = newShayari.tags.split('#').filter((tag) => tag !== '')
					const config = {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					}
					const res = await axios.post(`${SERVER_URL}/post`,
						{
							content: newShayari.shayari,
							description: 'desc',
							tags: tags,
						}, config);
					console.log(res.data);
					setPopupActive(false);
					setNewShayari({
						shayari: '',
						tags: '',
					});
					getShayaries();
				} else {
					toast.warn('Please fill all fields');
				}
			}
		} catch (e) {
			console.log(e);
			toast.error('Something went wrong');
		}
	}


	return (
		<div className='Writings'>
			<div className={"writing_popup" + ` ${popupActive ? "active" : ""}`}>
				<div className="close" onClick={() => setPopupActive(false)}><AiFillCloseCircle />Close</div>
				<div className="popup_wrapper" ref={popup_ref}>
					<div className="label">Your Words</div>
					<textarea value={newShayari.shayari} onChange={handleNewShayariChange} name='shayari'></textarea>
					<div className="label">Tags</div>
					<input type="text" value={newShayari.tags} onChange={handleNewShayariChange} name='tags' />
					<div className="btn_wrapper" onClick={addShayari}>
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
				{
					loading ? <div className="loading">Loading...</div> :
						(
							shayaris.length === 0 ? <div className="no_shayari">No Shayari</div> :
								shayaris.map((shayari) => (
									<ProfileWritingCard key={shayari._id} shayari={shayari} />
								))
						)
				}
				{/* <NoInfo /> */}

			</div>
		</div>
	)
}

export default Writings