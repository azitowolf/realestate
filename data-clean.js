let listingData = require('./listings-1500-1546');
const fs = require('fs');

let newLD = listingData.map(listing => {
    listing.rent = parseInt(listing.rent);
    listing.beds = parseInt(listing.beds);
    listing.baths = parseInt(listing.baths);
    listing.images.forEach(function(url, i){
        listing.images[i] = url.replace("http://jiazaishanghai.com", "http://jzsh.qianmen.co");
    })
    listing.description = listing.description
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/\d{10,12}/g, "********"); 

    return listing
})

fs.writeFile('output.json', JSON.stringify(newLD), function(err){
    console.log('writing to output json')
});

