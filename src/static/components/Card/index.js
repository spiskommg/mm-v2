import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group';

import './style.scss';

const Card = ({ item }) => (
  <CSSTransitionGroup
     transitionName="slide-up"
     transitionAppear={true}
     transitionAppearTimeout={300}
     transitionEnterTimeout={300}
     transitionLeaveTimeout={400}
   >
    <div className="col-md-4">
      <div className="card-item">
        <a>
          {item.title}
        </a>
        <p>
          {item.text}
        </p>
      </div>
    </div>
  </CSSTransitionGroup>
)

Card.propTypes = {
  item: PropTypes.object.isRequired,
}

export default Card;
