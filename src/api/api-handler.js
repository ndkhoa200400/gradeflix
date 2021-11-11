const apiLink = process.env.REACT_APP_API_LINK;
export const getApiMethod = async (link, params = "") => {
  try {
      console.log('calling api')
    const res = await fetch(`${apiLink}/${link}?${JSON.stringify(params)}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error calling get api", error);
    throw error;
  }
};

export const postApiMethod = async (link, data) => {
  try {
    const res = await fetch(`${apiLink}/${link}`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    const response = await res.json()
    return response
  } catch (error) {
    console.log("error calling post api", error);
    throw error;
  }
};
