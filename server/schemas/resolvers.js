const { AuthenticationError } = require('apollo-server-express');
const db = require('../models');
const { signToken } = require('../utils/auth');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.GAPI_KEY);

const resolvers = {
    Query: {
        // Returns All SELF(user data) if token matches
        Self: async(parent, args, context) => {
            // console.dir(context.user._id)
            if (context.user) {
                const userData = await db.User.findOne({ _id: context.user._id })
                    .populate({
                        path: 'items',
                        populate: {
                            path: 'vice',
                            model: 'Vice'
                        }
                    })


                return userData;
            }
            throw new AuthenticationError('Not Logged In. Go\'on Git!!')
        },
        Users: async() => {
            const userData = await db.User.find({}).populate({
                path: 'items',
                populate: {
                    path: 'vice',
                    model: 'Vice'
                }
            })
            return userData;
        },
        // Finds a user that is not SELF
        User: async(parent, args) => {
            // console.log(args.username)
            const userData = await db.User.findOne({ username: args.username });
            return userData;
        },
        Item: async(parent, args, context) => {
            const item = await db.Item.findOne({ _id: args._id })
            const wine = await db.Wine.find({ _id: item.vice_id })

            const updatedItem = await db.Item.findOneAndUpdate({ _id: item._id }, { $set: { imgsrc: wine[0].imgsrc } })
            console.log({ updatedItem })
            return updatedItem
        },
        // Note: async(parent, args, context) => {
        //     const item = await db.Item.findOne({ _id: args._id })

        // },
        Items: async(parent, args, context) => {
            if (context.user) {
                const itemsData = await db.Item.find({ owner_id: context.user._id }).populate({ path: 'vice', model: 'Vice' })
                console.log(itemsData)
                return itemsData;
            }
            throw new AuthenticationError('Not Logged In. Go\'on Git!!')
        },
        Vices: async(parent, args, context) => {
            if (context.user) {
                let viceData = await db.Vice.find({})
                return viceData

            }
            throw new AuthenticationError('Not Logged In. Go\'on Git!!')
        },
        Wine: async(parent, args, context) => {
            console.log({ args })
            const wineData = await db.Wine.findOne({ _id: args._id })
            return wineData
        },
        Wines: async() => {
            const wineData = await db.Wine.find({});
            return wineData;
        },
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await db.User.create(args);
            const token = signToken(user);
            return { token, user };
            // return user;
        },
        login: async(parent, { email, password }) => {
            let emailCheck = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
            if (emailCheck) {
                try {
                    const user = await db.User.findOne({ email });
                    console.log({ user });
                    if (!user) {
                        throw new AuthenticationError('Incorrect credentials');
                    }

                    const correctPw = await user.isCorrectPassword(password);
                    if (!correctPw) {
                        throw new AuthenticationError('Incorrect credentials');
                    }
                    const token = signToken(user);
                    return { token, user }
                } catch (err) {
                    throw err;
                }
            } else {
                try {
                    const user = await db.User.findOne({ username: email });
                    if (!user) {
                        throw new AuthenticationError('Incorrect credentials');
                    }

                    const correctPw = await user.isCorrectPassword(password);
                    if (!correctPw) {
                        throw new AuthenticationError('Incorrect credentials');
                    }
                    const token = signToken(user);
                    return { token, user }
                } catch (err) {
                    throw err;
                }

            }
        },
        saveVice: async(parent, args, context) => {
            // {"vice_type": "Wine", "vice_id": "61419bf1fb2190ea2445d460", "item_id": "614542b2165e0d97b5a57500"}
            if (context.user) {
                // console.log(`Update Vice \n item_ID: ${args.item_id} \n vice_ID ${args. vice_id} \n vice_type ${args. vice_type}`)
                const savedVice = await db.Vice.findOne({ _id: args.vice_id });
                const savedItem = await db.Item.findOne({ owner_id: context.user._id, vice_id: args.vice_id })
                console.log(`\n Server resolver.js saveVice: ${savedVice}\n`)
                if (!savedVice) {
                    console.log(`${savedVice} does not exist making one.`)
                    let viceInfo
                    let updatedVice
                        // console.log(`vicetype: ${args.vice_type}`)
                    if (args.vice_type === 'Wine') {
                        //Getting Vice info
                        let data = await db.Wine.find({ _id: args.vice_id })
                            // Check if user is adding a new item
                        if (!savedItem) {
                            // add info to Item table in DB
                            const newItem = await db.Item.create({...args, owner_id: context.user._id })
                            console.dir({ newItem })
                                // update User Items to include the id of the new item
                                //Setting item_id from newly created item
                            viceInfo = {...data[0]._doc, item_id: newItem._id, owner_id: context.user._id }
                        }
                    }
                    //Creating new Vice
                    // Vice DB entry = selected vice's(wine) table info as the properties plus the item_id of the new item
                    updatedVice = await db.Vice.create(viceInfo)
                    await db.User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { items: updatedVice.item_id } })
                    return updatedVice
                }
                console.log(`Found Existing Record: ${savedVice}`)
                return savedVice
            }
            throw new AuthenticationError('Not Logged In. Go\'on Git!!')
        },
        // ! NOT SURE THIS MUTATION IS BEING USED ANYWHERE . . . DELETE IT?
        saveItem: async(parent, args, context) => {
            console.log({ parent })
            if (context.user) {
                // Check if user is adding a new item
                const savedItem = await db.Item.findOne({ vice_id: args.vice_id })
                    // If not--v
                console.dir({...args })
                if (!savedItem) {
                    // add info to Item table in DB
                    const newItem = await db.Item.create({...args, owner_id: context.user._id })
                    console.dir({ newItem })
                        // update User Items to include the id of the new item
                    await db.User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { items: newItem._id } })
                }
                return newItem;
            }
            // if community vice already exists in user library, do nothing
            return savedItem;
        },
        saveWine: async(parent, args, context) => {
            if (context.user) {
                if (args) {
                    let wines = await db.Wine.find({})
                    console.log('Args:\n', args.name, args.type, args.year)
                    let yearAsNum = parseInt(args.year, 10)
                    let newWine = `${yearAsNum}${args.name}${args.type}`
                    let dbWine
                    let existCheck = await wines.map((wine) => {
                        return dbWine = `${wine.year}${wine.name}${wine.type}`


                    })
                    console.log(dbWine, newWine)
                    console.log(dbWine == newWine)
                    if (dbWine == newWine) {
                        console.log(`${newWine} already exists`)
                        return false
                    }
                    console.log('exist check: ', existCheck)
                    if (existCheck.includes(true)) {
                        console.error(`The wine's already in the database.`)
                        return false
                    }
                    if (existCheck.includes(false)) {
                        console.log('We are go for launch')
                    }

                    let savedWine
                    if (args.imgsrc == '') {
                        const { year, name, type } = args
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
                                    // console.log('ARGS: ', args)
                                savedWine = await db.Wine.create({...args })
                            })
                            //! This will always return null, but the information is getting passed to the db
                        return savedWine
                    } else {

                        savedWine = await db.Wine.create({...args, author_id: context.user._id })
                        console.log('Wine saved:', savedWine)
                        return savedWine;
                    }
                }
            }

            throw new AuthenticationError('Not Logged In. Go\'on Git!!')
        },
        saveNote: async(parent, args, context) => {
            if (context.user) {
                console.dir({ args })
                try {
                    console.log(`Args.itemID: ${args._id}`)
                    const targetItem = await db.Item.findOneAndUpdate({ _id: args.item_id }, { $set: { note: args.content } }, { returnOriginal: false })
                    console.log('Item saved:', targetItem)
                    return targetItem
                } catch (err) { throw err }
            }
            throw new AuthenticationError('Not Logged In. Go\'on Git!!')
        },
        removeFromVicebrary: async(parent, args, context) => {
            if (context.user) {
                console.log(db.Item.length)
                try {
                    const item = await db.Item.findOne({ vice_id: args.vice_id })
                    const user = await db.User.findOneAndUpdate({ _id: context.user._id }, { $pull: { items: item._id }, returnOriginal: false })
                    console.log(`Removing ${item._id} from ${user.username}'s items list.`)
                    await db.Item.deleteOne({ vice_id: args.vice_id })
                    await db.Vice.deleteOne({ _id: args.vice_id })
                    return { message: 'Item removed' }
                } catch (err) { throw err }
            }
            throw new AuthenticationError('Not Logged In. Go\'on Git!!')
        }
    }
}





module.exports = resolvers;