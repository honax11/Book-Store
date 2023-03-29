import { LoginResult } from "container/login/LoginContainer";
import { setUser } from "./TokenService";

const axios = require("axios").default;

export const login = async (username:string, password:any): Promise<LoginResult> => {
  let loginDto = {
    email: username,
    password: password,
    rememberMe: true,
  };
  
  return await axios
    .post(process.env.REACT_APP_API_URL + `Account/Login`, loginDto)
    .then((res: any) => {
      if (res.data.accessToken) {
        setUser(res.data);
      }
      return res.data;
    });
}