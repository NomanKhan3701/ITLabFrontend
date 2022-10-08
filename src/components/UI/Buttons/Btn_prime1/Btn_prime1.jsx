import React from 'react'
import './Btn_prime1.scss'

const Btn_prime1 = ({ className, styles, children }, props) => {
	return (
		<div className={'Btn_prime1' + ` ${className ? className : ""}`} styles={{ ...styles }} {...props}>
			<svg>
				<rect x="0" y="0" fill="none" rx="100%" width="100%" height="100%" />
			</svg>
			<span>{children}</span>
		</div>
	)
}

export default Btn_prime1