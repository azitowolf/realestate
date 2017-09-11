
require('styles/ListingPage.scss');
require('../../node_modules/react-image-slider/lib/image-slider.css');

import $ from 'jQuery';
import _ from 'underscore';
import React from 'react';
import ImageSlider from './Slider';

console.log("loaded")

class ListingPageComponent extends React.Component {
        
    constructor(props) {
        super(props);
        this.state = {
          listing: false
        };        
        this.fetchListingData = this.fetchListingData.bind(this);
      }
      
    fetchListingData(id) {
        const listingID = parseInt(id);
        console.log(id)
        $.ajax({
            url      : 'http://localhost:3000/api/listing/' + listingID,
            dataType : 'json',
            type     : 'GET',
    
            success: data => {
                console.log(data)
                this.setState({listing: data[0]});
            },
    
            error: (xhr, status, err) => {
            console.error(xhr, status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.fetchListingData(this.props.match.params.id);
    }

    render() {
        const listing = this.state.listing;
        console.log(listing)

        if(!listing) {
            return <div>Loading...</div>
        } else {
            return (
                <div className="index">
                    <div className="content-wrapper">
        
                    <div className="image-section">
                        <ImageSlider className="image-slider" images={listing.images} />
                    </div>
        
                    <div className="section primary-info-section">
                        <h1 className="address">{listing.address}</h1> 
                        <h1 className="address">{listing.address_en}</h1>    
                        <div className="district">{listing.district}</div> 
                        <div className="district">{listing.district_en}</div> 
                        <div className="city">{listing.city}</div>  
                        <div className="city">{listing.city_en}</div>  
                        <div className="bed-bath-sqm">{listing.beds} 室- {listing.baths} 卫- {listing.sqm} sqm</div> 
                        <div className="bed-bath-sqm">{listing.beds} beds- {listing.baths} baths- {listing.sqm} sqm</div> 
                        <div className="rent">¥{listing.rent}/month</div>           
                    </div>
        
                    <div className="section description-section">
                        <h2 className="info-header">Description/形容:</h2>
                        <div className="description">{listing.description}</div>
                        <div className="description">{listing.description_en}</div>
                    </div>
        
                    <div className="section detailed-info-section">
                        <h2 className="info-header">Information/信息：</h2>
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
        }


}

export default ListingPageComponent;