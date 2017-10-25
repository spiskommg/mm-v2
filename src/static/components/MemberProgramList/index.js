import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '../Card/index';

class MemberProgramList extends React.Component {
    static propTypes = {
        queryData: PropTypes.object,
    };

    static defaultProps = {
        queryData: {}
    };

    renderContent(data) {
      console.log(data.count);
      if(data.count) {
        return data.results.map((item, i) => {
          console.log(item, i);
          return <Card key={item.id} item={item} />;
        });
      }
    };

    render() {
        return (
            <div className="row">
                  {this.renderContent(this.props.queryData)}
            </div>
        );
    }
}

export default connect(null)(MemberProgramList);
export { MemberProgramList as MemberProgramListNotConnected };
