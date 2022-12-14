import React from 'react'
import './ProfileViewAndEdit.scss';
import defaultImage from '/public/assets/images/defaultImage.png';
import { BsFillFilePostFill, BsPencil, BsTrash } from 'react-icons/bs';
import { BiDonateHeart } from 'react-icons/bi';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as actions from '../../store/actions/index.js';

const SERVER_URL = import.meta.env.VITE_API_URL;

const ProfileViewAndEdit = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [saving, setSaving] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [profile, setProfile] = useState({
		userId: user?.userId,
		userName: user?.userName,
		email: user?.email,
		img: user?.image?.url,
		// img: "/public/assets/images/p3.jpg",
	});
	const fileRef = useRef();
	const dragRef = useRef(null);
	const [prevImg, setPrevImg] = useState();
	const [files, setFiles] = useState([]);

	const handleFileBtnClick = () => {
		fileRef.current.click();
	};

	useEffect(() => {
		if (user) {
			setProfile({
				userId: user?.userId,
				userName: user?.userName,
				email: user?.email,
				img: user?.image?.url,
			})
		}
	}, [user]);

	useEffect(() => {
	}, [profile]);

	const process = (file) => {
		if (!file) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = function (event) {
			const imgElement = document.createElement("img");
			imgElement.src = event.target.result;

			imgElement.onload = function (e) {
				const canvas = document.createElement("canvas");
				const MAX_WIDTH = 600;

				const scaleSize = MAX_WIDTH / e.target.width;
				canvas.width = MAX_WIDTH;
				canvas.height = e.target.height * scaleSize;

				const ctx = canvas.getContext("2d");

				ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

				const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
				setPrevImg(srcEncoded);
			};
		};
	};

	const handleFile = async (e) => {
		e.preventDefault();
		for (let i = 0; i < e.target.files.length; i++) {
			setFiles((prevFiles) => {
				return [...prevFiles, e.target.files[i]];
			});
		}
		await process(e.target.files[0]);
	};

	const handleDrag = (e, type) => {
		e.preventDefault();
		e.stopPropagation();
		if (type === "dragOver") dragRef.current.classList.add("active");
		else if (type === "dragLeave") dragRef.current.classList.remove("active");
	};

	const handleDrop = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		dragRef.current.classList.remove("active");
		const uploadedFiles = e.dataTransfer.files;
		dragRef.current.classList.add("uploading");
		for (let i = 0; i < uploadedFiles.length; i++) {
			props.setFiles((prevFiles) => {
				return [...prevFiles, uploadedFiles[i]];
			});
		}
		await process(uploadedFiles[0]);
		dragRef.current.classList.remove("uploading");
	};

	const handleProfileEdit = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	}

	const saveProfile = async () => {

		try {
			setSaving(true);
			toast.promise(axios.patch(`${SERVER_URL}/user/image/${user.userId}`, {
				updatedImg: prevImg
			}).then((res) => {
				const editedUser = {
					userId: user.userId,
					userName: user.userName,
					email: user.email,
					image: res.data.image
				}
				dispatch(actions.authSuccess(
					token, editedUser
				));
				setIsEditing(false);
				setSaving(false);
			}), {
				pending: 'Saving Profile...',
				success: 'Profile updated successfully',
				error: 'Error'
			});

		} catch (e) {
			console.log(e);
			toast.error("Something went wrong");
		}

	};

	return (
		<div className='Profile_view_edit'>
			{
				isEditing ? (
					<div className="profile_image">
						<div className="upload-img" onClick={handleFileBtnClick}>
							<div
								ref={dragRef}
								className="img"
								onDragOver={(e) => handleDrag(e, "dragOver")}
								onDragLeave={(e) => handleDrag(e, "dragLeave")}
								onDrop={handleDrop}
							>
								<img
									src={prevImg ? prevImg : profile.img ? profile.img : defaultImage}
									alt=""
								/>
								<input
									ref={fileRef}
									type="file"
									onChange={handleFile}
									multiple
									hidden
									id="myFile"
									name="filename"
								/>
							</div>
						</div>
					</div>) : (
					<div className="profile_image">
						<div className='img_wrapper'>
							<img src={profile.img ? profile.img : defaultImage} alt="" />
						</div>
					</div>
				)
			}

			<div className="profile_details">
				<div className="username">{profile.userName}</div>
				<div className="email">{profile.email}</div>
				<div className="achivements">
					<div className="total_posts">
						<BsFillFilePostFill />
						<span className="label">Total Shayaries: </span>
						<span className="value">10</span>
					</div>
					<div className="total_posts like">
						<BiDonateHeart />
						<span className="label">Total Likes: </span>
						<span className="value">10</span>
					</div>
					{!saving && <div name="saved_status_check"></div>}
				</div>
				{
					isEditing ? (<div className='btn_save' onClick={() => saveProfile()}>Save Changes</div>) :
						(<div className='btn_edit' onClick={() => setIsEditing(true)}>
							<BsPencil />Edit Profile</div>)
				}
				<div className="btn_delete">
					<BsTrash />Delete Account
				</div>
			</div>

		</div>
	)
}

export default ProfileViewAndEdit