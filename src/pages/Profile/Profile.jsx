import React from 'react'
import { useState, useRef, useEffect } from 'react';
import './Profile.scss';
import UserActivities from '../../components/UserActivities/UserActivities';
import ProfileViewAndEdit from '../../components/ProfileViewAndEdit/ProfileViewAndEdit';

const Profile = () => {

	return (
		<div className='Profile container padding_top_nav'>
			<ProfileViewAndEdit />
			<div className='user_activities'>
				<UserActivities />
			</div>
		</div>
	)
}

export default Profile