import {
	VIEW_BUSINESSES_PROFILE_SUCCESS,
	LOAD_BUSINESSES_REVIEWS_SUCCESS,
	LOAD_BUSINESS_PROFILE,
	LOAD_BUSINESS_PROFILE_ERROR,
	REVIEW_INPUT_CHANGE,
	RESPONSE_INPUT_CHANGE,     // NEW
	RESPONSE_SUCCESS,          // NEW
	RESPONSE_FAILURE,          // NEW
} from '../actions/actiontypes';

const INITIAL_STATE = {
	name: '',
	id: '',
	location: '',
	category: '',
	description: '',
	reviews: {},
	logo: '',
	error: [],
	title: '',
	review: '',
	rating: 0,					// NEW
	avgRating: null,			// NEW 
	reviewCount: 0,				// NEW
	responseBody: '',          // NEW - text field for the response form
	trend: [],				  // NEW
	loading: false,
};
export default function NewBusinessReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case LOAD_BUSINESS_PROFILE:
		return {
			...state,
			loading: true,
		};
	case VIEW_BUSINESSES_PROFILE_SUCCESS:
		return {
			...state,
			name: action.business.name,
			location: action.business.location,
			category: action.business.category,
			description: action.business.description,
			logo: action.business.logo,
			id: action.business.id,
		};
	case LOAD_BUSINESSES_REVIEWS_SUCCESS:
		return {
			...state,
			loading: false,
			reviews: action.reviews,
			avgRating: action.reviews.avg_rating,
			reviewCount: action.reviews.review_count,
			ratingDistribution: action.reviews.rating_distribution,
			trend: action.reviews.trend,
		};
	case LOAD_BUSINESS_PROFILE_ERROR:
		return {
			...state,
			loading: false,
			error: action.error,
		};
	case REVIEW_INPUT_CHANGE:
		return {
			...state,
			[action.payload.prop]: action.payload.value,
		};
		case RESPONSE_INPUT_CHANGE:                          // NEW
		return { ...state, [action.payload.prop]: action.payload.value,
		};
	case RESPONSE_SUCCESS:                                // NEW
		return { ...state, responseBody: '',
		};  // clear the form on success
	case RESPONSE_FAILURE:                                // NEW
		return { ...state, error: action.errors,
		};
	default:
		return state;
	}
}
