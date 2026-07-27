import React from 'react';
import { PropTypes } from 'prop-types';
import TextArea from '../inputs/textArea';
import Button from '../inputs/Button';

/**
 * form for a business owner to reply to a review
 * @param {*} handleChange - handles change in the response text
 * @param {*} handleSubmit - handles form submit
 * @param {*} handleCancel - closes the form without saving
 * @param {*} body - current response text
 * @param {*} loading - checks if the save is in progress
 * @param {*} errors - contains all the errors
 */
const ResponseForm = ({
	handleChange, handleSubmit, handleCancel, body, loading, errors,
}) => {
	return (
		<form className="form response-form" onSubmit={handleSubmit}>
			<TextArea
				name="responseBody"
				label="Response"
				onChange={handleChange}
				rows="3"
				value={body}
				error={errors.body}
			/>
			<Button
				type="submit"
				className="btn btn-primary btn-sm"
				disabled={loading ? 'disabled' : null}
				text={loading ? 'saving....' : 'Save'}
			/>
			<button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">Cancel</button>
		</form>
	);
};

ResponseForm.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	body: PropTypes.string,
	loading: PropTypes.bool,
	errors: PropTypes.object,
};
ResponseForm.defaultProps = {
	body: '',
	loading: false,
	errors: {},
};

export default ResponseForm;