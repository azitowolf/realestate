import React from 'react';
import Slider from 'react-slick';
import SliderArrow from './SliderArrowComponent';

require('styles/Slider.scss');
 
export default React.createClass({   
  render() {
    const images = this.props.images;
    var rightArrow = <SliderArrow direction="right" />;
    var leftArrow = <SliderArrow direction="left" />;

    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true,
        className: "slides",
        swipe: true,
        nextArrow: rightArrow,
        prevArrow: leftArrow,
        fade: false
    };
 
    var style = (imgURL) => ({
        backgroundImage: 'url(' + imgURL + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    })

    return (
      <Slider {...settings}>
        <div style={style(images[1])}></div>
        <div style={style(images[2])}></div>
        <div style={style(images[3])}></div>
        <div style={style(images[4])}></div>
      </Slider>
    );
  }
});