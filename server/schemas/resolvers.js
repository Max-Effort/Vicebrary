const { AuthenticationError } = require('apollo-server-express');
const db = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        Users: async () => {
            const userData = await db.User.find({});
            return userData;
        },
        // Finds a user that is not SELF
        User: async (parent, args) => {
            // console.log(args.username)
            const userData = await db.User.findOne({ username: args.username });
            return userData;
        },
        // Returns All SELF(user data) if token matches
        Self: async (parent, args, context) => {
            if (context.user) {
                const userData = await db.User.findOne({ _id: context.user._id });
                return userData;
            }
        },
        Library: async (parent, args, context) => {
            if (context.user) {
                const libraryData = await db.Library.findOne({ owner_id: context.user._id });
                return libraryData;
            }
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await db.User.create(args);
            const token = signToken(user);
            return { token, user };
            // return user;
        },
        login: async (parent, { email, password }) => {
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
        saveItem: async (parent, args, context) => {
            if (context.user) {
                const savedItem = await db.Item.create({ ...args, username: context.user.username });



                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
    }
}

module.exports = resolvers;