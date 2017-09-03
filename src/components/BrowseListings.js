
require('styles/BrowseListings.scss');

import $ from 'jQuery';
import _ from 'underscore';
import React from 'react';
import { Link } from 'react-router-dom'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class BrowseListingsComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      listings: [],
      beds:"",
      baths:"",
      rentMin: "",
      rentMax:"",
      district: ""
    };
    this.onSelect = this.onSelect.bind(this);
  }

  loadListingsFromServer() {

    $.ajax({
      url      : 'http://localhost:3000/api?from=22&to=50',
      dataType : 'json',
      type     : 'GET',

      success: data => {
        console.log(data)
        this.setState({listings: data});
        console.log(this.state);
      },

      error: (xhr, status, err) => {
        console.error(xhr, status, err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadListingsFromServer();
  }

  onSelect (name, val) {    
    this.setState({
      [name] : val,      
    }, function() {
      console.log(this.state)
    })
  }

  render () {

    var bedsOptions = [
      { value: "", label: 'Bedrooms'},
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
      { value: 4, label: 'Four' }
    ],
    bathsOptions = [
      { value: "", label: 'Bathrooms'},
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
      { value: 4, label: 'Four' }
    ],
    rentMaxOptions = [
      { value: "", label: 'Rent Price - Maximum' },
      { value: 10000, label: '10,000' },
      { value: 20000, label: '20,000' }
    ],
    rentMinOptions = [
      { value: "", label: 'Rent Price - Minimum' },
      { value: 10000, label: '10,000' },
      { value: 20000, label: '20,000' }
    ],    
    districtOptions = [
      { value: "", label: 'District'},
      { value: '静安', label: '静安区' },
      { value: '普陀', label: '普陀区' }
    ];

    return (
      <div>
        <div className="filters">
          <Select
            name="beds"
            placeholder="Bedrooms"
            value={this.state.beds}
            options={bedsOptions}
            onChange={this.onSelect.bind(this, 'beds')}
          />
          <Select
            name="baths"
            placeholder="Bathrooms"
            value={this.state.baths}
            options={bathsOptions}
            onChange={this.onSelect.bind(this, 'baths')}
          />  
          <Select
            name="rentMax"
            placeholder="Rent - Maximum"
            value={this.state.rentMax}
            options={rentMaxOptions}
            onChange={this.onSelect.bind(this, 'rentMax')}
          /> 
          <Select
            name="rentMin"
            placeholder="Rent- Minimum"
            value={this.state.rentMin}
            options={rentMinOptions}
            onChange={this.onSelect.bind(this, 'rentMin')}
          />         
          <Select
            name="district"
            placeholder="District"
            value={this.state.district}
            options={districtOptions}
            onChange={this.onSelect.bind(this, 'district')}
          />                             
        </div>
      <ul className="browse-listings-filtered-listings">
        {
          this.state.listings
          .map(listing => { 
            if(listing.address){
              return (          
                <li key={listing.id} className="browse-listing-item">
                  <Link to={`/listing/${listing.id}`} className="thumb-image" style={{
                        backgroundImage:'url('+listing.images[0]+')',
                        backgroundSize:'cover'
                        }}>
                  </Link>
                  <div className="browse-listing-item-info">
                    <h2>{listing.address}</h2>
                    <div>¥{listing.rent}/month </div>
                    <div> {listing.rent} - {listing.rent} - {listing.district} </div>
                    <div>{listing.images.length} photos</div>
                    
                  </div>
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