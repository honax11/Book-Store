//TODO: Rewrite with axios instance

import { showError, showWarn } from "shared/toast/notification";
import { getLocalAccessToken } from "./TokenService";

const axios = require("axios").default;

export const upload = async (url:string, file:any) => {
    // const token = getLocalAccessToken();

    let formData = new FormData();
    formData.append("formFile", file.formFile.file);
    formData.append("fileName", file.formFile.file.name);
    formData.append("productId", file.productId);
    if (file?.order != undefined) {
      formData.append("order", file.order);
    }
    return await axios.post(process.env.REACT_APP_API_URL + url, formData, {
      headers: {
        "Content-Type": `multipart/form-data;`,
        // Authorization: `Bearer ${token}`,
      },
    });
  };

  export const uploadBanner = async (url: string, file:any) => {
    // const token = getLocalAccessToken();

    let formData = new FormData();
    formData.append("file", file.file);

    return await axios.post(process.env.REACT_APP_API_URL + url, formData, {
      headers: {
        "Content-Type": `multipart/form-data;`,
        // Authorization: `Bearer ${token}`,
      },
    });
  };

  export const get = async (url: string) => {
    debugger;
    const S = process.env.REACT_APP_API_URL + url;
    const result = await fetch(process.env.REACT_APP_API_URL + url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  };

  export const deleteRequest = async (url: string) => {
    // const token = getLocalAccessToken();
    await axios
      .delete(process.env.REACT_APP_API_URL + url, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then(() => {
        showWarn("Item was deleted.");
      })
      .catch(() => {
        showError("Something went wrong!");
      });
  };

