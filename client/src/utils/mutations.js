import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_BIRD = gql`
  mutation addBird($sciName: String!, $comName: String!, $imgSrc: String!) {
    addBird(sciName: $sciName, comName: $comName, imgSrc: $imgSrc) {
      _id
    }
  }
`;

export const UPDATE_WATCHLIST = gql`
  mutation updateWatchList(
    $sciName: String!
    $comName: String!
    $imgSrc: String!
  ) {
    updateWatchList(sciName: $sciName, comName: $comName, imgSrc: $imgSrc) {
      _id
      name
      email
      watchList {
        sciName
        comName
        imgSrc
      }
    }
  }
`;

export const UPDATE_SPOTTEDLIST = gql`
  mutation updateSpottedList(
    $sciName: String!
    $comName: String!
    $imgSrc: String!
  ) {
    updateSpottedList(sciName: $sciName, comName: $comName, imgSrc: $imgSrc) {
      _id
      name
      email
      spottedList {
        sciName
        comName
        imgSrc
      }
    }
  }
`;
