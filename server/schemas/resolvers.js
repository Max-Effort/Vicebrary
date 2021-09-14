const { AuthenticationError } = require('apollo-server-express');
const db = require('../models');
const { signToken } = require('../utils/auth');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.GAPI_KEY);

const resolvers = {
    Query: {
        // Returns All SELF(user data) if token matches
        Self: async(parent, args, context) => {
            // console.dir({ context })
            // if (context.user) {
            const userData = await db.User.findOne({ username: args.username }, )
                .populate('library')
                // const libraryData = await db.Library.findOne({ owner_id: userData._id })
                // console.log(libraryData)
            console.log(`UserData: ${userData}`)
            return userData;
            // }
            // throw new AuthenticationError('Not Logged In. Go\'on Git!!')
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
        Library: async(parent, args, context) => {
            // if (context.user) {
            const libraryData = await db.Library.findOne({ owner_id: args.owner_id });
            return libraryData;
            // }
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
            // if (context.user) {
            const savedItem = await db.Item.create({...args });
            return savedItem;
            // }

            // throw new AuthenticationError('You need to be logged in!');
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
        createLibrary: async(parent, args, context) => {
            // if (context.user){
            //     const library = await db.Library.create({...args, owner_id: context.user._id})
            // }
            const library = await db.Library.create({...args })
            return library
        }
    }
}

module.exports = resolvers;