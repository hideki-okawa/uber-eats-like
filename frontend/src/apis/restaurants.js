import axios from "axios";
import { restaurantsIndex } from "../urls/index";

export const fetchRestaurants = () => {
	return axios
		.get(restaurantsIndex)
		.then((resp) => {
			return resp.data;
		})
		.catch((e) => console.error(e));
};
