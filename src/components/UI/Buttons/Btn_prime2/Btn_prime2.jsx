import React from 'react'
import './Btn_prime2.scss'

const Btn_prime2 = ({ className, styles, children }, props) => {
	return (
		<div className={'Btn_prime2' + ` ${className ? className : ""}`} styles={{ ...styles }} {...props}>
			<svg>
				<rect x="0" y="0" fill="none" rx="100%" width="100%" height="100%" />
			</svg>
			{children}
		</div>
	)
}

export default Btn_prime2