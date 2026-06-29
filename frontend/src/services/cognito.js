import {
  CognitoUserPool
} from "amazon-cognito-identity-js";

const poolData = {

  UserPoolId:
    "ap-south-1_gLcOnrpd1",

  ClientId:
    "3s7smbpd76il3mkcrhfb87ckj3"
};

export const userPool =
  new CognitoUserPool(poolData);