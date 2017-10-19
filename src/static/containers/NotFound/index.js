import React from 'react';

export default class NotFoundView extends React.Component {
    componentWillMount() {
        console.log(this.props.location.pathname);
    }

    render() {
        return (
            <div>
                <h1>NOT FOUND</h1>
            </div>
        );
    }
}
