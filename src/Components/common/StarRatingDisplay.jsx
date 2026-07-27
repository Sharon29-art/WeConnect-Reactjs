import React from 'react';

/**
 * read-only star display for showing average rating
 * @param {*} rating - average rating (number or null if no reviews)
 * @param {*} reviewCount - total number of reviews
 */
const StarRatingDisplay = ({ rating, reviewCount }) => {
	if (rating === null || rating === undefined) {
		return <span className="text-muted">No reviews yet</span>;
	}
	const stars = [1, 2, 3, 4, 5];
	return (
		<span className="star-rating-display">
			{stars.map((n) => (
				<i
					key={n}
					className={rating >= n ? 'fa fa-star text-warning' : 'fa fa-star-o text-warning'}
				/>
			))}
			<span className="text-muted"> {rating.toFixed(1)} ({reviewCount})</span>
		</span>
	);
};

export default StarRatingDisplay;