import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Signup.scss'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as actions from '../../store/actions/index';

const SERVER_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
	const dispatch = useDispatch();
	const [signupData, setSignupData] = useState({
		email: "",
		userName: "",
		password: "",
		image: null,
	});
	const fileRef = useRef();
	const dragRef = useRef(null);
	const [prevImg, setPrevImg] = useState();
	const [files, setFiles] = useState([]);

	useEffect(() => {
		setSignupData({ ...signupData, image: prevImg });
	}, [prevImg]);

	const Signup = async () => {
		if (signupData.email === "" || signupData.userName === "" || signupData.password === "" || signupData.image === null) {
			toast.warn("Please fill all the fields");
			return;
		} else {
			dispatch(actions.signup({
				email: signupData.email,
				password: signupData.password,
				userName: signupData.userName,
				image: signupData.image,
			}));
		}
	}

	const signupInputHandler = (event) => {
		const { name, value } = event.target;
		setSignupData((prevData) => {
			return { ...prevData, [name]: value };
		});
	}

	const handleFileBtnClick = () => {
		fileRef.current.click();
	};

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
			setFiles((prevFiles) => {
				return [...prevFiles, uploadedFiles[i]];
			});
		}
		await process(uploadedFiles[0]);
		dragRef.current.classList.remove("uploading");
	};


	return (
		<div className='Signup container padding_top_nav'>
			{/* 
			<div className="signup_image">
				<img src="/public/assets/images/signup.svg" alt="" />
			</div> */}
			<div className="signup_container">
				{/* <div className="stamp"></div> */}

				<h1>Welcome back to Artex</h1>
				<div className="sub_util">
					Already have an account? <Link to='/login'><span>Login</span></Link>
				</div>
				<div className="form_container">
					<div className="input_container">
						<label htmlFor="email">Email</label>
						<input type="text" name='email' onChange={signupInputHandler} value={signupData.email} />
					</div>
					<div className="input_container">
						<label htmlFor="email">Username</label>
						<input type="text" name='userName' onChange={signupInputHandler} value={signupData.username} />
					</div>
					<div className="input_container">
						<label htmlFor="password">Password</label>
						<input type="password" name='password' onChange={signupInputHandler} value={signupData.password} />
					</div>
					{/* <div className="subscribe">
								<input type="checkbox" name="subscribe" id="subscribe" />
								<label htmlFor="subscribe">I want to receive emails about the product, featue updates, events, and marketing promotions</label>
							</div> */}
					<div className="file-upload">
						{files.length === 0 ? (
							<div className="upload-img">
								<div
									ref={dragRef}
									className="drop-area"
									onDragOver={(e) => handleDrag(e, "dragOver")}
									onDragLeave={(e) => handleDrag(e, "dragLeave")}
									onDrop={handleDrop}
								>
									<h2>Drag & Drop your profile photo here</h2>
									<span>OR</span>
									<div className="browse-btn" onClick={handleFileBtnClick}>
										Browse Files
									</div>
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
						) : (
							<div className="image-preview">
								<img id="prev-img" src={prevImg} alt="" />
							</div>
						)}
					</div>
				</div>
				<div className="signup_btn" onClick={Signup}>Create Account</div>
			</div>
		</div>
	)
}

export default Signup