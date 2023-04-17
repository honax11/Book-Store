import { getLocalAccessToken } from "./TokenService";

const axios = require("axios").default;

export const post = async (url: string, data: any) => {

    const json = JSON.stringify(data);
    // const token = getLocalAccessToken();

    return await axios.post(process.env.REACT_APP_API_URL + url, json, {
        headers: {
            "Content-Type": `application/json`,
            // "Authorization": `Bearer ${token}`
        }
    });
};

export const put = async (url: string, data: any) => {

    const json = JSON.stringify(data);
    // const token = getLocalAccessToken();

    return await axios.put(process.env.REACT_APP_API_URL + url, json, {
        headers: {
            "Content-Type": `application/json`,
            // "Authorization": `Bearer ${token}`
        }
    });
};

export const getWithoutBody = async (url: string) => {
    // const token = getLocalAccessToken();

    return await axios.get(process.env.REACT_APP_API_URL + url, {
        headers: {
            "Content-Type": `application/json`,
            // "Authorization": `Bearer ${token}`
        }
    });
};

export const get = async (url: string) => {
    // const token = getLocalAccessToken();

    return await axios.get(process.env.REACT_APP_API_URL + url, {
        headers: {
            "Content-Type": `application/json`,
            // "Authorization": `Bearer ${token}`
        }
    });
};

export const onDelete = async (url: string) => {
    // const token = getLocalAccessToken();

    return await axios.delete(process.env.REACT_APP_API_URL + url, {
        headers: {
            "Content-Type": `application/json`,
            // "Authorization": `Bearer ${token}`
        }
    });
};