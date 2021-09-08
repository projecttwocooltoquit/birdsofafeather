import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      watchList {
        _id
      }
      spottedList {
        _id
      }
    }
  }
`;

export const QUERY_BIRDS = gql`
  query allBirds {
    Birds {
      _id
      sciName
      comName
    }
  }
`;

export const QUERY_ONE_BIRD = gql`
  query singleBird($birdId: ID!) {
    birds(birdId: $profileId) {
      _id
      name
    }
  }
`;
