import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import NavBar from '../common/NavBar';
import RatingTrendChart from '../businessComponents/RatingTrendChart';
import Item from '../businessComponents/reviewItems';
import * as BusinessProfileActions from '../../actions/businessProfileAction';

class AnalyticsDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.handleResponseChange = this.handleResponseChange.bind(this);
		this.Back = this.Back.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.actions.viewUserBusiness(id);
		this.props.actions.loadBusinessReviews(id);
	}

	Back() {
		this.props.history.goBack();
	}

	handleResponseChange(e) {
		this.props.actions.responseInputChange({
			prop: e.target.name, value: e.target.value,
		});
	}

	render() {
		const props = this.props;
		const business = props.businessProfile;
		const isOwner = props.userLogin.isLoggedIn
			&& props.currentUser
			&& business.id
			&& props.currentUser.id === business.user_id;

		if (business.loading) {
			return (
				<div>
					<NavBar
						history={props.history}
						loggedIn={props.userLogin.isLoggedIn}
						user={props.currentUser}
						location={props.location}
						actions={props.actions}
					/>
					<div className="container bsprofile">
						<br />
						<div className="row">
							<div className="loading">
								<img src="/img/spinner.gif" alt="loading" />
								<i>loading ...</i>
							</div>
						</div>
					</div>
				</div>
			);
		}

		if (!isOwner) {
			return (
				<div>
					<NavBar
						history={props.history}
						loggedIn={props.userLogin.isLoggedIn}
						user={props.currentUser}
						location={props.location}
						actions={props.actions}
					/>
					<div className="container">
						<div className="alert alert-danger text-center mt-4">
							You can only view the dashboard for a business you own.
						</div>
					</div>
				</div>
			);
		}

		const recentReviews = (business.reviews && business.reviews.reviews)
			? business.reviews.reviews.slice(0, 5)
			: [];

		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.userLogin.isLoggedIn}
					user={props.currentUser}
					location={props.location}
					actions={props.actions}
				/>
				<div className="container mt-4">
					
						onClick={this.Back}
						onKeyDown={() => {}}
						role="button"
						tabIndex={0}
						className="btn btn-default mb-3"
					<a>
						<i className="fa fa-arrow-left" />
						{' Back'}
					</a>

					<h3>{business.name}</h3>
					<h5 className="text-muted mb-4">Business performance</h5>

					<div className="row text-center mb-4">
						<div className="col-4">
							<h3>{business.reviewCount || 0}</h3>
							<small className="text-muted">Total reviews</small>
						</div>
						<div className="col-4">
							<h3>{business.avgRating != null ? business.avgRating.toFixed(1) : '—'}</h3>
							<small className="text-muted">Average rating</small>
						</div>
						<div className="col-4">
							<h3>{business.trend ? business.trend.length : 0}</h3>
							<small className="text-muted">Months active</small>
						</div>
					</div>

					<RatingTrendChart trend={business.trend} />

					<h5 className="mt-5 mb-3">Recent reviews</h5>

					{recentReviews.length === 0 && (
						<p className="text-muted">No reviews yet.</p>
					)}

					{recentReviews.length > 0 && recentReviews.map((review, i) => (
						<Item
							review={review}
							key={i}
							index={i}
							isOwner={isOwner}
							currentUserId={props.currentUser ? props.currentUser.id : null}
							responseBody={business.responseBody}
							handleResponseChange={this.handleResponseChange}
							onAddResponse={({ body, reviewId }) => props.actions.addResponse({ body, reviewId, businessId: business.id })}
							onUpdateResponse={({ body, reviewId }) => props.actions.updateResponse({ body, reviewId, businessId: business.id })}
							onDeleteResponse={({ reviewId }) => props.actions.deleteResponse({ reviewId, businessId: business.id })}
							loading={business.loading}
							errors={business.error}
						/>
					))}
				</div>
			</div>
		);
	}
}

AnalyticsDashboard.propTypes = {
	currentUser: PropTypes.object,
	userLogin: PropTypes.object,
	actions: PropTypes.object,
};

function mapStateToProps(state) {
	const { currentUser, businessProfile, userLogin } = state;
	return { currentUser, businessProfile, userLogin };
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(BusinessProfileActions, dispatch),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboard);