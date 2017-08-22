
require('styles/BrowseListings.scss');

import _ from 'underscore';
import React from 'react';
import { Link } from 'react-router-dom'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

let listingData = require('./../../listings-1500-1546');
let browseListingData = require('./../../browseListingData');

class BrowseListingsComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      beds:'all',
      baths:'all',
      rentMin: 'all',
      rentMax:'all',
      district: 'all'
    };
    this.onSelect = this.onSelect.bind(this);
    this.filterListings = this.filterListings.bind(this);
  }

  onSelect (name, val) {    

    this.setState({
      [name] : val,      
    }, function() {
      console.log(this.state)
    })
    
  }

  filterListings (state) {

    var filteredListings = _.filter(listingData, function (listing) {
      return  (state.beds === 'all' || listing.beds === state.beds.toString()) &&
              (state.baths === 'all' || listing.baths === state.baths.toString()) &&
              (state.rentMax === 'all' || listing.rent < state.rentMax) &&
              (state.rentMin === 'all' || listing.rent > state.rentMin) &&
              (state.district ==='all' || listing.district.match([state.district]))
    })

    return filteredListings
  }

  render () {

    var bedsOptions = [
      { value: 'all', label: 'all'},
      { value: 1, label: 'Bedrooms: One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
      { value: 4, label: 'Four' }
    ],
    bathsOptions = [
      { value: 'all', label: 'all'},
      { value: 1, label: 'Bathrooms: One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
      { value: 4, label: 'Four' }
    ],
    rentMaxOptions = [
      { value: 10000, label: '10,000' },
      { value: 20000, label: '20,000' }
    ],
    rentMinOptions = [
      { value: 0, label: '0' },
      { value: 10000, label: '10,000' },
      { value: 20000, label: '20,000' }
    ],    
    districtOptions = [
      { value: 'all', label: 'all'},
      { value: '静安', label: '静安区' },
      { value: '普陀', label: '普陀区' }
    ];

    return (
      <div>
      <div className="filters">
        <Select
          name="beds"
          value={this.state.beds}
          options={bedsOptions}
          onChange={this.onSelect.bind(this, 'beds')}
        />
        <Select
          name="baths"
          value={this.state.baths}
          options={bathsOptions}
          onChange={this.onSelect.bind(this, 'baths')}
        />  
        <Select
          name="rentMax"
          value={this.state.rentMax}
          options={rentMaxOptions}
          onChange={this.onSelect.bind(this, 'rentMax')}
        /> 
        <Select
          name="rentMin"
          value={this.state.rentMin}
          options={rentMinOptions}
          onChange={this.onSelect.bind(this, 'rentMin')}
        />         
        <Select
          name="district"
          value={this.state.rent}
          options={districtOptions}
          onChange={this.onSelect.bind(this, 'district')}
        />                             
      </div>
      <ul className="browse-listings-filtered-listings">
        {
          this.filterListings(this.state)
          .map(listing => { 
            if(listing.address){
              return (          
                <li key={listing.id} className="browse-listing-item">
                  <div className="thumb-image" style={{
                      backgroundImage:'url('+listing.images[0]+')',
                      backgroundSize:'cover'
                      }}> </div>
                  <div className="browse-listing-item-info">
                    <h2>{listing.address}</h2>
                    <div>¥{listing.rent}/month </div>
                    <div> {listing.rent} - {listing.rent} - {listing.district} </div>
                    <div>{listing.images.length} photos</div>
                  </div>
                  <Link to={`/listing/${listing.id}`}>{listing.id}</Link>
                </li>
              )
            }
          })
        }
      </ul>
      {/* {JSON.stringify(this.filterListings(this.state))} */}
    </div>
    
    )
  }
}

export default BrowseListingsComponent