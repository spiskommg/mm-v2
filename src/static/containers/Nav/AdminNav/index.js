import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { authLogoutAndRedirect } from '../../../actions/auth';
import '../../../styles/main.scss';

class AdminNav extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    };

    static defaultProps = {
        location: undefined
    };

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    goToIndex = () => {
        this.props.dispatch(push('/'));
    };

    goToAdmin = () => {
        this.props.dispatch(push('/admin'));
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
            <div className="adminNav">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#top-navbar"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a className="navbar-brand" onClick={this.goToAdmin}>
                              Admin
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="top-navbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li className={homeClass}>
                                    <a className="js-go-to-index-button" onClick={this.goToIndex}>
                                        <i className="fa fa-home" /> Home
                                    </a>
                                </li>
                                <li className={protectedClass}>
                                    <a className="js-go-to-protected-button" onClick={this.goToProtected}>
                                        <i className="fa fa-lock" /> Protected
                                    </a>
                                </li>
                                <li>
                                    <a className="js-logout-button" onClick={this.logout}>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        location: state.routing.location
    };
};

export default connect(mapStateToProps)(AdminNav);
export { AdminNav as AdminNavNotConnected };
