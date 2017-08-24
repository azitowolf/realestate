
require('normalize.css/normalize.css');
require('styles/App.scss');

// Utilities
import _ from 'underscore';

// Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

// Component Imports
import ListingPageComponent from './ListingPage';
import ImagesPageComponent from './ImagesPage';
import BrowseListingsComponent from './BrowseListings';

class AppComponent extends React.Component {
  constructor() {
    super();
    
  }

  render() {

    return( 
      <main className="active-page">
        <Switch>
          <Route exact path='/' component={BrowseListingsComponent}/>
          <Route path='/listing/:id' component={ListingPageComponent}/>
        </Switch>
      </main>
    )
  }
}

export default AppComponent;