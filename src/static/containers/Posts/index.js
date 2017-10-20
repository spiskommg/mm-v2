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
        const slug = this.props.location.pathname;
        this.props.actions.dataFetchData(slug);
    }

    renderContent(data) {
      if(data) {
        return (
          <div>
            <h1>{data.title}</h1>
            <p>
              {data.text}
            </p>
            <p>
            {data.post_type}
            </p>
          </div>
        );
      }
    }

    render() {
      const props = this.props;
      console.log('da props', props.data);
        return (
            <div>
                {this.renderContent(props.data)}
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
