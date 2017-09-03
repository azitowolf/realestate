
require('styles/ListingPage.scss');
require('../../node_modules/react-image-slider/lib/image-slider.css');

import _ from 'underscore';
import React from 'react';
import ImageSlider from './Slider';

let listingData = require('./../../listings_0-3000.json');

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
                <div className="city">{listing.city}</div>  
                <div className="bed-bath-sqm">{listing.beds} beds - {listing.baths} baths- {listing.sqm} sqm</div> 
                <div className="rent">¢{listing.rent}</div>           
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

            <div className="section contact-us">
                <h1 className="contact-us-title">Contact us:</h1>
                <div className="contact-us-actions">
                    <div className="livwell-logo"></div>
                    <div className="livwell-qr"></div>
                </div>
                <div className="contact-us-button">
                    Or give us a call
                </div>
            </div>

            </div>
            
        </div>
        )
    
}

export default ListingPageComponent;