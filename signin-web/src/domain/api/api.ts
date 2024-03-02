import axios from "axios";
import {
  SignInRequestPayload,
  SignUpRequestPayload,
} from "../interfaces/signinInterfaces";

const BASE_URL = "http://localhost:3008";
export const createNewUser = async (
  signUpRequestPayload: SignUpRequestPayload
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/auth/signup`,
      signUpRequestPayload
    );
    return response.data;
  } catch (error) {
    console.error("There was an error in creating new user", error);
    return error;
  }
};

export const signIn = async (signInRequestPayload: SignInRequestPayload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/auth/signin`,
      signInRequestPayload
    );
    return response.data;
  } catch (error) {
    console.error("There was an error in signing in", error);
    throw error;
  }
};

export const fetchWelcomeMessageDetails = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BASE_URL}/v1/user/welcome`, config);
    return response.data;
  } catch (error) {
    console.error("There was an error in welcome message", error);
    throw error;
  }
};
