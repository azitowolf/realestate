
require('styles/BrowseListings.scss');

import React from 'react';
import { Link } from 'react-router-dom'

let detailedListingData = require('./../../detailedListingData');
let browseListingData = require('./../../browseListingData');

const BrowseListingsComponent = () => (
  <div>
    <ul>
      {
        detailedListingData.map(listing => (
          <li key={listing.id}>
            <Link to={`/listing/${listing.id}`}>{listing.id}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

export default BrowseListingsComponent