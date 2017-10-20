import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MemberProgram extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
        data: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        statusText: '',
        userName: '',
        data: ''
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

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
    };

    render() {
        return (
            <div className="container">
                  member program testroute
                  {this.renderContent(this.props.data)}
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

export default connect(mapStateToProps)(MemberProgram);
export { MemberProgram as MemberProgramViewNotConnected };
