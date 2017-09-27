
require('styles/BrowseListings.scss');

import $ from 'jQuery';
import _ from 'underscore';
import React from 'react';
import { Link } from 'react-router-dom'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Loader from '../images/loader.svg';
import config from 'config';

console.log(config);

class BrowseListingsComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoadingListings: false,
      listings: [],
      textInputVal:'',
      textSearch: '',
      beds: false,
      baths: false,
      rentMin: false,
      rentMax: false,
      district: false
    };
    this.onSelect = this.onSelect.bind(this);
  }

  loadListingsFromServer(state) {

    $.ajax({
      url      : config.apiURL + 'api?limit=10'
                  + '&textSearch=' + state.textSearch
                  + '&beds=' + state.beds
                  + '&baths=' + state.baths
                  + '&rentMin=' + state.rentMin
                  + '&rentMax=' + state.rentMax
                  + '&district=' + state.district,
      dataType : 'json',
      type     : 'GET',

      beforeSend: (url) => {
        this.setState({isLoadingListings:true});
      },

      success: data => {
        this.setState({isLoadingListings:false});
        this.setState({listings: data});
        console.log(this.state);
      },

      error: (xhr, status, err) => {
        console.error(xhr, status, err.toString());
      }
    });
  }

  componentDidMount() {
    const that = this;    
    this.loadListingsFromServer(this.state);

    // todo: make this not bound like this
    document.addEventListener("keyup", function(event){
      if(event.key === "Enter") {
        that.setState({textSearch: that.state.textInputVal})
        console.log(that.state)
      }
      
    })
  }

  stopPropagation(e) {
    console.log("stopping prop")
    e.stopPropagation();
  }

  onTextInputChange(e) {
    this.setState({textInputVal: e.target.value})
  }

  onSelect (name, val) {  
    var newState;

    // because react-select default value is an empty string
    val === "" ? newState = false : newState = val;  
    this.setState({
      [name] : newState,      
    }, function() {
      console.log(this.state)
      this.loadListingsFromServer(this.state)
    })
  }

  render () {
    var optionsSets = {
      bedsOptions: [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
        { value: 3, label: 'Three' },
        { value: 4, label: 'Four' }
      ],
      bathsOptions: [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
        { value: 3, label: 'Three' },
        { value: 4, label: 'Four' }
      ],
      rentMaxOptions: [
        { value: 10000, label: '10,000' },
        { value: 20000, label: '20,000' }
      ],
      rentMinOptions: [
        { value: 10000, label: '10,000' },
        { value: 20000, label: '20,000' }
      ],    
      districtOptions: [
        { value: '静安', label: '静安区' },
        { value: '普陀', label: '普陀区' }
      ]
    }
    var allFiltersValue = [];
    for(var filter in this.state) {
      if(this.state[filter] && filter !== 'listings' && filter !== 'isLoadingListings' && filter !== 'textInputVal' ) {
        switch (filter) {
          case 'beds':
            allFiltersValue.push({
              value: 'beds',
              label: this.state[filter] + " " + filter
            }
              
            )
          break;
          case 'baths':
            allFiltersValue.push(this.state[filter] + " " + filter)
          break;                  
          case 'rentMin':
            allFiltersValue.push("¥" + this.state[filter] + " rent minimum")
          break;   
          case 'rentMax':
            allFiltersValue.push( "¥" + this.state[filter] + " rent maximum")
          break;  
          case 'district':
            allFiltersValue.push(this.state[filter] + " " + filter)
          break;                              

          default:
            allFiltersValue.push(this.state[filter]) 
        }
             
      }
    }

    return (
      
      <div className="page-browse-listings">       
        <div className="livwell-header">
            <h1>Livwell</h1>
            <p>find apartments without an agent.
              agent service/translation only if you need it. <b>find an awesome place to live.</b></p>
        </div> 
        <div className="livwell-subheader">
          <input onChange={this.onTextInputChange.bind(this)} id="search-apartments" type="text" placeholder="search by street, compound, etc."></input> 
        </div>
        <div className="filters">   
          <div className="flex-row flex-row-basics">
            <Select
              name="beds"
              value={this.state.beds || ""}
              options={optionsSets.bedsOptions}
              placeholder="Bedrooms"
              onChange={this.onSelect.bind(this, 'beds')}
            />               
            <Select
              name="baths"
              placeholder="Bathrooms"
              value={this.state.baths || ""}
              options={optionsSets.bathsOptions}
              onChange={this.onSelect.bind(this, 'baths')}
            />  
            <Select
              name="district"
              placeholder="District"
              value={this.state.district || ""}
              options={optionsSets.districtOptions}
              onChange={this.onSelect.bind(this, 'district')}
            />     
          </div>
          <div className="flex-row flex-row-rent">
            <Select
              name="rentMax"
              placeholder="Rent - Maximum"
              value={this.state.rentMax || ""}
              options={optionsSets.rentMaxOptions}
              onChange={this.onSelect.bind(this, 'rentMax')}
            /> 
            <Select
              name="rentMin"
              placeholder="Rent- Minimum"
              value={this.state.rentMin || ""}
              options={optionsSets.rentMinOptions}
              onChange={this.onSelect.bind(this, 'rentMin')}
            />      
          </div>          
  
          <Select
            name="AllFilters"
            className="all-filters"
            placeholder=""
            value={allFiltersValue}
            multi={true}
            allowCreate={false}
            clearable={false}
          />                                   
        </div>
      <ul className="browse-listings-filtered-listings">
      
        {
          !this.state.isLoadingListings ?
            this.state.listings
            .map(listing => { 
              if(listing.address){
                return (          
                  <li key={listing.id} className="browse-listing-item">
                    <Link to={`/listing/${listing.id}`} 
                          className="thumb-image" 
                          style={{
                            backgroundImage:'url('+listing.images[0]+')',
                            backgroundSize:'cover'
                          }}>
                    </Link>
                    <div className="browse-listing-item-info">
                      <h2>{listing.address_en}</h2>
                      <div>¥{listing.rent}/month </div>
                      <div> {listing.rent} - {listing.rent} - {listing.district} </div>
                      <div>{listing.images.length} photos</div>
                      
                    </div>
                  </li>
                )
              }
            }) : <img className="listings-loader" src={Loader} />  

        }
      </ul>
      {/* {JSON.stringify(this.filterListings(this.state))} */}
    </div>
    
    )
  }
}

export default BrowseListingsComponent