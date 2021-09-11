const SerpApi = require('google-search-results-nodejs');
// const apikey = see .env
const search = new SerpApi.GoogleSearch(process.env.GAPI_KEY || apikey);

// The input to be passed in is the year+name+type of wine entered

const getWineImage = (input) => {

    const params = {
        engine: "google",
        q: input,
        location: "United States",
        google_domain: "google.com",
        gl: "us",
        hl: "en",
        tbm: "isch"
    };

    // const callback = (data) => {

    //     wineImage = data.images_results[0].original;
    //     console.log('callback:', wineImage)
    // }

    // Show result as JSON
    // return search.json(params, (data) => {
    //     let myImage = data.images_results[0].original
    //     console.log('callback:', myImage)
    //     return myImage
    // });
    const search = new SerpApi.GoogleSearch(process.env.GAPI_KEY || apikey);
    return search

}

// async function initGetImage(input) {
//     let image = await getWineImage(input);
//     console.log('initGetImage:', image)
//     return image;
// }

// Hardcode Test for retrieving image for added wines
// console.log('get image', getWineImage('2008 Yellow Tail Chardonnay'))
module.exports = getWineImage;