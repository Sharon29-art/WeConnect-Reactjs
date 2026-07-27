import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import Search from '../forms/SearchForm';
import NavBar from '../common/NavBar';
import BusinessList from '../businessComponents/businessList';
import * as loginActions from '../../actions/loginActions';
import * as bizActions from '../../actions/businessActions';
import * as BusinessProfileActions from '../../actions/businessProfileAction';



export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			category: '',
		    location: '',
		};
		this.onPaginate = this.onPaginate.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);   // NEW
		this.onView = this.onView.bind(this);

	}


 	componentDidMount() {
		// loads the distinct categories/locations for the filter dropdowns
		this.props.bizActions.loadBusinessFilters();
	}

	onPaginate(e) {
		// this methods dispaches businesses with the pagination set
		// the methods sets the pagination page
		this.props.bizActions.loadBusinesses(e.currentTarget.dataset.id, this.state.search, this.state.category, this.state.location,

		);
	}

	onSearch(e) {
		// this methods allows the serch functionality on businesses,
		// it loads all businesses that match the search creteria
		e.preventDefault();
		this.props.bizActions.loadBusinesses(1, this.state.search, this.state.category, this.state.location,

		);
	}

	onChange(e) {
		// sets the input value. this also allows typing in the input
		this.setState({
			search: e.target.value,
		});
	}

	// NEW - updates category/location filter state and re-searches immediately
	onFilterChange(e) {
	this.setState({ [e.target.name]: e.target.value }, () => {
		this.props.bizActions.loadBusinesses(1, this.state.search, this.state.category, this.state.location);
	});
	}

	onView(e) {
		// loads a single buiness for viewing
		e.preventDefault();
		this.props.history.push(`/business/profile/${e.currentTarget.dataset.id}`);
		this.props.profileAction.loadBusinessReviews(e.currentTarget.dataset.id);
	}

	render() {
		const Loading = (
			<div className="container bsprofile">
				<h3 className="text-center text-success">Registered businesses</h3>
				<br />
				<div className="row">
					<div className="loading">
						<img src="/img/spinner.gif" alt="loading" />
						<i>loading ...</i>
					</div>
				</div>
			</div>
		);
		const props = this.props;
		return (
			<div>
				<div className="jumbotron jumbotron-home">
					<NavBar
						history={props.history}
						loggedIn={props.isLoggedIn}
						user={props.currentUser}
						location={props.location}
						actions={props.actions}
					/>
					<Search
						onSearch={this.onSearch}
						onChange={this.onChange}
						value={this.state.search}
					/>
				    <div className="filter-bar row justify-content-center mt-3">
						<div className="col-sm-4">
							<select
							type="text"
							name="category"
							className="form-control"
							placeholder="filter by category"
							value={this.state.category}
							onChange={this.onFilterChange}
						    >
								<option value="">All categories</option>
								{props.businesses.categories && props.businesses.categories.map((c, i) => (
									<option value={c} key={i}>{c}</option>
								))}
							</select>
						</div>
						<div className="col-sm-6">
							<select
							 type="text"
							 name="location"
							 className="form-control"
							 placeholder="filter by location"
							 value={this.state.location}
							 onChange={this.onFilterChange}
							>
								<option value="">All locations</option>
								{props.businesses.locations && props.businesses.locations.map((l, i) => (
									<option value={l} key={i}>{l}</option>
								))}
							</select>
						</div>
					</div>
				</div>

				<a href="/map" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary mt-2">
					Map view
				</a>

				{ props.businesses.loading ? Loading

					: (
						<BusinessList
							businesses={props.businesses}
							onView={this.onView}
							onPaginate={this.onPaginate}
						/>
					  )
				}

			</div>
		);
	}
}
Home.propType = {
	currentUser: PropTypes.object.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired,
	profileAction: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		businesses: state.businesses,
		isLoggedIn: state.userLogin.isLoggedIn,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(loginActions, dispatch),
		bizActions: bindActionCreators(bizActions, dispatch),
		profileAction: bindActionCreators(BusinessProfileActions, dispatch),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
