import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';

import routes from '../../routes';
import { dataFetchData } from '../../actions/data';
import DevTools from './DevTools';
import App from '../../app';


export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.shape().isRequired,
        history: PropTypes.shape().isRequired
    };

    componentWillMount() {
      console.log('root', this.props.history.location);
      var location = this.props.history.location;
      this.props.store.dispatch(dataFetchData(location));
    }

    render() {
        return (
            <div>
                <Provider store={this.props.store}>
                    <div>
                        <App>
                            <ConnectedRouter history={this.props.history}>
                                {routes}
                            </ConnectedRouter>
                        </App>
                        <DevTools />
                    </div>
                </Provider>
            </div>
        );
    }
}
