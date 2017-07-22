require('normalize.css/normalize.css');

// remove
require('styles/App.scss');
require('../../node_modules/react-image-slider/lib/image-slider.css');

import React from 'react';
import ImageSlider from './Slider';

class ImagesPageComponent extends React.Component {
    constructor() {
        super();
    }
    render () {
        var returnUrl = '/listing/' + this.props.url.pathname.split('/')[2];
        console.log(returnUrl)
        return (
            <div className="fp-image-slider">
                <div className="index">
                <div className="section back-to-home">
                    <a href={returnUrl}>Back to Main Page</a>
                </div>
                <ImageSlider className="image-slider" images={this.props.listing.images} />
                </div>
                
            </div>
        )
    }
}

ImagesPageComponent.defaultProps = {
};

export default ImagesPageComponent;