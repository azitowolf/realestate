'use strict';

import React from 'react';
require('../styles/SliderArrow.scss');

class SliderArrowComponent extends React.Component {
  render() {
    var classes = "slider-arrow"
    this.props.direction == "right" ? classes += " right" : classes += " left";
    return (
      <div>
        <div {...this.props} className={classes}>BUTTON</div>
      </div>
    );
  }
}

SliderArrowComponent.displayName = 'SliderArrowComponent';

export default SliderArrowComponent;
