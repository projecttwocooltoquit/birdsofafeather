const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    spottedList: [Birds]
    watchList: [Birds]
  }

  type Birds {
    _id: ID
    sciName: String
    comName: String
    imgSrc: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    birds: [Birds]!
    bird(birdId: ID!): Birds
  }

  type Mutation {
    addProfile(
      name: String!
      email: String!
      password: String!
      spottedList: [ID]
      watchList: [ID]
    ): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    addBird(sciName: String!, comName: String!, imgSrc: String!): Birds
    updateWatchList(
      sciName: String!
      comName: String!
      imgSrc: String!
    ): Profile
    updateSpottedList(
      sciName: String!
      comName: String!
      imgSrc: String!
    ): Profile
    removeFromWatchList(bird: String!): Profile
    removeFromSpottedList(bird: String!): Profile
  }
`;

module.exports = typeDefs;
