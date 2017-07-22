require('normalize.css/normalize.css');
require('styles/App.scss');
require('../../node_modules/react-image-slider/lib/image-slider.css');

import React from 'react';
import ImageSlider from './Slider';

let userIcon = require('../images/user-icon.svg');

let houseList = require('./../../houselistData');
let houseData = require('./../../houseData');

class AppComponent extends React.Component {
  constructor() {
    super();

    const url = new URL(window.location);
    var houseID = url.pathname.split('')[1];
    var isFullScreenImage = url.searchParams.get('isFS') === 'false' ? false : true;

    console.log(houseID)

    this.state = { 
      url: url,
      house: houseData[houseID],
      fullScreenImages: isFullScreenImage  
    };
    
  }

  componentDidMount () {
    console.log(this.state);
  }

  render() {

    var primaryPage = 

      <div className="index">
        <div className="content-wrapper">

          <div className="image-section">
            <ImageSlider className="image-slider" images={this.state.house.images} />
          </div>

          <div className="section primary-info-section">
            <h1 className="address">{this.state.house.address}</h1>    
            <div className="district">{this.state.house.district}</div> 
            <div className="city-and-zip">{this.state.house.city}</div>  
            <div className="rent">{this.state.house.rent}</div>           
          </div>

          <div className="section description-section">
            <h2 className="info-header">形容：</h2>
            <div className="description">{this.state.house.description}</div>
          </div>

          <div className="section detailed-info-section">
            <h2 className="info-header">信息：</h2>
            <div className="info-columns">
              <div className="column column-left">
                  price: {this.state.house.rent} <br />
                  rooms: {this.state.house.rent} <br />
                  area: {this.state.house.district} <br />
              </div>

              <div className="column column-right">
                  size: {this.state.house.sqm} <br />
                  beds: {this.state.house.beds} <br />
                  baths {this.state.house.baths}
              </div>   
            </div>    
          </div>

          <div className="section agent-section">
            <div className="column column-left">
              <div className="icon icon-user agent-icon"></div>
            </div>
            <div className="column column-right">
              <div className="agent-header">销售人：</div>
              <div className="agent-name">{this.state.house.agent.name}</div>
              <div className="agent-phone">{this.state.house.agent.phone}</div>
              <div className="button agent-button">contact agent</div>
            </div>
          </div>
        </div>
        
        {/* {JSON.stringify(houseData)} */}
        
      </div>;
    var fullScreenImagesPage =

      <div className="fp-image-slider">
        <div className="index">
          <div className="section back-to-home">
            <a href="http://localhost:8000/2?isFS=false">Back to Main Page</a>
          </div>
          <ImageSlider className="image-slider" images={this.state.house.images} />
        </div>
        
      </div>;

    if(this.state.fullScreenImages){
      return fullScreenImagesPage;
    } else {
      return (primaryPage);
    }

  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

//TODO
/*
- get url redirect working
- style slider more thoroghly

*/ 