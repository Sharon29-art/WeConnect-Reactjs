import React from 'react';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

/**
 * shows a line chart of a business's average rating and review count over time
 * @param {*} trend - array of { month, count, avg_rating }
 */
const RatingTrendChart = ({ trend }) => {
	if (!trend || trend.length === 0) {
		return <p className="text-muted">Not enough review history yet to show a trend.</p>;
	}
	return (
		<ResponsiveContainer width="100%" height={250}>
			<LineChart data={trend}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="month" />
				<YAxis yAxisId="left" domain={[0, 5]} allowDecimals />
				<YAxis yAxisId="right" orientation="right" allowDecimals={false} />
				<Tooltip />
				<Line yAxisId="left" type="monotone" dataKey="avg_rating" stroke="#f5a623" name="Avg rating" />
				<Line yAxisId="right" type="monotone" dataKey="count" stroke="#4a90d9" name="Review count" />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default RatingTrendChart;