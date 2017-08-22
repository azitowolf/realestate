
require('styles/ListingPage.scss');
require('../../node_modules/react-image-slider/lib/image-slider.css');

import _ from 'underscore';
import React from 'react';
import ImageSlider from './Slider';

let listingData = require('./../../listings-1500-1546');

const ListingPageComponent = (props) => {
        const listingID = parseInt(props.match.params.id);
        const listing = _.find(listingData, function(listing){
            return parseInt(listing.id) === listingID
        });

        if(!listing) {
            return <div>Sorry, but the listing ID was not found</div>
        }

        return (
        <div className="index">
            <div className="content-wrapper">

            <div className="image-section">
                <ImageSlider className="image-slider" images={listing.images} />
            </div>

            <div className="section primary-info-section">
                <h1 className="address">{listing.address}</h1>    
                <div className="district">{listing.district}</div> 
                <div className="city-and-zip">{listing.city}</div>  
                <div className="rent">{listing.rent}</div>           
            </div>

            <div className="section description-section">
                <h2 className="info-header">形容：</h2>
                <div className="description">{listing.description}</div>
            </div>

            <div className="section detailed-info-section">
                <h2 className="info-header">信息：</h2>
                <div className="info-columns">
                <div className="column column-left">
                    price: {listing.rent} <br />
                    rooms: {listing.rent} <br />
                    area: {listing.district} <br />
                </div>

                <div className="column column-right">
                    size: {listing.sqm} <br />
                    beds: {listing.beds} <br />
                    baths {listing.baths}
                </div>   
                </div>    
            </div>

            <div className="section agent-section">
                <div className="column column-left">
                <div className="icon icon-user agent-icon"></div>
                </div>
                <div className="column column-right">
                <div className="agent-header">销售人：</div>
                <div className="agent-name">{listing.agent.name}</div>
                <div className="agent-phone">{listing.agent.phone}</div>
                <div className="button agent-button">contact agent</div>
                </div>
            </div>
            </div>
            
            {JSON.stringify(listing)}
            
        </div>
        )
    
}

export default ListingPageComponent;