import axios from 'axios';
import {
	VIEW_BUSINESSES_PROFILE_SUCCESS,
	LOAD_BUSINESSES_REVIEWS_SUCCESS,
	LOAD_BUSINESS_PROFILE,
	LOAD_BUSINESS_PROFILE_ERROR,
	REVIEW_INPUT_CHANGE,
	RESPONSE_INPUT_CHANGE,      // NEW
	RESPONSE_SUCCESS,            // NEW
	RESPONSE_FAILURE,            // NEW
} from './actiontypes';
import { notify } from '../utils/notify';
import { baseURL } from '../utils/Config';
import Authservice from '../Components/Auth/AuthService';

const Auth = new Authservice();
/**
 *
	* this action is to set change in store values
	* if you want to change anything in the store, then
	* dispatch this action with prop as the state to change
	* and the value as the new value
 * @param {*} prop - the field to update in store
 * @param {*} value - the value of the field
 */
export function inputChange({ prop, value }) {
	return {
		type: REVIEW_INPUT_CHANGE,
		payload: { prop, value },
	};
}
/**
 *
 * dispatch this action after a successful business fetch.
 * accepts parameter business, the business passed will then be passed to the reducer
 * @param {*} business - single business details.
 */
export function viewUserBusinessSuccess(business) {
	return {
		type: VIEW_BUSINESSES_PROFILE_SUCCESS,
		business,
	};
}
/**
 *this methods receives any error that occurs when fetching a business
 * @param {*} error - error received from the back end
 */
export function viewBusinessError(error) {
	return {
		type: LOAD_BUSINESS_PROFILE_ERROR,
		error,
	};
}
/**
 * method receives all business reviews
 * @param {*} reviews - all business reviews
 */
export function loadBusinessReviewsSuccess(reviews) {
	return {
		type: LOAD_BUSINESSES_REVIEWS_SUCCESS,
		reviews,
	};
}

/**
 * fetch all business reviews then
 * dispatch business success action on success or error on fail
 * @param {*} id - id of business to load
 */
export function loadBusinessReviews(id) {
	return function disp(dispatch) {
		const url = `businesses/${id}/reviews`;
		dispatch({
			type: LOAD_BUSINESS_PROFILE,
		});
		axios({
			method: 'get',
			url,
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				//  on success dispatch success action
				dispatch(loadBusinessReviewsSuccess(response.data));
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				// load the errors on error.
				dispatch(viewBusinessError(error.response.data));
			}
		});
	};
}

/**
 *
 * @param {*} id - id of business to view
 */
export function viewUserBusiness(id) {
	return function disp(dispatch) {
		dispatch({
			type: LOAD_BUSINESS_PROFILE,
		});
		const url = `businesses/${id}`;
		axios({
			method: 'get',
			url,
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(viewUserBusinessSuccess(response.data));
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch(viewBusinessError(error));
			}
		});
	};
}
/**
 * function to add a new review to a business.
 * @param {*} review - the review body
 * @param {*} title  - Review title
 * @param {*} id - id of business to review.
 */
export function addReview({
	review, title, rating, id,
}) {
	return function disp(dispatch) {
		const url = `businesses/${id}/reviews`;
		axios({
			method: 'post',
			url,
			data: {
				review,
				title,
				rating,
			},
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken(),
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(loadBusinessReviews(id));
				notify('success', 'Success', 'Review added successfully');
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				notify('error', 'Error', error.response.data.Error);
			}
		});
	};
}
/**
 * this action updates response form fields (e.g. the reply text box)
 * @param {*} prop - the field to update in store
 * @param {*} value - the value of the field
 */
export function responseInputChange({ prop, value }) {
	return {
		type: RESPONSE_INPUT_CHANGE,
		payload: { prop, value },
	};
}

/**
 * dispatched when a response action succeeds (create or update)
 * @param {*} response - the response details returned from the backend
 */
export function responseSuccess(response) {
	return {
		type: RESPONSE_SUCCESS,
		response,
	};
}

/**
 * dispatched when a response action fails
 * @param {*} errors - errors from the back end
 */
export function responseFailure(errors) {
	return {
		type: RESPONSE_FAILURE,
		errors,
	};
}

/**
 * business owner replies to a review
 * @param {*} body - the response text
 * @param {*} reviewId - the review being responded to
 * @param {*} businessId - the business, so we can reload reviews after
 */
export function addResponse({ body, reviewId, businessId }) {
	return function disp(dispatch) {
		const url = `businesses/reviews/${reviewId}/response`;
		axios({
			method: 'post',
			url,
			data: { body },
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken(),
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(responseSuccess(response.data));
				dispatch(loadBusinessReviews(businessId));
				notify('success', 'Success', 'Response posted');
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch(responseFailure(error.response.data.Errors || error.response.data.Error));
				notify('error', 'Error', 'Could not post response');
			}
		});
	};
}

/**
 * business owner edits their existing response
 * @param {*} body - the updated response text
 * @param {*} reviewId - the review whose response is being edited
 * @param {*} businessId - the business, so we can reload reviews after
 */
export function updateResponse({ body, reviewId, businessId }) {
	return function disp(dispatch) {
		const url = `businesses/reviews/${reviewId}/response`;
		axios({
			method: 'put',
			url,
			data: { body },
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken(),
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(responseSuccess(response.data));
				dispatch(loadBusinessReviews(businessId));
				notify('success', 'Success', 'Response updated');
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				dispatch(responseFailure(error.response.data.Errors || error.response.data.Error));
				notify('error', 'Error', 'Could not update response');
			}
		});
	};
}

/**
 * business owner deletes their response
 * @param {*} reviewId - the review whose response is being deleted
 * @param {*} businessId - the business, so we can reload reviews after
 */
export function deleteResponse({ reviewId, businessId }) {
	return function disp(dispatch) {
		const url = `businesses/reviews/${reviewId}/response`;
		axios({
			method: 'delete',
			url,
			baseURL,
			responseType: 'json',
			headers: {
				'Content-Type': 'application/json',
				'access-token': Auth.getToken(),
			},
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				dispatch(loadBusinessReviews(businessId));
				notify('success', 'Success', 'Response deleted');
			}
		}).catch((error) => {
			if (error.response !== undefined) {
				notify('error', 'Error', 'Could not delete response');
			}
		});
	};
}