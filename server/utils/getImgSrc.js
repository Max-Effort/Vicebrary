const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.GAPI_KEY);


const getImgSrc = (year, name, type) => {
    let input = `${year} ${name} ${type}`
        // const search = getWineImage(input)
    search.json({
        engine: "google",
        q: input,
        location: "United States",
        google_domain: "google.com",
        gl: "us",
        hl: "en",
        tbm: "isch"
    }, async(data) => {
        args.imgsrc = data.images_results[0].original
    })
}