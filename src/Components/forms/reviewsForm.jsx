import React from 'react';
import { PropTypes } from 'prop-types';
import InputField from '../inputs/InputField';
import TextArea from '../inputs/textArea';
import Button from '../inputs/Button';
import StarRatingInput from '../inputs/StarRatingInput';

const ReviewForm = ({
	handleChange,
	handleSubmit,
	loading,
	errors,
	title,
	review,
	rating,
}) => {
	return (
		<div>
			<div className="modal fade newReviewModal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="card  w-100">
							<div className="card-header">
								<button type="button" id="revieWModal" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h5>Add Review</h5>
							</div>
							<div className="card-body">
								<form className="form" onSubmit={handleSubmit}>
									<div className="row">
										<div className="col-md-8 col-sm-12">
											<InputField
												type="text"
												name="title"
												label="title"
												onChange={handleChange}
												placeholder=""
												value={title}
												error={errors.title}
											/>
											<label>Rating</label>
											<StarRatingInput
												value={rating}
												onChange={(n) => handleChange({ target: { name: 'rating', value: n } })}
											/>
											{errors.rating && <div className="text-danger">{errors.rating}</div>}
											<TextArea
												name="review"
												label="Description"
												onChange={handleChange}
												rows="10"
												value={review}
												error={errors.review}
											/>
										</div>
									</div>
									<br />
									<Button
										type="submit"
										className="btn btn-primary"
										disabled={loading ? 'disabled' : null}
										text={loading ? 'saving....' : 'Save changes'}
									/>
									<button type="button" className="btn btn-secondary float-sm-right" data-dismiss="modal">Close</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
ReviewForm.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	title: PropTypes.string,
	review: PropTypes.string,
	rating: PropTypes.number,
	loading: PropTypes.bool,
	errors: PropTypes.array,
};
ReviewForm.defaultProps = {
	title: '',
	review: '',
	rating: 0,
	loading: false,
	errors: [],
};
export default ReviewForm;
