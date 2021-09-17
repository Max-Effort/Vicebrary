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
            const userData = await db.User.find({});
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
        Items: async(parent, args, context) => {
            if (context.user) {
                const itemsData = await db.Item.find({ owner_id: context.user._id }).populate({ path: 'vice', model: 'Vice' })
                console.log(itemsData)
                return itemsData;
            }
        },
        Vices: async(parent, args, context) => {
            if (context.user) {
                let viceData = await db.Vice.find({})
                return viceData

            }
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
        saveToVicebrary: async(parent, args, context) => {
            // console.dir(`Update Vice ARGS: ${args.item_id}`)
            let vice = await db.Vice.findOne({ item_id: args.item_id })
            if (!vice) {
                let viceInfo
                console.log(`vicetype: ${args.vice_type}`)
                if (args.vice_type === 'Wine') {
                    let data = await db.Wine.find({ _id: args.vice_id })
                        // console.log(`inside wine if: \n ${data[0]._doc.name}`)
                    viceInfo = {...data[0]._doc, item_id: args.item_id }
                    let updatedVice = await db.Vice.create(viceInfo)
                    return updatedVice
                }
                // console.dir(`line 130:${updatedVice}`)
                return updatedVice
            }
            console.log(`Found Existing Record: ${vice}`)
            return vice
        },
        saveItem: async(parent, args, context) => {
            if (context.user) {
                const savedItem = await db.Item.findOne({ vice_id: args.vice_id })
                if (!savedItem) {
                    const newItem = await db.Item.create({...args, owner_id: context.user._id })
                    await db.User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { items: newItem._id } })
                }
                return newItem;
            }
            return savedItem;
        },

        saveWine: async(parent, args, context) => {
            let wines = await db.Wine.find({})
            let existCheck = await wines.map((wine) => {
                let dbWine = `${wine.year} ${wine.name}${wine.type}`
                let newWine = `${args.year} ${args.name}${args.type}`
                if (dbWine == newWine) {
                    return false
                } else { return true }
            })

            let savedWine
            if (!existCheck) {
                return (`The wine's already in the database.`)
            }
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

                savedWine = await db.Wine.create({...args })
                console.log('Wine saved:', savedWine)
                return savedWine;
            }
        },
        saveNote: async(parent, args, context) => {
            if (context.user) {
                try {
                    const targetItem = await db.Item.findOneAndUpdate({ _id: args.item_id }, { $set: { note: args.content }, upsert: true })
                    return targetItem
                } catch (err) { throw err }
            }
        }
    }
}





module.exports = resolvers;