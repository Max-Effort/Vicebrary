const db = require('../config/connection');
const { Wine } = require('../models');
const wineData = require('./wineData.json');

db.once('open', async() => {
    try {
        await Wine.deleteMany({});
        await Wine.create(wineData);

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});