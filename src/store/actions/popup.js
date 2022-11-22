import * as actionTypes from '../constants/actionTypes';

export const setShayariPopupOpen = (data) => {
	return {
		type: actionTypes.SHAYARI_POPUP_OPEN,
		data: data,
	};
}
