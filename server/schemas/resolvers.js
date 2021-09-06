const { AuthenticationError } = require("apollo-server-express");
const { Profile, Birds } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addProfile: async (
      parent,
      { name, email, password, spottedList, watchList }
    ) => {
      const profile = await Profile.create({
        name,
        email,
        password,
        spottedList,
        watchList,
      });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },
    // Add a third argument to the resolver to access data in our `context`
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addBird: async (parent, { sciName, comName, imgSrc }) => {
      const bird = await Birds.create({
        sciName,
        comName,
        imgSrc,
      });

      return bird;
    },
    updateWatchList: async (parent, { _id, birdData }) => {
      return await Profile.findByIdAndUpdate(
        _id,
        // what am i supposed to give this to update?? like what is birdData, we need the data from adding the bird to the bird db from card.js - how do i tell this that's what data we need
        { $inc: { watchList: birdData } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
