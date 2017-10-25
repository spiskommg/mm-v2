import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/data';
import MemberProgramList from '../../components/MemberProgramList/index';
import TitleHeader from '../../components/TitleHeader';

import headerBG from './images/sample_a_product.jpg';

class MemberProgram extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
        queryData: PropTypes.object,
        actions: PropTypes.shape({
            dataFetchData: PropTypes.func.isRequired
        }).isRequired,
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        statusText: '',
        userName: '',
        queryData: {},
    };

    // goToUrl = (slug) => {
    //   this.props.dispatch(push('/' + slug));
    // }

    componentWillMount() {
        const query = '/type/member-program';
        this.props.actions.dataFetchQueryData(query);
    }

    render() {
        return (
            <div>
              <TitleHeader backgroundImage={headerBG}>
                  <h1>Member Programs</h1>
                  <h2>Try and Review Better-For-You Products</h2>
                  <h4>Hello, {this.props.userName || 'guest'}.</h4>
              </TitleHeader>
              <div className="container">
                <MemberProgramList queryData={this.props.queryData} />
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText,
        queryData: state.data.queryData,
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
