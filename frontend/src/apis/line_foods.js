import axios from "axios";
import { lineFoods, lineFoodsReplace } from "../urls/index";

// 仮注文の送信
export const postLineFoods = (params) => {
	return axios
		.post(lineFoods, {
			food_id: params.foodId,
			count: params.count,
		})
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			throw e;
		});
};

export const replaceLineFoods = (params) => {
	return axios
		.put(lineFoodsReplace, {
			food_id: params.foodId,
			count: params.count,
		})
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			throw e;
		});
};

// 仮注文の一覧を取得
export const fetchLineFoods = () => {
	return axios
		.get(lineFoods)
		.then((resp) => {
			return resp.data;
		})
		.catch((e) => {
			throw e;
		});
};
