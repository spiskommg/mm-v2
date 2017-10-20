import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/data';

class MemberProgram extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
        data: PropTypes.object,
        actions: PropTypes.shape({
            dataFetchData: PropTypes.func.isRequired
        }).isRequired,
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        statusText: '',
        userName: '',
        data: '',
    };

    // goToUrl = (slug) => {
    //   this.props.dispatch(push('/' + slug));
    // }

    componentWillMount() {
        const slug = this.props.location.pathname;
        this.props.actions.dataFetchData(slug);
    }

    renderContent(data) {
      if(data) {
        return this.props.data.results.map((item, i) => {
          console.log(item);
          return (
            <div key={i}>
              <a>
                {item.title}
              </a>
            </div>);
        });
      }
    };

    render() {
        return (
            <div className="container">
                  member program main route
                  <ul>
                  {this.renderContent(this.props.data)}
                  </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText,
        data: state.data.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberProgram);
export { MemberProgram as MemberProgramViewNotConnected };
