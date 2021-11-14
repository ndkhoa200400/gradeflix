import axios from "axios";

import { loadToken } from "../services/auth.service";
const apiLink = process.env.REACT_APP_API_LINK;
// try-catch in caller Function to detect Error
export const getApiMethod = async (link, params = "") => {
  try {
    const token = loadToken();
    const res = await axios(`${apiLink}${link}?${JSON.stringify(params)}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // 'Content-Type': 'application/x-www-form-urlencoded',
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("error ", error.response.data.error);
      throw error.response.data.error;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    throw error;
  }
};

export const postApiMethod = async (link, data) => {
  try {
    const token = loadToken();
    const res = await axios(`${apiLink}${link}`, {
      method: "POST",
      //mode: "no-cors", // no-cors, *cors, same-origin
      //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("error ", error.response.data.error);
      throw error.response.data.error;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    throw error;
  }
};
