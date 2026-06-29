import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

import { userPool } from "./cognito";

// REGISTER USER
export const registerUser = (
  name,
  email,
  password
) => {

  return new Promise((resolve, reject) => {

    const attributes = [

      new CognitoUserAttribute({
        Name: "name",
        Value: name
      }),

      new CognitoUserAttribute({
        Name: "email",
        Value: email
      })

    ];

    userPool.signUp(
      email,
      password,
      attributes,
      null,
      (err, result) => {

        if (err) {
          reject(err);
          return;
        }

        resolve(result);

      }
    );

  });

};

// VERIFY OTP
export const verifyUser = (
  email,
  code
) => {

  return new Promise((resolve, reject) => {

    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    user.confirmRegistration(
      code,
      true,
      (err, result) => {

        if (err) {
          reject(err);
          return;
        }

        resolve(result);

      }
    );

  });

};

// LOGIN
export const loginUser = (
  email,
  password
) => {

  return new Promise((resolve, reject) => {

    const authDetails =
      new AuthenticationDetails({

        Username: email,
        Password: password

      });

    const cognitoUser =
      new CognitoUser({

        Username: email,
        Pool: userPool

      });

    cognitoUser.authenticateUser(
      authDetails,
      {

        onSuccess: (result) => {

          const idToken =
            result
              .getIdToken()
              .getJwtToken();

          const accessToken =
            result
              .getAccessToken()
              .getJwtToken();

          localStorage.setItem(
            "jwtToken",
            idToken
          );

          localStorage.setItem(
            "accessToken",
            accessToken
          );

          localStorage.setItem(
            "isAuthenticated",
            "true"
          );

          resolve(result);

        },

        onFailure: (err) => {

          reject(err);

        }

      }
    );

  });

};

// LOGOUT
export const logoutUser = () => {

  const currentUser =
    userPool.getCurrentUser();

  if (currentUser) {

    currentUser.signOut();

  }

  localStorage.clear();

};