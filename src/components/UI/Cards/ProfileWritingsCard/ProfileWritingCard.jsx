import React from 'react'
import './ProfileWritingCard.scss';
import LimitChar from '../../LimitChar/LimitChar';

const ProfileWritingCard = ({ shayari }) => {
	return (
		<div className='Profile_writing_card'>
			<div className="shayari">
				<LimitChar word={shayari.content} limit={200} fitContent={true} hover={false} />
			</div>
		</div>
	)
}

export default ProfileWritingCard