
import axios from "axios";

import {loadToken} from "../services/auth.service"
const apiLink = process.env.REACT_APP_API_LINK;
// try-catch in caller Function to detect Error
export const getApiMethod = async (link, params = "") => {
    const token = loadToken();
    const res = await axios(`${apiLink}${link}?${JSON.stringify(params)}`, { headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
      // 'Content-Type': 'application/x-www-form-urlencoded',
    });
    return res.data;

};

export const postApiMethod = async (link, data) => {
    const token = loadToken();
    const res = await axios(`${apiLink}${link}`, {
      method: "POST",
      //mode: "no-cors", // no-cors, *cors, same-origin
      //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
     // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      data
    });
    return res.data
};



