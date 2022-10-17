import { REQUEST_STATE } from "../constants";

// 初期State
export const initialState = {
	// GET APIの状態を示すState
	fetchState: REQUEST_STATE.INITIAL,
	// POST APIの状態を示すState
	postState: REQUEST_STATE.INITIAL,
	// 仮注文のリスト
	lineFoosSummary: null,
};

export const lineFoodsActionTypes = {
	FETCHING: "FETCHING",
	FETCH_SUCCESS: "FETCH_SUCCESS",
	POSTING: "POSTING",
	POST_SUCCESS: "POST_SUCCESS",
};

export const lineFoodsReducer = (state, action) => {
	switch (action.type) {
		case lineFoodsActionTypes.FETCHING:
			return {
				...state,
				fetchState: REQUEST_STATE.LOADING,
			};
		case lineFoodsActionTypes.FETCH_SUCCESS:
			return {
				fetchState: REQUEST_STATE.OK,
				lineFoodsSummary: action.payload.lineFoodsSummary,
			};
		case lineFoodsActionTypes.POSTING:
			return {
				...state,
				postState: REQUEST_STATE.LOADING,
			};
		case lineFoodsActionTypes.POST_SUCCESS:
			return {
				...state,
				postState: REQUEST_STATE.OK,
			};
		default:
			throw new Error();
	}
};
