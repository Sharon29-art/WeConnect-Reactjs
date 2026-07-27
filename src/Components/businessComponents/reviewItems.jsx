import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import StarRatingDisplay from '../common/StarRatingDisplay';
import ResponseForm from '../forms/ResponseForm';

/**
 * shows a single review, plus the owner's response (if any) and reply controls
 * @param {*} review - the review to display
 * @param {*} index - list index, used as a key
 * @param {*} isOwner - true if the logged-in user owns this business
 * @param {*} currentUserId - id of the logged-in user
 * @param {*} responseBody - current text in the reply textarea
 * @param {*} handleResponseChange - updates responseBody in Redux
 * @param {*} onAddResponse - submits a new response
 * @param {*} onUpdateResponse - submits an edited response
 * @param {*} onDeleteResponse - deletes the response
 */
const Reviewtem = ({
	review, index, isOwner, currentUserId, responseBody,
	handleResponseChange, onAddResponse, onUpdateResponse, onDeleteResponse,
	loading, errors,
}) => {
	const [replying, setReplying] = useState(false);
	const [editing, setEditing] = useState(false);

	const ownsResponse = review.response && review.response.user_id === currentUserId;

	const submitReply = (e) => {
		e.preventDefault();
		onAddResponse({ body: responseBody, reviewId: review.id });
		setReplying(false);
	};

	const submitEdit = (e) => {
		e.preventDefault();
		onUpdateResponse({ body: responseBody, reviewId: review.id });
		setEditing(false);
	};

	const deleteResponse = () => {
		if (window.confirm('Delete this response?')) {
			onDeleteResponse({ reviewId: review.id });
		}
	};

	return (
		<div className="container col-md-8 offset-md-2" key={index}>
			<hr />
			<div className="reviews">
				<h5>{review.title}</h5>
				<StarRatingDisplay rating={review.rating} reviewCount={null} />
				<p>{review.body}</p>

				{review.response && !editing && (
					<div className="owner-response ml-4 pl-3 border-left">
						<strong>Response from the owner</strong>
						<p>{review.response.body}</p>
						{ownsResponse && (
							<button>
								<button type="button" className="btn btn-link btn-sm" onClick={() => setEditing(true)}>Edit</button>
								<button type="button" className="btn btn-link btn-sm text-danger" onClick={deleteResponse}>Delete</button>
							</button>
						)}
					</div>
				)}

				{editing && (
					<ResponseForm
						handleChange={handleResponseChange}
						handleSubmit={submitEdit}
						handleCancel={() => setEditing(false)}
						body={responseBody}
						loading={loading}
						errors={errors}
					/>
				)}

				{!review.response && isOwner && !replying && (
					<button type="button" className="btn btn-link btn-sm" onClick={() => setReplying(true)}>Reply</button>
				)}

				{replying && (
					<ResponseForm
						handleChange={handleResponseChange}
						handleSubmit={submitReply}
						handleCancel={() => setReplying(false)}
						body={responseBody}
						loading={loading}
						errors={errors}
					/>
				)}
			</div>
		</div>
	);
};

Reviewtem.propTypes = {
	review: PropTypes.object.isRequired,
	index: PropTypes.number,
	isOwner: PropTypes.bool,
	currentUserId: PropTypes.number,
	responseBody: PropTypes.string,
	handleResponseChange: PropTypes.func,
	onAddResponse: PropTypes.func,
	onUpdateResponse: PropTypes.func,
	onDeleteResponse: PropTypes.func,
	loading: PropTypes.bool,
	errors: PropTypes.object,
};
Reviewtem.defaultProps = {
	isOwner: false,
	currentUserId: null,
	responseBody: '',
	errors: {},
};

export default Reviewtem;