require('normalize.css/normalize.css');
require('styles/App.scss');
require('../../node_modules/react-image-slider/lib/image-slider.css');

import _ from 'underscore';
import React from 'react';
import ListingPageComponent from './ListingPage';
import ImagesPageComponent from './ImagesPage';

// REMOVE
import ImageSlider from './Slider';


let houseList = require('./../../houselistData');
let houseData = require('./../../houseData');

class AppComponent extends React.Component {
  constructor() {
    super();

    const url = new URL(window.location);
    
    var rootPage = url.pathname.split('/')[1] || 0;
    var houseID = url.pathname.split('/')[2] || 0;
    var house = _.find(houseData, function(house){return house.id.toString() === houseID})

    this.state = { 
      url: url,
      page: rootPage,
      house: house
    };
    
  }

  componentDidMount () {
    console.log(this.state);
  }

  render() {

    var primaryPage = <ListingPageComponent listing={this.state.house} />
    var fullScreenImagesPage = <ImagesPageComponent listing={this.state.house} url={this.state.url}/>

    if(this.state.page === "images"){
      return fullScreenImagesPage;
    } else {
      return primaryPage;
    }

  }
}

AppComponent.defaultProps = {
};

export default AppComponent;