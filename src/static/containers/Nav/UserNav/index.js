import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import { authLogoutAndRedirect } from '../../../actions/auth';
import '../../../styles/main.scss';
import backgroundImage from './images/purple_tile_bg.gif';

class UserNav extends React.Component {
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
          <CSSTransitionGroup
             transitionName="slide-down"
             transitionAppear={true}
             transitionAppearTimeout={300}
             transitionEnterTimeout={300}
             transitionLeaveTimeout={400}
           >
            <div className="userNav">
                <nav className="navbar navbar-default" style={ userNavStyle }>
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
                            <a className="navbar-brand" onClick={this.goToIndex}>
                                MomsMeet
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="top-navbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li className={homeClass}>
                                    <a className="js-go-to-index-button" onClick={this.goToIndex}>
                                        <i className="fa fa-home" />

                                    </a>
                                </li>
                                <li className={protectedClass}>
                                    <a className="js-go-to-protected-button" onClick={this.goToIndex}>
                                        <i className="fa fa-trophy" />

                                    </a>
                                </li>
                                <li className={protectedClass}>
                                    <a className="js-go-to-protected-button" onClick={this.goToProtected}>
                                        <i className="fa fa-cubes" />

                                    </a>
                                </li>
                                <li className={protectedClass}>
                                    <a className="js-go-to-protected-button" onClick={this.goToProtected}>
                                        <i className="fa fa-bell" />

                                    </a>
                                </li>
                                <li className={protectedClass}>
                                    <a className="js-go-to-protected-button" onClick={this.goToProtected}>
                                        <i className="fa fa-user" />

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
            </CSSTransitionGroup>
        );
    }
}

const userNavStyle = {
  backgroundImage: `url(${backgroundImage})`,
  border: 'none',
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        location: state.routing.location
    };
};

export default connect(mapStateToProps)(UserNav);
export { UserNav as UserNavNotConnected };
