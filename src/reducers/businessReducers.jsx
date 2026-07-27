import {
	LOAD_BUSINESSES_SUCCESS,
	LOAD_BUSINESS,
	LOAD_BUSINESS_FILTERS_SUCCESS,
} from '../actions/actiontypes';
// the initial state to be set for in businesses store
const initial_state = {
	businesses: {},
	page: 0,
	per_page: 0,
	total_pages: 0,
	total_results: 0,
	loading: false,
	categories: [],
	locations: [],
};

export default function BusinessReducer(state = initial_state, action) {
	switch (action.type) {
	case LOAD_BUSINESSES_SUCCESS:
		return {
			...state,
			loading: false,
			businesses: action.businesses.businesses,
			page: action.businesses.page,
			per_page: action.businesses.per_page,
			total_pages: action.businesses.total_pages,
			total_results: action.businesses.total_results,
		};
	case LOAD_BUSINESS:
		return {
			...state,
			loading: true,
		};
	case LOAD_BUSINESS_FILTERS_SUCCESS:
		return {
			...state,
			categories: action.filters.categories,
			locations: action.filters.locations,
		};
	default:
		return state;
	}
}
