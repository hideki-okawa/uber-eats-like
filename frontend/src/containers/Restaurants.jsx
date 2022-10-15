import React, { Fragment, useReducer, useEffect } from "react";
import styled from "styled-components";

// apis
import { fetchRestaurants } from "../apis/restaurants";

import {
	initialState,
	restaurantsActionTypes,
	restaurantsReducer,
} from "../reducers/restaurants";

// images
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	padding: 8px 32px;
`;

const MainLogoImage = styled.img`
	height: 90px;
`;

const MainCoverImageWrapper = styled.div`
	text-align: center;
`;

const MainCover = styled.img`
	height: 600px;
`;

export const Restaurants = () => {
	// stateの初期化
	const [state, dispatch] = useReducer(restaurantsReducer, initialState);

	useEffect(() => {
		// APIの取得中なのでLOADINGにスイッチする
		dispatch({ type: restaurantsActionTypes.FETCHING });
		// レストラン一覧を取得
		fetchRestaurants().then((data) => {
			// レストラン一覧の取得に成功したら
			// OKにスイッチし、レストランリストにデータを入れる
			dispatch({
				type: restaurantsActionTypes.FETCH_SUCCESS,
				payload: { restaurants: data.restaurants },
			});
		});
	}, []);

	return (
		<Fragment>
			<HeaderWrapper>
				<MainLogoImage src={MainLogo} alt="main logo" />
			</HeaderWrapper>
			<MainCoverImageWrapper>
				<MainCover src={MainCoverImage} alt="main cover" />
			</MainCoverImageWrapper>
			{state.restaurantsList.map((restaurant) => (
				<div>{restaurant.name}</div>
			))}
		</Fragment>
	);
};
// --- ここまで追加 ---
