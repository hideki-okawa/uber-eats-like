import React, { Fragment, useReducer, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

// apis
import { fetchRestaurants } from "../apis/restaurants";

import {
	initialState,
	restaurantsActionTypes,
	restaurantsReducer,
} from "../reducers/restaurants";

import { REQUEST_STATE } from "../constants";

// images
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";
import RestaurantImage from "../images/restaurant-image.jpg";

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

const RestaurantsContentsList = styled.div`
	display: flex;
	justify-content: space-around;
	margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
	width: 450px;
	height: 300px;
	padding: 48px;
`;

const RestaurantsImageNode = styled.img`
	width: 100%;
`;

const MainText = styled.p`
	color: black;
	font-size: 18px;
`;

const SubText = styled.p`
	color: black;
	font-size: 12px;
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
			<RestaurantsContentsList>
				{/* データが届いていない場合はskeletonを使用してタイルをロード中にする */}
				{state.fetchState === REQUEST_STATE.LOADING ? (
					<Fragment>
						<Skeleton variant="rect" width={450} height={300} />
						<Skeleton variant="rect" width={450} height={300} />
						<Skeleton variant="rect" width={450} height={300} />
					</Fragment>
				) : (
					state.restaurantsList.map((item, index) => (
						<Link
							to={`/restaurants/${item.id}/foods`}
							key={index}
							style={{ textDecoration: "none" }}
						>
							<RestaurantsContentWrapper>
								<RestaurantsImageNode src={RestaurantImage} />
								<MainText>{item.name}</MainText>
								<SubText>{`配送料：${item.fee}円 ${item.time_required}分`}</SubText>
							</RestaurantsContentWrapper>
						</Link>
					))
				)}
			</RestaurantsContentsList>
		</Fragment>
	);
};
