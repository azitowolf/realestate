require('normalize.css/normalize.css');

// change
require('styles/App.scss');
require('../../node_modules/react-image-slider/lib/image-slider.css');

import React from 'react';
import ImageSlider from './Slider';

class ListingPageComponent extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        console.log(this.props)
    }
    render () {
        return (
        <div className="index">
            <div className="content-wrapper">

            <div className="image-section">
                <ImageSlider className="image-slider" images={this.props.listing.images} />
            </div>

            <div className="section primary-info-section">
                <h1 className="address">{this.props.listing.address}</h1>    
                <div className="district">{this.props.listing.district}</div> 
                <div className="city-and-zip">{this.props.listing.city}</div>  
                <div className="rent">{this.props.listing.rent}</div>           
            </div>

            <div className="section description-section">
                <h2 className="info-header">形容：</h2>
                <div className="description">{this.props.listing.description}</div>
            </div>

            <div className="section detailed-info-section">
                <h2 className="info-header">信息：</h2>
                <div className="info-columns">
                <div className="column column-left">
                    price: {this.props.listing.rent} <br />
                    rooms: {this.props.listing.rent} <br />
                    area: {this.props.listing.district} <br />
                </div>

                <div className="column column-right">
                    size: {this.props.listing.sqm} <br />
                    beds: {this.props.listing.beds} <br />
                    baths {this.props.listing.baths}
                </div>   
                </div>    
            </div>

            <div className="section agent-section">
                <div className="column column-left">
                <div className="icon icon-user agent-icon"></div>
                </div>
                <div className="column column-right">
                <div className="agent-header">销售人：</div>
                <div className="agent-name">{this.props.listing.agent.name}</div>
                <div className="agent-phone">{this.props.listing.agent.phone}</div>
                <div className="button agent-button">contact agent</div>
                </div>
            </div>
            </div>
            
            {/* {JSON.stringify(houseData)} */}
            
        </div>
        )
    }
}

ListingPageComponent.defaultProps = {
};

export default ListingPageComponent;