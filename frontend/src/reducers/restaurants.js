import { REQUEST_STATE } from "../constants";

// 初期State
// 外部から参照されるためexportされている
export const initialState = {
	// GET APIの状態を示すState
	fetchState: REQUEST_STATE.INITIAL,
	// レストラン一覧を持つstate
	restaurantsList: [],
};

export const restaurantsActionTypes = {
	FETCHING: "FETCHING",
	FETCH_SUCCESS: "FETCH_SUCCESS",
};

export const restaurantsReducer = (state, action) => {
	switch (action.type) {
		// APIの取得中はLOADINGにスイッチする
		case restaurantsActionTypes.FETCHING:
			return {
				...state,
				fetchState: REQUEST_STATE.LOADING,
			};
		// APIの取得が完了したらOKにスイッチし、レストランリストにデータを入れる
		case restaurantsActionTypes.FETCH_SUCCESS:
			return {
				fetchState: REQUEST_STATE.OK,
				restaurantsList: action.payload.restaurants,
			};
		default:
			throw new Error();
	}
};
