import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import { authLogoutAndRedirect } from '../../actions/auth';
import '../../styles/main.scss';
import AdminNav from './AdminNav/index';
import UserNav from './UserNav/index';
import GuestNav from './GuestNav/index';

class Nav extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        isStaff: PropTypes.bool.isRequired,
        isSuperUser: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    };

    static defaultProps = {
        location: undefined
    };

    renderFrontendNav = () => {
      if(this.props.location) {
        return this.props.location.pathname.includes('admin') ?
            <div className="container-fluid"> &nbsp;</div>
        :
          <UserNav />
      }
    }

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    goToIndex = () => {
        this.props.dispatch(push('/'));
    };

    goToLogin = () => {
        this.props.dispatch(push('/login'));
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    render() {
        const homeClass = classNames({
            active: this.props.location && this.props.location.pathname === '/'
        });
        const protectedClass = classNames({
            active: this.props.location && this.props.location.pathname === '/protected'
        });
        const loginClass = classNames({
            active: this.props.location && this.props.location.pathname === '/login'
        });

        return (
            <div className="main-nav">
              {
                this.props.isAuthenticated ?
                  this.props.isSuperUser ?
                    <div>
                      <AdminNav />
                      {this.renderFrontendNav()}
                    </div>
                    :
                    <UserNav />
                :
                <GuestNav />
              }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isStaff: state.auth.isStaff,
        isSuperUser: state.auth.isSuperUser,
        location: state.routing.location
    };
};

export default connect(mapStateToProps)(Nav);
export { Nav as NavNotConnected };
