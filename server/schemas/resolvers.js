const { AuthenticationError } = require('apollo-server-express');
const db = require('../models');
const { signToken } = require('../utils/auth');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.GAPI_KEY);

const resolvers = {
    Query: {
        // Returns All SELF(user data) if token matches
        Self: async(parent, args, context) => {
            console.dir(context.user)
            if (context.user) {
                const userData = await db.User.findOne({ _id: context.user._id })
                    .populate('items')
                    .populate('notes')
                console.log(`UserData: ${userData}`)
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
            const itemsData = await db.Item.find({});
            return itemsData;
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
        saveItem: async(parent, args, context) => {
            // let OWNER = '61390911bfc660880c854bec' //! SWITCH FOR USING CONTEXT FROM FRONT END
            if (context.user) {
                const savedItem = await db.Item.findOne({ _id: args.item_id })
                if (!savedItem) {
                    const newItem = await db.Item.create({ name: args.name, vice_id: args.vice_id, vice_type: args.vice_type })
                    await db.User.findOneAndUpdate({ _id: /*OWNER*/ context.user._id }, { $addToSet: { items: newItem._id } })
                    return newItem;
                }
                await db.User.findOneAndUpdate({ _id: args.owner_id }, { $addToSet: { items: savedItem._id } })
                return savedItem;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        saveWine: async(parent, args, context) => {
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

                savedWine = await db.Wine.create({...args })
                console.log('Wine saved:', savedWine)
                return savedWine;
            }
        },
        saveNote: async(parent, args, context) => {
            const savedNote = await db.Note.create({...args });
            await db.User.findOneAndUpdate({ _id: args.owner_id }, { $addToSet: { notes: savedNote._id } })
            return savedNote;
        }
    }
}

module.exports = resolvers;