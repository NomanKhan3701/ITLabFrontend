import React from 'react'
import './ProfileWritingCard.scss';
import LimitChar from '../../LimitChar/LimitChar';

const ProfileWritingCard = () => {
	return (
		<div className='Profile_writing_card'>
			<div className="shayari">
				<LimitChar word={'Tis hard to say, if greater want of skill Appear in writing or in judging ill Tis hard to say, if greater want of skill Appear in writing or in judging ill Tis hard to say, if greater want of skill Appear in writing or in judging ill Tis hard to say, if greater want of skill Appear in writing or in judging ill Tis hard to say, if greater want of skill Appear in writing or in judging ill Tis hard to say, if greater want of skill Appear in writing or in judging ill'} limit={200} fitContent={true} hover={false} />
			</div>
		</div>
	)
}

export default ProfileWritingCard