import * as actionTypes from '../constants/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
	shayariPopupOpen: false,
	shayariData: null,
}

const shayariPopupOpen = (state, action) => {
	return updateObject(state, { shayariPopupOpen: action.data })
}

const popupReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SHAYARI_POPUP_OPEN:
			return shayariPopupOpen(state, action)
		default:
			return state
	}
}

export default popupReducer