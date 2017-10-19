import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/data';

class Posts extends React.Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        data: PropTypes.object,
        actions: PropTypes.shape({
            dataFetchData: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        data: ''
    };

    // Note: have to use componentWillMount, if I add this in constructor will get error:
    // Warning: setState(...): Cannot update during an existing state transition (such as within `render`).
    // Render methods should be a pure function of props and state.
    componentWillMount() {
        console.log(this.props.location.pathname);
        const slug = this.props.location.pathname;
        this.props.actions.dataFetchData(slug);
    }

    render() {
      const props = this.props;
        return (
            <div>
                <h1>fetching the content</h1>
                {props.location.pathname}
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        data: state.data.data,
        isFetching: state.data.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
export { Posts as PostsNotConnected };
