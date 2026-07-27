import React from 'react';

/**
 * clickable 1-5 star input for submitting a review
 * @param {*} value - currently selected rating
 * @param {*} onChange - function called with the new rating when a star is clicked
 */
const StarRatingInput = ({ value, onChange }) => {
	const stars = [1, 2, 3, 4, 5];
	return (
		<div className="star-rating-input">
			{stars.map((n) => (
				<i
					key={n}
					className={value >= n ? 'fa fa-star text-warning' : 'fa fa-star-o text-warning'}
					style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '4px' }}
					onClick={() => onChange(n)}
				/>
			))}
		</div>
	);
};

export default StarRatingInput;