import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.scss';

class TitleHeader extends React.Component {
    static propTypes = {
        backgroundImage: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        backgroundImage: '',
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    componentWillMount = () => {
      
    }

    renderHeader = () => {
      if(this.props) {

        const archiveHeaderStyle = {
          width: "100%",
          height: "100%",
          position:'absolute',
          backgroundImage: `url(${this.props.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: '.5',
        };

        return (
          <div className="archive-header">
            <div style={ archiveHeaderStyle }></div>
            <div className="title-holder text-center">
              {this.props.children}
            </div>
          </div>
        );
      } else {
        return nothing;
      }
    }

    render() {
        return (
          <div>
          {this.renderHeader()}
          </div>
        );
    }
}



export default connect(null)(TitleHeader);
export { TitleHeader as TitleHeaderNotConnected };
