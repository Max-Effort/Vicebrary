const SerpApi = require('google-search-results-nodejs');
const apikey = '' // COPY GAPI_KEY from .env;
const search = new SerpApi.GoogleSearch(process.env.GAPI_KEY || apikey);
let wineImage

const getWineImage = async(input) => {
    const params = {
        engine: "google",
        q: input,
        location: "United States",
        google_domain: "google.com",
        gl: "us",
        hl: "en",
        tbm: "isch"
    };

    const callback = (data) => {
        wineImage = data.images_results[0].original;
        console.log(wineImage)
        return
    }

    // Show result as JSON
    search.json(params, callback);

    return wineImage
}

async function init(input) {
    let image = await getWineImage(input);
    return image;
}

// Hardcode Test for retrieving image for added wines
console.log(init('2008 Yellow Tail Chardonnay'))

// module.exports = init;