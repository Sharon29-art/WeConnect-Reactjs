import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BusinessMap from '../businessComponents/BusinessMap';
import NavBar from '../common/NavBar';
import * as bizActions from '../../actions/businessActions';
import * as loginActions from '../../actions/loginActions';

class MapPage extends React.Component {
	componentDidMount() {
		this.props.bizActions.loadBusinesses();
	}

	render() {
		const props = this.props;
		return (
			<div>
				<NavBar
					history={props.history}
					loggedIn={props.isLoggedIn}
					user={props.currentUser}
					location={props.location}
					actions={props.actions}
				/>
                <div style={{ marginTop: '70px' }}>
				<BusinessMap businesses={props.businesses.businesses || []} />
                </div>
			</div>
		);
	}
}

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
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(MapPage);